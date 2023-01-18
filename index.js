import express, { application } from "express";
import { connect, set } from "mongoose";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import {
  authRouter,
  followRouter,
  postRouter,
  unfollowRouter,
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
app.use("/api/auth", authRouter);
app.use("/api/auth", validate, postRouter);
app.use("/api/follow", validate, followRouter);
app.use("/api/unfollow", validate, unfollowRouter);
app.use("/api/user", validate, userRouter);

app.listen(process.env.PORT, () =>
  console.log(`Developement Server is running on port ${process.env.PORT}...`)
);
