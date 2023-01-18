import { Router } from "express";
import Post from "../models/PostModel.js";

const router = Router();

router.post("/", async (req, res) => {
  const { user } = req;
  const { title, description } = req.body;

  if (!title || !description) {
    return res.status(404).json({
      error: true,
      message: "Required field can not be empty.",
    });
  }
  const payload = {
    title: title.trim(),
    description: description.trim(),
    createdBy: user.id,
  };

  try {
    const post = await (await Post.create(payload)).save();
    return res.status(200).json({
      error: false,
      message: "Post Created.",
      payload: {
        postId: post._id,
        title: post.title,
        description: post.description,
        createdAt: post.createdAt,
      },
    });
  } catch (error) {
    return res.status(404).json({
      error: true,
      message: "Something went wrong.",
    });
  }
});

export default router;
