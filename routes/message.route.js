import express from "express";

import { isLoggedIn } from "../middlewares/verify.js";
import {
  createUserToGroupChat,
  createUserToUserChat,
} from "../controllers/message.controller.js";
import { chatPhotoUpload } from "../utils/multerForCloudinary.js";

const messageRouter = express.Router();

// use verify token
messageRouter.use(isLoggedIn);

// create route

messageRouter
  .route("/user-to-user")
  .post(chatPhotoUpload, createUserToUserChat);
messageRouter.route("/user-to-group").post(createUserToGroupChat);

// export default router
export default messageRouter;
