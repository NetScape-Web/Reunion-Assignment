import express, { application } from "express";
import { connect, set } from "mongoose";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import {
  allPostsRouter,
  authRouter,
  commentRouter,
  followRouter,
  likePostRouter,
  postRouter,
  unfollowRouter,
  unlikePostRouter,
  userRouter,
} from "./router/index.js";
import { ConnectDB } from "./config/Database.js";
import validate from "./middleware/AuthMiddleware.js";

const app = express();
dotenv.config();
ConnectDB();

app.use(express.json());
app.use(helmet());
app.use(morgan("common"));

// Routes
app.use("/api/authenticate", authRouter);
app.use("/api/follow", validate, followRouter);
app.use("/api/unfollow", validate, unfollowRouter);
app.use("/api/user", validate, userRouter);
app.use("/api/posts", validate, postRouter);
app.use("/api/like", validate, likePostRouter);
app.use("/api/unlike", validate, unlikePostRouter);
app.use("/api/comment", validate, commentRouter);
app.use("/api/all_posts", validate, allPostsRouter);

app.listen(process.env.PORT, () =>
  console.log(`Developement Server is running on port ${process.env.PORT}...`)
);

export default app;
