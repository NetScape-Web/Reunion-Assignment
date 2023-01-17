import express from "express";
import * as mongoose from "mongoose";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";

const app = express();
dotenv.config();
mongoose.set("strictQuery", true);
mongoose.connect(process.env.MONGODB_URL, () =>
  console.log("Database connected.")
);

app.use(express.json());
app.use(helmet());
app.use(morgan("common"));

app.listen(process.env.PORT, () =>
  console.log("Developement Server is running...")
);
