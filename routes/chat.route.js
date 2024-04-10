import express from "express";

import { isLoggedIn } from "../middlewares/verify.js";
import {
  createChat,
  getAllChat,
  getUserToUserChat,
} from "../controllers/chat.controller.js";
import { chatPhotoUpload } from "../utils/multerForCloudinary.js";

const chatRouter = express.Router();

// use verify token
chatRouter.use(isLoggedIn);

// create route

chatRouter.route("/").get(getAllChat).post(chatPhotoUpload, createChat);
chatRouter.route("/:id").get(getUserToUserChat);
// chatRouter
//   .route("/:id")
//   .get(getSingleUserById)
//   .delete(deleteUserById)
//   .put(updateUserById);

// export default router
export default chatRouter;
