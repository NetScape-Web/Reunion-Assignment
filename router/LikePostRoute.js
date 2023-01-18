import { Router } from "express";
import Post from "../models/PostModel.js";

const router = Router();

router.put("/:id", async (req, res) => {
  const { id: postId } = req.params;
  const { user } = req;

  try {
    await Post.updateOne(
      { _id: postId },
      {
        $addToSet: {
          likes: user.id,
        },
      }
    );
    res.status(200).json({
      error: false,
      message: "Message Liked.",
    });
  } catch (error) {
    console.log(error);
    res.status(404).json({
      error: true,
      message: "Something went wrong",
    });
  }
});

export default router;
