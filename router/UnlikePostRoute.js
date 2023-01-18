import { Router } from "express";
import Post from "../models/PostModel.js";

const router = Router();

router.put("/:id", async (req, res) => {
  const { id: postId } = req.params;
  const { user } = req;

  try {
    await Post.findByIdAndUpdate(
      { _id: postId },
      {
        $pull: {
          likes: user.id,
        },
      },
      { new: true }
    );
    res.status(200).json({
      error: false,
      message: "Message Unliked.",
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
