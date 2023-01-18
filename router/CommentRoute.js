import { Router } from "express";
import Comment from "../models/CommentModel.js";
import Post from "../models/PostModel.js";

const router = Router();

router.post("/:id", async (req, res) => {
  const { id: postId } = req.params;
  const { user } = req;
  try {
    await Post.findOne({ _id: postId });
  } catch (error) {
    console.log(error.message);
    return res.status(404).json({
      error: true,
      message: "Post Not Found!",
    });
  }

  const { comment: commentBody } = req.body;
  const comment = commentBody.trim();
  if (!comment) {
    return res.status(404).json({
      error: true,
      message: "Comment body can not be empty.",
    });
  }

  try {
    // Save Comments
    const createComment = await (
      await Comment.create({
        comment: comment,
        parent: postId,
        createdBy: user.id,
      })
    ).save();
    // update comment on post
    const { comments } = await Post.findByIdAndUpdate(
      { _id: postId },
      {
        $addToSet: {
          comments: createComment._id,
        },
      },
      { new: true }
    );
    return res.status(200).json({
      error: false,
      message: "Commented on post",
      payload: {
        commentId: createComment._id,
        allComments: comments,
      },
    });
  } catch (error) {
    console.log(error.message);
    res.status(404).json({
      error: true,
      message: "Something went wrong!",
    });
  }
});

export default router;
