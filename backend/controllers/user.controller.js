import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;
    if (!firstName || !lastName || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      return res.status(400).json({
        // Client sent invalid/incomplete data
        success: false,
        message: "Invalid email",
      });
    }
    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: "Password must be atleast 6 characters",
      });
    }
    const existingUserByEmail = await User.findOne({ email: email });
    if (existingUserByEmail) {
      return res.status(400).json({
        success: false,
        message: "Email already exists",
      });
    }

    const hashPassword = await bcrypt.hash(password, 10);
    await User.create({
      firstName,
      lastName,
      email,
      password: hashPassword,
    });

    return res.status(201).json({
      success: true,
      message: "Account created successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Failed to register",
    });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }
    // req.body contains the data sent by the client (Postman/frontend) in the request body.
    //When you sent a POST request with JSON
    //Express parses it and puts it into req.body
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Incorrect email or password",
      });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({
        success: false,
        message: "Invalid Credentials",
      });
    }

    const token = await jwt.sign({ userId: user._id }, process.env.SECRET_KEY, {
      expiresIn: "1d",
    });
    return res
      .status(200)
      .cookie("token", token, {
        maxAge: 1 * 24 * 60 * 60 * 1000,
        httpOnly: true, // ← also fix: "httpsOnly" is wrong, it's "httpOnly"
        sameSite: "strict",
      })
      .json({
        success: true,
        message: `Welcome back ${user.firstName}`,
        user
      });
    //maxAge: 1*24*60*60*1000 — cookie lasts 1 day (in milliseconds)
    // httpOnly: true — cookie can't be accessed by JavaScript (protects against XSS attacks)
    // sameSite: "strict" — cookie only sent from your own site (protects against CSRF attacks)
    // {userId:user._id} this is the data embedded inside the token.
    //secret key a private string (stored in .env) used to sign the token.Anyone with this key can verify the token is genuine.
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Failed to login",
    });
  }
};

export const logout = async (_, res) => {
  try {
    return res.status(200).cookie("token", "", { maxAge: 0 }).json({
      message: "Logout successfully",
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};


export const getProfile = async (req, res) => {
  try {
    const token = req.cookies.token
    if (!token) {
      return res.status(401).json({ success: false, message: "Not authenticated" })
    }
    const decoded = jwt.verify(token, process.env.SECRET_KEY)
    const user = await User.findById(decoded.userId).select("-password")
    return res.status(200).json({ success: true, user })
  } catch (error) {
    return res.status(401).json({ success: false, message: "Invalid token" })
  }
}