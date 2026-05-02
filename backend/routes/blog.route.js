import express from "express";
import { isAuthenticated } from "../middleware/isAuthenticated.js";
import { singleUpload } from "../middleware/multer.js";
import {
  createBlog,
  getOwnBlogs,
  updateBlog,
} from "../controllers/blog.controller.js";

const router = express.Router();

router.route("/").post(isAuthenticated, createBlog);
router.route("/:blogId").put(isAuthenticated, singleUpload, updateBlog);
router.route("/get-own-blogs").get(isAuthenticated, getOwnBlogs);

export default router;
