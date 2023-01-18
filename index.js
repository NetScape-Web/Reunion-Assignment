import express from "express";
import { connect, set } from "mongoose";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import {
  authRouter,
  followRouter,
  postRouter,
  unfollowRouter,
} from "./router/index.js";
import { ConnectDB } from "./config/Database.js";

const app = express();
dotenv.config();
ConnectDB();

app.use(express.json());
app.use(helmet());
app.use(morgan("common"));

// Routes
app.use("/api/auth", authRouter);
app.use("/api/auth", postRouter);
app.use("/api/follow", followRouter);
app.use("/api/unfollow", unfollowRouter);

app.listen(process.env.PORT, () =>
  console.log(`Developement Server is running on port ${process.env.PORT}...`)
);
