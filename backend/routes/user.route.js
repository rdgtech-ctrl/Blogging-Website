import express from "express";
import {
  login,
  logout,
  register,
  getProfile,
} from "../controllers/user.controller.js";
//  The Backend Framework
// Acts as the middleman between your frontend(React) and your database (MongoDB). It creates API routes that React can all.

const router = express.Router();

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/logout").get(logout);
router.get("/getprofile", getProfile);
export default router;
