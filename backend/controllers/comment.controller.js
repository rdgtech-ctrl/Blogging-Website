import { Blog } from "../models/blog.model";

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

    await comment.populate()
  } catch (error) {
    console.log(error);
  }
};
