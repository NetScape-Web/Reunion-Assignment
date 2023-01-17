import express from "express";
import { connect, set } from "mongoose";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import { authRouter } from "./router/index.js";
import { ConnectDB } from "./config/Database.js";

const app = express();
dotenv.config();
ConnectDB();
// set("strictQuery", true);
// connect(
//   process.env.MONGODB_URL1,
//   {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//     useCreateIndex: true,
//     useFindAndModify: false,
//   },
//   () => console.log("Database connected.")
// );

app.use(express.json());
app.use(helmet());
app.use(morgan("common"));

// Routes
app.use("/api/v1/auth", authRouter);

app.listen(process.env.PORT, () =>
  console.log(`Developement Server is running on port ${process.env.PORT}...`)
);
