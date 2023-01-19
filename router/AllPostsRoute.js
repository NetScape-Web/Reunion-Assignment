import { Router } from "express";
import Post from "../models/PostModel.js";
import User from "../models/UserModel.js";

const router = Router();

router.get("/", async (req, res) => {
  const { user } = req;
  try {
    const posts = await Post.find({
      createdBy: user.id,
    })
      .sort({ createdAt: -1 })
      .populate({
        path: "comments",
        populate: {
          path: "createdBy",
          select: ["username", "email"],
        },
        select: ["comment", "createdAt", "createdBy"],
      })
      .exec();
    return res.status(200).json({
      error: false,
      message: "Post found",
      posts,
    });
  } catch (error) {
    return res.status(404).json({
      error: true,
      message: "Post Not Available.",
    });
  }
});

export default router;
