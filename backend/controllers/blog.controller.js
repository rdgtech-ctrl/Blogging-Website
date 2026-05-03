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

export const getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find().populate("author");
    return res.status(200).json({ blogs, success: true });
  } catch (error) {
    console.log(error);
  }
};

export const getPublishedBlog = async (req, res) => {
  try {
    const blogs = await Blog.find({ isPublished: true })
      .sort({
        createdAt: -1,
      })
      .populate({ path: "author", select: "firstName lastName photUrl" });
    if (!blogs) {
      return res.status(401).json({
        message: "Blogs not found",
      });
    }
    return res.status(200).json({
      success: true,
      blogs,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to get published blogs",
    });
  }
};

export const togglePublishBlog = async (req, res) => {
  try {
    const { blogId } = req.params;
    const { publish } = req.query; //  true/false

    const blog = await Blog.findById(blogId);
    if (!blog) {
      return res.status(404).json({
        message: "Blog not found",
      });
    }
    // publish status based on the query parameter
    blog.isPublished = !blog.isPublished;
    await blog.save(); // It takes whatever is currently in the blog object and writees it to the database.

    const statusMessage = blog.isPublished ? "Published" : "Unpublished";
    return res.status(200).json({
      success: true,
      message: `Blog is ${statusMessage}`,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to get update status",
    });
  }
};

export const likeBlog = async (req, res) => {
  try {
    const blogId = req.params.id;
    const likeId = req.id;
    const blog = await Blog.findById(blogId).populate({ path: "likes" });
    if (!blog) {
      return res.status(404).json({
        message: "Blog not found",
        success: false,
      });
    }
    // like logic started
    await blog.updateOne({ $addToSet: { likes: likeId } });
    // $addToSet: Adds likeId to likes array ONLY if it doesn't already exist
    // Prevents duplicate likes
    // $push - adds even if already exists (duplicates!)
    await blog.save();
    return res.status(200).json({ message: "Blog like", blog, success: true });
    // blog in the Response Object- It's sending the updated blog data back to the frontend
  } catch (error) {
    console.log(error);
  }
};

export const dislikeBlog = async (req, res) => {
  try {
    const blogId = req.params.id;
    const likeId = req.id;
    const blog = await Blog.findById(blogId);
    if (!blog) {
      return res.status(404).json({
        message: "Blog not found",
        success: false,
      });
    }
    // dislike logic started
    await blog.updateOne({ $pull: { likes: likeId } });
    await blog.save();
    return res
      .status(200)
      .json({ message: "Blog disliked", blog, success: true });
  } catch (error) {
    console.log(error);
  }
};

export const getMyTotalBlogLikes = async(req,res) => {
  try {
    const userId = req.id;
    const myBlogs = await Blog.find({author:userId}).select("likes")
    // Blog.find({author:userId}) -> Find all blogs by this user
    // .select("likes") -> Only fetch the likes field,ignore everything else (title,description etc)

    const totalLikes = myBlogs.reduce((acc,blog)=>acc+(blog.likes?.length || 0),0)
    // .reduce() Loops through array and accumulates a single value
    // acc Running total (starts at 0)
    // blog.likes?.length Number of likes on each blog
    // || 0 if likes is null/undefined,use 0

    return res.status(200).json({
      success:true,
      totalBlogs:myBlogs.length,
      totalLikes,
    })
  } catch (error) {
    return res.status(500).json({
      successs:false,
      message:"Failed to fetch total blog likes:"
    })
  }
}