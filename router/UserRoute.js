import { Router } from "express";
import User from "../models/UserModel.js";

const router = Router();

router.get("/", async (req, res) => {
  const { user } = req;

  const currentUser = await User.findOne({ _id: user.id });
  return res.status(200).json({
    error: false,
    message: "User Exist.",
    payload: {
      username: currentUser.username,
      followers: currentUser.followers.length,
      following: currentUser.following.length,
    },
  });
});

export default router;
