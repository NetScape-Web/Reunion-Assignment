import { compare } from "bcrypt";
import { Router } from "express";
import User from "../models/UserModel.js";

const router = Router();

// Login route

router.post("/", async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(404).json({
      error: true,
      message: "Email or Password can not be empty!",
    });
  }
  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    return res.status(404).json({
      error: true,
      message: "User Not Registered!",
    });
  }

  const isCorrectPassword = await compare(password, user.password);
  if (isCorrectPassword) {
    const token = user.getSignedJwtToken();
    // console.log(token);
    return res.status(200).json({
      error: false,
      message: "Log in successful.",
      payload: {
        token,
      },
    });
  }
});

// Register for one time only

// router.post("/register", async (req, res) => {
//   const { email, password } = req.body;
//   if (!email || !password) {
//     return res.status(404).json({
//       error: true,
//       message: "Email or Password can not be empty!",
//     });
//   }
//   try {
//     const userData = await User.create({ email, password });
//     const user = await userData.save();
//     return res.status(201).json({
//       error: false,
//       message: "Registered Successful",
//       payload: {
//         user: user,
//         token: user.getSignedJwtToken(),
//       },
//     });
//   } catch (error) {
//     return res.status(406).json({
//       error: true,
//       message: "email already register please signin.",
//     });
//   }
// });

export default router;
