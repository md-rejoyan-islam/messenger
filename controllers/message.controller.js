import asyncHandler from "express-async-handler";
import conversationModel from "../models/conversation.model.js";
import createError from "http-errors";
import messageModel from "../models/message.model.js";
import userModel from "../models/user.model.js";
import { successResponse } from "../helpers/responseHandler.js";
import mongoose from "mongoose";
import { cloudUpload } from "../utils/cloudinary.js";

// create user to user chat
export const createUserToUserChat = asyncHandler(async (req, res) => {
  const { body, conversationId } = req.body;
  // photo
  const image = req.file;

  if (!body && !image)
    throw createError.BadRequest("Message body or image is required.");

  // conversation id
  if (!conversationId)
    throw createError.BadRequest("Conversation id is required.");

  // check conversaion data if provide
  if (!mongoose.isValidObjectId(conversationId))
    throw createError.BadRequest("Invalid conversaion id.");

  // data extract from database
  const conversationData = await conversationModel.findById(conversationId);

  // if conversation data not found
  if (!conversationData)
    throw createError.NotFound("Couldn't find any conversaion data.");

  let PHOTO_URL = null;

  if (image) {
    PHOTO_URL = await cloudUpload(image.path);
  }

  // create message
  const result = await messageModel.create({
    senderId: req.me._id,
    conversationId,
    image: PHOTO_URL,
    ...req.body,
  });

  // update conversation
  conversationData.messagesIds.push(result._id);

  // save conversation
  await conversationData.save();

  // send response
  successResponse(res, {
    statusCode: 200,
    message: "Message create successfully.",
    payload: {
      data: result,
    },
  });
});

// create group chhat
export const createUserToGroupChat = asyncHandler(async (req, res) => {
  const { name, conversationId } = req.body;

  // name validate
  if (!name) throw createError.NotFound("Group name is required.");

  // conversation id
  if (!conversationId)
    throw createError.NotFound("Conversation id is required.");

  // check conversaion data if provide
  if (!mongoose.isValidObjectId(conversationId))
    throw createError.BadRequest("Invalid conversaion id.");

  // data extract from database
  const conversationData = await conversationModel.findById(conversationId);

  // if conversation data not found
  if (!conversaionData)
    throw createError.NotFound("Couldn't find any conversaion data.");

  // create message
  const result = await messageModel
    .create({
      senderId: req.me._id,
      conversationId,
      ...req.body,
    })
    .then(async (res) => {
      await conversationModel.updateById(conversationId, {
        $push: {
          messages: res._id,
        },
      });
    });

  // response send
  successResponse(res, {
    statusCode: 200,
    message: "Message create successfully.",
    payload: {
      data: result,
    },
  });
});

// user add to group
export const addUserToGroup = asyncHandler(async (req, res) => {
  const { conversationId, userIds } = req.body;

  // user ids
  if (!userIds.length) throw createError.NotFound("User ids is required.");

  // check user ids
  for (let i = 0; i < userIds.length; i++) {
    if (!mongoose.isValidObjectId(userIds[i]))
      throw createError.BadRequest("Invalid user id.");
    const user = await userModel.findById(userIds[i]);
    if (!user)
      throw createError.NotFound("Couldn't find user data by id" + userIds[i]);
  }

  // conversation id
  if (!conversationId)
    throw createError.NotFound("Conversation id is required.");

  // check conversaion data if provide
  if (!mongoose.isValidObjectId(conversationId))
    throw createError.BadRequest("Invalid conversaion id.");

  // data extract from database
  const conversationData = await conversationModel.findById(conversationId);

  // if conversation data not found
  if (!conversaionData)
    throw createError.NotFound("Couldn't find any conversaion data.");

  // check user id already exist or not
  conversaionData.userIds.forEach((id) => {
    // delete user id from user ids
    if (userIds.includes(id)) userIds.splice(userIds.indexOf(id), 1);
  });

  // add user to group
  const result = await conversationModel.updateById(conversationId, {
    $push: {
      userIds: {
        $each: userIds,
      },
    },
  });

  // response send
  successResponse(res, {
    statusCode: 200,
    message: "User add to group successfully.",
    payload: {
      data: result,
    },
  });
});
