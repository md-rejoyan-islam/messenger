import asyncHandler from "express-async-handler";
import createError from "http-errors";
import conversationModel from "../models/conversation.model.js";
import { successResponse } from "../helpers/responseHandler.js";
import mongoose from "mongoose";
import userModel from "../models/user.model.js";

// get all conversations
export const getAllConversation = asyncHandler(async (req, res) => {
  const result = await conversationModel.find({});

  if (!result)
    throw createError.NotFound("Couldn't find any conversaion data.");

  // total conversation
  const total = result.length;

  // send response
  successResponse(res, {
    statusCode: 200,
    message: "All conversation data.",
    payload: {
      total,
      data: result,
    },
  });
});

// get user all conversation
export const getUserAllConversation = asyncHandler(async (req, res) => {
  const result = await conversationModel.find({
    userIds: req.me._id,
  });
  // .populate("messagesIds");

  if (!result.length)
    throw createError.NotFound("Couldn't find any conversaion data.");

  // total conversation
  const total = result.length;

  // send response
  successResponse(res, {
    statusCode: 200,
    message: "User conversation data.",
    payload: {
      total,
      data: result,
    },
  });
});

// get user all conversation with last message
export const getUserAllConversationWithLastMessage = asyncHandler(
  async (req, res) => {
    const conversaitons = await conversationModel
      .find({
        userIds: req.me._id,
      })
      .populate({
        path: "messagesIds",
        options: { sort: { createdAt: -1 } },
      })
      .populate({
        path: "userIds",
        select: "name photo",
      });

    if (!conversaitons.length)
      throw createError.NotFound("Couldn't find any conversaion data.");

    // deep copy
    const copydata = JSON.parse(JSON.stringify(conversaitons));

    // only last message show
    const result = copydata.map((data) => {
      if (data.messagesIds.length) {
        data.messagesIds = data.messagesIds[0];
      } else {
        data.messagesIds = {};
      }
      return data;
    });

    // total conversation
    const total = result.length;

    // send response
    successResponse(res, {
      statusCode: 200,
      message: "User conversation data with last message.",
      payload: {
        total,
        data: result,
      },
    });
  }
);

// user conversation create
export const userConversationCreate = asyncHandler(async (req, res) => {
  const { receiverId } = req.body;

  if (!receiverId) throw createError.BadRequest("Receiver is required.");

  // check receiver id
  if (!mongoose.isValidObjectId(receiverId))
    throw createError.BadRequest("Invalid receiver id.");

  // check receiver data
  const receiver = await userModel.findById(receiverId);

  if (!receiver) throw createError.NotFound("Couldn't find any receiver data.");

  let result = null;
  // if before create conversation
  result = await conversationModel.findOne({
    userIds: {
      $all: [req.me._id, receiverId],
    },
    conversationType: "single",
  });

  // create conversation if before not create
  if (!result) {
    result = await conversationModel.create({
      userIds: [req.me._id, receiverId],
      isGroup: false,
      conversationType: "single",
    });

    // conversation id add to user data
    // conversation id add to user data
    const data = await userModel.updateMany(
      {
        _id: {
          $in: [req.me._id, receiverId],
        },
      },
      {
        $addToSet: {
          conversationIds: result._id,
        },
      },
      {
        new: true,
      }
    );
  }

  // send response
  successResponse(res, {
    statusCode: 200,
    message: "Conversation create successfully.",
    payload: {
      data: {
        ...result._doc,
        receiverId,
      },
    },
  });
});

// group create
export const groupCreate = asyncHandler(async (req, res) => {
  const { name, userIds } = req.body;

  if (!name) throw createError.BadRequest("Group name is required.");

  if (!userIds) throw createError.BadRequest("User ids is required.");

  // create group
  const result = await conversationModel.create({
    name,
    userIds,
    isGroup: true,
    conversationType: "group",
  });

  // send response
  successResponse(res, {
    statusCode: 200,
    message: "Group create successfully.",
    payload: {
      data: result,
    },
  });
});

// get conversaion by id
export const getConversationById = asyncHandler(async (req, res) => {
  const conversationId = req.params.id;

  if (!conversationId)
    throw createError.BadRequest("Conversation id is required.");

  if (!mongoose.isValidObjectId(conversationId))
    throw createError.BadRequest("Invalid conversation id.");

  const result = await conversationModel.findById(conversationId).populate({
    path: "messagesIds",
  });

  if (!result)
    throw createError.NotFound("Couldn't find any conversation data.");

  successResponse(res, {
    statusCode: 200,
    message: "Conversation data by id.",
    payload: {
      data: result,
    },
  });
});
