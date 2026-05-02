import { Blog } from "../models/blog.model.js";
import getDataUri from "../utils/dataUri.js";
import cloudinary from "../utils/cloudinary.js";

export const createBlog = async (req, res) => {
  try {
    const { title, category } = req.body;
    if (!title || !category) {
      return res.status(400).json({
        message: "Blog title and category is required",
      });
    }
    const blog = await Blog.create({
      title,
      category,
      author: req.id,
    });

    return res.status(201).json({
      success: true,
      blog,
      message: "Blog created Successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Failed to create blog",
    });
  }
};

export const updateBlog = async (req, res) => {
  try {
    const blogId = req.params.blogId;
    const { title, subtitle, description, category } = req.body;
    const file = req.file;

    let blog = await Blog.findById(blogId);
    if (!blog) {
      return res.status(404).json({
        message: "Blog not found",
      });
    }
    let thumbnail;
    if (file) {
      const fileUri = getDataUri(file);
      thumbnail = await cloudinary.uploader.upload(fileUri);
    }
    const updateData = {
      title,
      subtitle,
      description,
      category,
      author: req.id,
      thumbnail: thumbnail?.secure_url,
    };
    blog = await Blog.findByIdAndUpdate(blogId, updateData, { new: true });
    res.status(200).json({
      success: true,
      message: "Blog updated successfully",
      blog,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Error updating blog",
    });
  }
};

export const getOwnBlogs = async (req, res) => {
  try {
    const userId = req.id;
    if (!userId) {
      return res.status(400).json({
        message: "User Id is required",
      });
    }
    const blogs = await Blog.find({ author: userId }).populate({
      path: "author",
      select: "firstName lastName photoUrl",
      // This fetches all blogs written by a specific user from the database, along with the author's details.
    });
    if (!blogs) {
      return res
        .status(404)
        .json({ message: "No blogs found", blogs: [], success: false });
    }
    return res.status(200).json({ blogs, success: true });
  } catch (error) {
    return res.status(500).json({
      message: "Error fetching blogs",
      error: error.message,
    });
  }
};

export const deleteBlog = async (req, res) => {
  try {
    const blogId = req.params.id;
    const authorId = req.id;
    const blog = await Blog.findById(blogId);
    if (!blog) {
      return res.status(404).json({
        success: false,
        message: "Blog not found",
      });
    }
    if (blog.author.toString() !== authorId) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized to delete this blog",
      });
    }
    // Delete blog
    await Blog.findByIdAndDelete(blogId);

    res
      .status(200)
      .json({ success: true, message: "Blog deleted successfully" });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error deleting blog",
      error: error.message,
    });
  }
};
