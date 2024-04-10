import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import colors from "colors";
import morgan from "morgan";
import corsOptions from "./config/corsOption.js";
import mongoBDConnect from "./config/db.js";
import { successResponse } from "./helpers/responseHandler.js";
import { errorHandler } from "./middlewares/errorHandler.js";
import authRouter from "./routes/auth.route.js";
import userRouter from "./routes/user.route.js";
import chatRouter from "./routes/chat.route.js";

// initialization
const app = express();

dotenv.config();

// set middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// cookie
app.use(cookieParser());
app.use(cors(corsOptions));

// morgan
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// set environment vars
const PORT = process.env.PORT || 8080;

// static folder
app.use("/public", express.static("public"));

// home route
app.get("/", (req, res) => {
  successResponse(res, {
    statusCode: 200,
    message: "Welcome to API.",
  });
});

// routing
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/chat", chatRouter);

// use error handler
app.use(errorHandler);

// app listen
app.listen(PORT, () => {
  mongoBDConnect();
  console.log(
    "\n" + `server is running on http://localhost:${PORT}`.bgGreen.black + "\n"
  );
});
