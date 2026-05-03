import { Blog } from "../models/blog.model.js";
import { Comment } from "../models/comment.model.js";

export const createComment = async (req, res) => {
  try {
    const postId = req.params.id;
    const commentId = req.id;
    const { content } = req.body;

    const blog = await Blog.findById(postId);
    if (!content)
      return res
        .status(400)
        .json({ message: "Text is required", success: false });
    const comment = await Comment.create({
      content,
      userId: commentId,
      postId: postId,
    });

    await comment.populate({
      path: "userId",
      select: "firstName lastName photoUrl",
    });

    blog.comments.push(comment._id);
    await blog.save();
    return res.status(201).json({
      message: "Comment Added",
      comment,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

// get comments of post

export const getCommentsOfPost = async (req, res) => {
  try {
    const blogId = req.params.id;
    const comments = await Comment.find({ postId: blogId })
      .populate({ path: "userId", select: "firstName lastName photoUrl" })
      .sort({ createdAt: -1 });
    //It sorts the comments by date - newest first.
    if (!comments)
      return res
        .status(404)
        .json({ message: "No comments found for this blog", success: false });
    return res.status(200).json({
      success: true,
      comments,
    });
  } catch (error) {
    console.log(error);
  }
};

export const deleteComment = async (req, res) => {
  try {
    const commentId = req.params.id;
    const authorId = req.id;
    const comment = await Comment.findById(commentId);
    if (!comment) {
      return res
        .status(404)
        .json({ success: false, message: "Comment not found" });
    }
    if (comment.userId.toString() !== authorId) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized to delete this comment",
      });
    }

    const blogId = comment.postId;

    //Delete the comment
    await Comment.findByIdAndDelete(commentId);

    // Remove comment Id from blogs comments array
    await Blog.findByIdAndUpdate(blogId, {
      $pull: { comments: commentId },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error deleting comment",
      error: error.message,
    });
  }
};
