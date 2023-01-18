import { Router } from "express";
import User from "../models/UserModel.js";

const router = Router();

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { user } = req;
  const followerProfile = await User.findOne({ _id: user.id });
  const followingProfile = await User.findOne({ _id: id });
  if (!followingProfile) {
    return req.status(400).json({
      error: true,
      message: "The profile you requested to unfollow is not available.",
    });
  }

  // check if already follower
  if (
    !followerProfile.following.includes(followingProfile._id) ||
    !followingProfile.followers.includes(followerProfile._id)
  ) {
    const { following } = await User.findOne({ _id: followerProfile._id });

    return res.status(400).json({
      error: true,
      message: "you are not following this user.",
      payload: {
        following,
      },
    });
  }
  // update follower in followId  profile (followId)
  await User.updateOne(
    { _id: followingProfile._id },
    {
      $pull: {
        followers: followerProfile._id,
      },
    }
  );
  // update following in current profile (id)
  await User.updateOne(
    { _id: followerProfile._id },
    {
      $pull: {
        following: followingProfile._id,
      },
    }
  );
  const { following } = await User.findOne({ _id: followerProfile._id });

  return res.status(200).json({
    error: false,
    message: "unfollow user.",
    payload: {
      following,
    },
  });
});
export default router;
