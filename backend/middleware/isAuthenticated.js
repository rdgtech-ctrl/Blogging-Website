import jwt from "jsonwebtoken";

export const isAuthenticated = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    //when user logged in, a token was saved in their browser cookies
    // now we're reading it back
    if (!token) {
      return res.status(401).json({
        message: "User not authenticated",
        success: false,
      });
    }
    const decode = jwt.verify(token, process.env.SECRET_KEY);
    if (!decode) {
      return res.status(401).json({
        message: "Invalid token",
        success: false,
      });
    }
    req.id = decode.userId;
    // decode contains whatever we stored when creating the token
    // usually { userId: "64f1a2..." }
    // now any next route can access req.id to know WHO is making the request
    next();
    // user is authenticated, let them through
  } catch (error) {
    console.log(error);
  }
};
