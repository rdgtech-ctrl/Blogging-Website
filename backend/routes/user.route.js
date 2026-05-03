import express from "express";
import {
  login,
  logout,
  register,
  getProfile,
  updateProfile,
  getAllUsers,
} from "../controllers/user.controller.js";
//  The Backend Framework
// Acts as the middleman between your frontend(React) and your database (MongoDB). It creates API routes that React can all.
import { singleUpload } from "../middleware/multer.js";
import { isAuthenticated } from "../middleware/isAuthenticated.js";

const router = express.Router();

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/logout").get(logout);
router.get("/getprofile", getProfile);
router
  .route("/profile/update")
  .put(isAuthenticated, singleUpload, updateProfile);

router.route("/all-users").get(getAllUsers)  

export default router;
