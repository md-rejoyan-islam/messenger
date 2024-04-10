import asyncHandler from "express-async-handler";
import createError from "http-errors";
import mongoose from "mongoose";
import chatModel from "../models/chat.model.js";
import { errorResponse, successResponse } from "../helpers/responseHandler.js";
import userModel from "../models/user.model.js";
import { cloudUpload } from "../utils/cloudinary.js";

// get all chats
export const getAllChat = asyncHandler(async (req, res) => {
  const chats = await chatModel.find({});

  if (!chats.length) throw createError.NotFound("Couldn't find any chat.");

  successResponse(res, {
    statusCode: 200,
    message: "All chats data",
    payload: {
      data: chats,
    },
  });
});

// create chat
export const createChat = asyncHandler(async (req, res) => {
  const { receiverId, chat } = req.body;

  if (!receiverId) throw createError.BadRequest("ReceiverId id is required!");

  // id check
  if (!mongoose.isValidObjectId(receiverId))
    throw createError.BadRequest("Invalid user id.");

  // user check
  const receiver = await userModel.findById(receiverId);

  if (!receiver) throw createError.NotFound("Reciver id not found.");

  const senderId = req?.me?._id;

  // photo
  const photo = req.file;

  let PHOTO_URL = null;

  if (photo) {
    PHOTO_URL = await cloudUpload(photo.path);
  }

  // console.log(photo.path, PHOTO_URL);

  // create chat
  const result = await chatModel.create({
    message: {
      text: chat,
      photo: PHOTO_URL,
    },
    receiverId,
    senderId,
  });

  // all chat data
  const senderAllChat = await chatModel.findById(req?.me?._id);

  successResponse(res, {
    statusCode: 201,
    message: "Chat added",
    payload: {
      data: result,
    },
  });
});

// get user to user chat
export const getUserToUserChat = asyncHandler(async (req, res) => {
  const receiverId = req.params.id;

  if (!receiverId) throw createError.BadRequest("Receiver id is required!");

  // id check
  if (!mongoose.isValidObjectId(receiverId))
    throw createError.BadRequest("Invalid receiver id.");

  // user check
  const reciver = await userModel.findById(receiverId);

  if (!reciver) throw createError.NotFound("Receiver id not found.");

  // get user to user chat
  const chats = await chatModel.find({
    $or: [
      { senderId: req?.me?._id, receiverId },
      { senderId: receiverId, receiverId: req?.me?._id },
    ],
  });

  if (!chats.length) throw createError.NotFound("Couldn't find any chat.");

  successResponse(res, {
    statusCode: 200,
    message: "User to user chat data",
    payload: {
      data: chats,
    },
  });
});
