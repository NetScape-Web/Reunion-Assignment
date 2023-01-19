import { Router } from "express";
import User from "../models/UserModel.js";

const router = Router();

// follow people

router.put("/:id", async (req, res) => {
  const { id: followId } = req.params;
  const { user } = req;
  const followerProfile = await User.findOne({ _id: user.id });
  if (followerProfile.id === followId) {
    return res.status(400).json({
      error: true,
      message: "You can not follow yourself.",
    });
  }
  let followingProfile;
  try {
    followingProfile = await User.findOne({ _id: followId });
  } catch (error) {
    return res.status(400).json({
      error: true,
      message: "The profile you requested to follow is not available.",
    });
  }

  // check if already follower
  if (
    followerProfile.following.includes(followingProfile._id) ||
    followingProfile.followers.includes(followerProfile._id)
  ) {
    const { following } = await User.findOne({ _id: followerProfile._id });

    return res.status(400).json({
      error: true,
      message: "Already following this user.",
      payload: {
        following,
      },
    });
  }
  // update follower in followId  profile (followId)
  await User.findByIdAndUpdate(
    { _id: followingProfile._id },
    {
      $addToSet: {
        followers: followerProfile._id,
      },
    },
    { new: true }
  );
  // update following in current profile (id)
  await User.findByIdAndUpdate(
    { _id: followerProfile._id },
    {
      $addToSet: {
        following: followingProfile._id,
      },
    },
    { new: true }
  );
  const { following } = await User.findOne({ _id: followerProfile._id });

  return res.status(200).json({
    error: false,
    message: "following",
    payload: {
      following,
    },
  });
});

export default router;
