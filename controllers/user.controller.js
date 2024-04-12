import asyncHandler from "express-async-handler";
import createError from "http-errors";
import mongoose from "mongoose";
import hashPassword from "../helpers/hashPassword.js";
import { successResponse } from "../helpers/responseHandler.js";
import User from "../models/user.model.js";
import chatModel from "../models/chat.model.js";

/**
 * @descriptionription Get all users data
 * @route /api/v1/user
 * @method GET
 * @returns {object} response
 * @access admin
 */

// ( without logged in user)

export const getAllUser = asyncHandler(async (req, res) => {
  const users = await User.find({
    $and: [{ isVerified: true }, { _id: { $ne: req.me._id } }],
  }).select("-password -accessToken -__v"); // remove logged in user data

  if (!users.length) throw createError.NotFound("Couldn't find any data.");

  // total user count
  const totalUser = users.length;

  // send response
  successResponse(res, {
    statusCode: 200,
    message: "All users data",
    payload: {
      total: totalUser,
      data: users,
    },
  });
});

// get all user with last message and user info ( without logged in user)
export const getAllUserWithLastMessage = asyncHandler(async (req, res) => {
  const users = await User.find({
    $and: [{ isVerified: true }, { _id: { $ne: req.me._id } }],
  }).select("-password -accessToken -__v"); // remove logged in user data

  if (!users.length) throw createError.NotFound("Couldn't find any data.");

  // get their last message
  const usersWithLastMessage = await Promise.all(
    users.map(async (user) => {
      const lastMessageData = await chatModel
        .findOne({
          $or: [
            { $and: [{ senderId: req.me._id }, { receiverId: user._id }] },
            { $and: [{ senderId: user._id }, { receiverId: req.me._id }] },
          ],
        })
        .sort({ createdAt: -1 }); // sort by latest message;

      return {
        ...user._doc,
        lastMessage: {
          sender:
            lastMessageData?.senderId === req.me._id.toString() ? "me" : "you",
          message: lastMessageData?.message,
        },
        lastMessageTime: lastMessageData?.createdAt || null,
      };
    })
  );

  // total user count
  const totalUser = users.length;

  // send response
  successResponse(res, {
    statusCode: 200,
    message: "All users data with last message.",
    payload: {
      total: totalUser,
      data: usersWithLastMessage,
    },
  });
});

/**
 * @description Get Single users data
 * @route /api/v1/user/:id
 * @method GET
 * @param id
 * @returns {object} response
 * @access logged in user
 */
export const getSingleUserById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  // id check
  if (!mongoose.isValidObjectId(id))
    throw createError.BadRequest("Invalid user id.");

  const user = await User.findById(id);

  if (!user) throw createError.NotFound("Couldn't find any data.");

  // response send
  successResponse(res, {
    statusCode: 200,
    message: "Single user data.",
    payload: {
      data: user,
    },
  });
});

/**
 * @descriptionription Create new User
 * @route /api/v1/user
 * @method POST
 * @access private
 * @body {name, email, password, role}
 * @returns {object} response
 */

export const createUser = asyncHandler(async (req, res) => {
  const { name, email, password, role } = req.body;

  // name is require
  if (!name) throw createError(404, "Name is required!");
  // email is require
  if (!email) throw createError(404, "Email is required!");
  // password is require
  if (!password) throw createError(400, "All fields are required");

  // check user email
  const user = await User.findOne({ email });

  if (user) throw createError.BadRequest("Email already exists.");

  // create new user
  const result = await User.create({
    name,
    email,
    password: hashPassword(password),
    role,
  });

  // send user access to email
  // sendMail({
  //   to: email,
  //   sub: "Account Access Info",
  //   msg: `Your account login access is email : ${email} & password : ${password}`,
  // });

  // send response
  successResponse(res, {
    statusCode: 200,
    message: `${name} user created successful`,
    payload: {
      data: result,
    },
  });
});

/**
 * @descriptionription Delete User
 * @route /api/v1/user/:id
 * @method DELETE
 * @access private
 * @param id
 * @returns {object} response
 */
export const deleteUserById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  // id check
  if (!mongoose.isValidObjectId(id))
    throw createError.BadRequest("Invalid user id.");

  const user = await User.findById(id);
  if (!user) throw createError(404, "Couldn't find any data.");

  // delete user
  const result = await User.findByIdAndDelete(id);

  successResponse(res, {
    statusCode: 200,
    message: "Successfully deleted user data.",
    payload: {
      data: user,
    },
  });
});

/**
 * @description Update User
 * @route /api/v1/user/:id
 * @method PUT/PATCH
 * @access public
 */
export const updateUserById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  // id check
  if (!mongoose.isValidObjectId(id)) throw createError(400, "Invalid user id.");

  const user = await User.findById(id);

  if (!user) throw createError(404, "Couldn't find any data.");

  // update user data
  const result = await User.findByIdAndUpdate(
    id,
    {
      ...req.body,
    },
    { new: true }
  );

  // send response
  successResponse(res, {
    statusCode: 200,
    message: "Successfully update user data.",
    payload: {
      data: result,
    },
  });
});
