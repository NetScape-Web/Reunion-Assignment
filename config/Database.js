import { connect, set } from "mongoose";

export const ConnectDB = () => {
  set("strictQuery", true);
  connect(
    process.env.MONGODB_URL,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
    (error) => {
      !error && console.log("Database connected.");
      error &&
        console.error(
          `Database Conncetion failed. \nTraceroute: ${error.message}`
        );
    }
  );
};
