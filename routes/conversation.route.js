import express from "express";
import { isLoggedIn } from "../middlewares/verify.js";
import {
  getAllConversation,
  getConversationById,
  getUserAllConversation,
  getUserAllConversationWithLastMessage,
  groupCreate,
  userConversationCreate,
} from "../controllers/conversation.controller.js";

const conversationRouter = express.Router();

// use verify token
conversationRouter.use(isLoggedIn);

// create route

conversationRouter.route("/").get(getAllConversation);

// create group
conversationRouter.route("/create-group").post(groupCreate);

// create user conversation
conversationRouter
  .route("/create-user-conversation")
  .post(userConversationCreate);

// get user all conversation
conversationRouter.route("/user").get(getUserAllConversation);

// get user all conversation with last message
conversationRouter
  .route("/user-with-last-message")
  .get(getUserAllConversationWithLastMessage);

// get conversaion by id
conversationRouter.route("/:id").get(getConversationById);

// export default router
export default conversationRouter;
