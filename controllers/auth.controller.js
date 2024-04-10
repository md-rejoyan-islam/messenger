import bcrypt from "bcryptjs";
import asyncHandler from "express-async-handler";
import createError from "http-errors";
import hashPassword from "../helpers/hashPassword.js";
import { errorResponse, successResponse } from "../helpers/responseHandler.js";
import User from "../models/user.model.js";
import {
  dotsToEncryp,
  encryptToDots,
  generateOTP,
  isEmail,
} from "../helpers/helpers.js";
import sendSMS from "../utils/sendSMS.js";
import accountActivationEmail from "../mails/accountActivationEmail.js";
import jwt from "jsonwebtoken";
import path from "path";
import isBdMobile from "../helpers/isBdMobile.js";
import { cloudUpload } from "../utils/cloudinary.js";

/**
 * @description User Login
 * @route /api/v1/auth/login
 * @method POST
 * @body {email, password}
 * @returns {object} response
 * @access public
 */

export const userLogin = asyncHandler(async (req, res) => {
  const { auth, password } = req.body;

  // email validation
  if (!auth) throw createError.BadRequest("Email or phone number is required.");
  // password validation
  if (!password) throw createError.BadRequest("Password is required.");

  // auth value manage
  let authEmail = null;
  let authPhone = null;

  if (isBdMobile(auth)) {
    authPhone = auth;
  } else if (isEmail(auth)) {
    authEmail = auth;
  } else {
    throw createError.BadRequest("Email or Phone is invalid");
  }

  // find login user by email
  const loginUser = await User.findOne(
    authEmail ? { email: authEmail } : { phone: authPhone }
  );

  // user not found
  if (!loginUser) throw createError.NotFound("User not found");

  // password check
  const passwordCheck = await bcrypt.compare(password, loginUser.password);

  // password check
  if (!passwordCheck) throw createError.Unauthorized("Password is incorrect.");

  // create access token
  const accessToken = jwt.sign({ auth }, process.env.LOGIN_TOKEN_SECRET, {
    expiresIn: process.env.LOGIN_TOKEN_EXPIRE_IN,
  });

  // save refresh token to cookie for 7 days
  res.cookie("accessToken", accessToken, {
    httpOnly: true,
    secure: true,
    // secure: process.env.APP_ENV == "Development" ? false : true,
    sameSite: "strict",
    path: "/",
    maxAge: 15 * 24 * 60 * 60 * 1000, // 15d
  });

  // send response
  successResponse(res, {
    statusCode: 200,
    accessToken,
    message: "User Login Successful",
    payload: {
      data: loginUser,
    },
  });
});

/**
 * @description User Login
 * @route /api/v1/auth/logout
 * @method POST
 * @cookie accessToken
 * @returns {object} response
 * @access logged in user
 */
export const userLogout = asyncHandler(async (req, res) => {
  // clear cookie
  res.clearCookie("accessToken", {
    secure: process.env.APP_ENV == "Development" ? false : true,
    sameSite: "strict",
  });

  // send response
  successResponse(res, {
    statusCode: 200,
    message: "Logout successful",
  });
});

/**
 * @description Create new User
 * @route /api/v1/user/register
 * @method POST
 * @body {name, auth, password}
 * @returns {object} response
 * @access public
 */
export const userRegister = asyncHandler(async (req, res) => {
  const { name, auth, password } = req.body;

  // name validation
  if (!name) throw createError.BadRequest("Name is required");
  // auth validation
  if (!auth) throw createError.BadRequest("Email or Phone is required");
  // password validation
  if (!password) throw createError.BadRequest("Password is required");

  // auth value manage
  let authEmail = null;
  let authPhone = null;

  if (isBdMobile(auth)) {
    authPhone = auth;
  } else if (isEmail(auth)) {
    authEmail = auth;
  } else {
    throw createError.BadRequest("Email or Phone is invalid");
  }

  // check user
  const userCheck = await User.findOne(
    authEmail ? { email: authEmail } : { phone: authPhone }
  );
  // user already exists
  if (userCheck)
    throw createError.BadRequest(
      authPhone ? "Phone number already exist." : "Email already exist."
    );

  // create a activation code for account verification
  const otp = generateOTP(5);

  // create verification token
  const verificationToken = jwt.sign(
    { auth: auth },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: "15m", //expires in 15 minutes
    }
  );

  //  remove dot from vericitaion token and create activation link
  const link = `${process.env.CLIENT_URL}/activation/${dotsToEncryp(
    verificationToken
  )}`;

  // send otp to email or phone
  if (authPhone) {
    await sendSMS(authPhone, `Your account verification code is ${otp}`);
  } else if (authEmail) {
    await accountActivationEmail({
      email: authEmail,
      subject: "Account Verification Code",
      code: otp,
      link,
    });
  }

  // create new user
  const user = await User.create({
    name,
    email: authEmail,
    phone: authPhone,
    password: hashPassword(password),
    accessToken: otp,
  });

  console.log(link);
  // cookie send
  res.cookie("verifyToken", verificationToken, {
    httpOnly: false, // accss token can be accessed by client side
    secure: process.env.APP_ENV == "Development" ? false : true,
    sameSite: "strict",
    maxAge: 15 * 60 * 1000,
  });

  // send response
  successResponse(res, {
    statusCode: 201,
    message: "User Created Successfully",
    payload: {
      data: user,
    },
  });
});

/**
 * @description resend verification code
 */

export const resendVerificationCode = asyncHandler(async (req, res) => {
  const { auth } = req.params;

  // auth value manage
  let authEmail = null;
  let authPhone = null;

  if (isBdMobile(auth)) {
    authPhone = auth;
  } else if (isEmail(auth)) {
    authEmail = auth;
  }

  const user = await User.findOne(
    authEmail ? { email: authEmail } : { phone: authPhone }
  );

  // if your not found
  if (!user) {
    throw createError.NotFound("Couldn't find any user.");
  }

  // if already verify
  if (user.isVerified)
    throw createError.BadRequest("You are already verify your account");

  // create a activation code for account verification
  const otp = generateOTP(5);

  // verification code set to database
  user.accessToken = otp;
  user.save();

  // create verification token
  const verificationToken = jwt.sign(
    { auth: auth },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: "15m", //expires in 15 minutes
    }
  );

  //  remove dot from vericitaion token and create activation link
  const link = `${process.env.CLIENT_URL}/activation/${dotsToEncryp(
    verificationToken
  )}`;

  // send otp to email or phone
  if (authPhone) {
    await sendSMS(authPhone, `Your account verification code is ${otp}`);
  } else if (authEmail) {
    await accountActivationEmail({
      email: authEmail,
      subject: "Account Verification Code",
      code: otp,
      link,
    });
  }

  console.log(link);
  // cookie send
  res.cookie("verifyToken", verificationToken, {
    httpOnly: false, // accss token can be accessed by client side
    secure: process.env.APP_ENV == "Development" ? false : true,
    sameSite: "strict",
    maxAge: 15 * 60 * 1000,
  });

  // send response
  successResponse(res, {
    statusCode: 200,
    message: `Please check your ${auth}.`,
    payload: {
      data: user,
    },
  });
});

/**
 * @description activation by otp
 */

export const accountActivationByOTP = asyncHandler(async (req, res) => {
  const { token } = req.params;
  const { otp } = req.body;
  if (!token) throw createError.BadRequest("Token not found.");
  if (!otp) throw createError.BadRequest("OTP not found");

  const verifyToken = encryptToDots(token);

  // verify token
  let token_check;
  try {
    token_check = jwt.verify(verifyToken, process.env.ACCESS_TOKEN_SECRET);
  } catch (error) {
    throw createError.BadRequest("Invalid token");
  }

  if (!token_check)
    throw createError.BadRequest(
      "Unauthorized, Invalid access token.Please login again."
    );
  // get auth data from token
  const { auth } = token_check;
  let activateUser = null;
  // if mobile
  if (isBdMobile(auth)) {
    activateUser = await User.findOne({
      phone: auth,
    });
  } else if (isEmail(auth)) {
    activateUser = await User.findOne({
      email: auth,
    });
  } else {
    throw createError.BadRequest("Invalid Auth data.");
  }

  // if user delete from database
  if (!activateUser) throw createError.BadRequest("Activate user not found.");

  // if wrong OTP
  if (otp !== activateUser.accessToken)
    throw createError.BadRequest("Wrong OTP");

  // clear client access token
  res.clearCookie("verifyToken", {
    httpOnly: false, // accss token can be accessed by client side
    secure: process.env.APP_ENV == "Development" ? false : true,
    sameSite: "strict",
  });

  // null access token
  activateUser.accessToken = null;
  activateUser.isVerified = true;
  activateUser.save();

  // send response
  successResponse(res, {
    statusCode: 200,
    message: "Account activate.",
    payload: {
      data: activateUser,
    },
  });
});
/**
 * @description activation by link
 */

export const accountActivationByLINK = asyncHandler(async (req, res) => {
  const { token } = req.params;

  if (!token) throw createError.BadRequest("Token not found.");

  const verifyToken = encryptToDots(token);

  // verify token
  let token_check;
  try {
    token_check = jwt.verify(verifyToken, process.env.ACCESS_TOKEN_SECRET);
  } catch (error) {
    throw createError.BadRequest("Invalid token");
  }

  if (!token_check)
    throw createError.BadRequest(
      "Unauthorized, Invalid access token.Please login again."
    );
  // get auth data from token
  const { auth } = token_check;
  let activateUser = null;
  // if mobile
  if (isBdMobile(auth)) {
    activateUser = await User.findOne({
      phone: auth,
    });
  } else if (isEmail(auth)) {
    activateUser = await User.findOne({
      email: auth,
    });
  } else {
    throw createError.BadRequest("Invalid Auth data.");
  }

  // if user delete from database
  if (!activateUser) throw createError.BadRequest("Activate user not found.");

  // clear client access token
  res.clearCookie("verifyToken", {
    httpOnly: false, // accss token can be accessed by client side
    secure: process.env.APP_ENV == "Development" ? false : true,
    sameSite: "strict",
    path: "/",
  });

  // if already active
  if (!activateUser.accessToken)
    throw createError.BadRequest("Already activate your account.");

  // null access token
  activateUser.accessToken = null;
  activateUser.isVerified = true;
  activateUser.save();

  // send response
  successResponse(res, {
    statusCode: 200,
    message: "Successfully account activate",
    payload: {
      data: activateUser,
    },
  });
});

/**
 * @description Logged In User
 * @route /api/v1/user/me
 * @method POST
 * @cookie accessToken
 * @returns {object} response
 * @access logged in user
 */
export const loggedInUser = asyncHandler(async (req, res) => {
  // send response
  successResponse(res, {
    statusCode: 200,
    message: "Logged In User Data",
    payload: {
      data: req.me,
    },
  });
});

/**
 * @description forgotten password
 */

export const forgottenPassword = asyncHandler(async (req, res) => {
  const { auth } = req.body;

  if (!auth) throw createError.BadRequest("Email or phone number is required.");

  // auth value manage
  let authEmail = null;
  let authPhone = null;

  if (isBdMobile(auth)) {
    authPhone = auth;
  } else if (isEmail(auth)) {
    authEmail = auth;
  } else {
    throw createError.BadRequest("Email or Phone is invalid");
  }

  const user = await User.findOne(
    authEmail ? { email: authEmail } : { phone: authPhone }
  );

  // if your not found
  if (!user) {
    throw createError.NotFound("Couldn't find any user.");
  }

  // create a activation code for password reset
  const otp = generateOTP(5);

  // create reset token
  const passwordResetToken = jwt.sign(
    { auth: auth },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: "15m", //expires in 15 minutes
    }
  );

  // //  remove dot from vericitaion token and create activation link
  // const link = `${process.env.CLIENT_URL}/activation/${dotsToEncryp(
  //   verificationToken
  // )}`;

  // send otp to email or phone
  if (authPhone) {
    await sendSMS(authPhone, `Your account verification code is ${otp}`);
  } else if (authEmail) {
    await accountActivationEmail({
      email: authEmail,
      subject: "Account Verification Code",
      code: otp,
      // link,
    });
  }

  // save data
  user.accessToken = otp;
  user.save();

  // console.log(link);
  // cookie send
  res.cookie("passwordResetToken", passwordResetToken, {
    httpOnly: false, // accss token can be accessed by client side
    secure: process.env.APP_ENV == "Development" ? false : true,
    sameSite: "strict",
    maxAge: 15 * 60 * 1000,
  });

  // send response
  successResponse(res, {
    statusCode: 200,
    message: `Please check your ${auth}.`,
    payload: {
      data: user,
    },
  });
});

/**
 * @description reset password
 */

export const resetPassword = asyncHandler(async (req, res) => {
  const { newPassword, oldPassword, code } = req.body;

  // password reset cookies
  const resetToken = req?.cookies?.passwordResetToken;

  if (!resetToken)
    throw createError.BadRequest("Password reset token not found.");

  if (!newPassword) throw createError.NotFound("New Password is required!");
  if (!oldPassword) throw createError.NotFound("Old Password is required!");
  if (!code) throw createError.NotFound("Code is required!");

  // minimum 6 digit password
  if (newPassword.length < 6)
    throw createError.BadRequest("Password must be at least 6 character.");

  if (newPassword !== oldPassword)
    throw createError.BadRequest("Password doesn't match.");

  // verify token
  let token_check;
  try {
    token_check = jwt.verify(resetToken, process.env.ACCESS_TOKEN_SECRET);
  } catch (error) {
    throw createError.BadRequest("Invalid reset token");
  }

  // get auth data from token
  const { auth } = token_check;
  let resetUser = null;
  // if mobile
  if (isBdMobile(auth)) {
    resetUserUser = await User.findOne({
      phone: auth,
    });
  } else if (isEmail(auth)) {
    resetUser = await User.findOne({
      email: auth,
    });
  } else {
    throw createError.BadRequest("Invalid Auth data.");
  }

  // if user delete from database
  if (!resetUser) throw createError.BadRequest("Reset user not found.");

  // code check
  if (code !== resetUser.accessToken) throw createError.NotFound("Wrong Code.");

  // password change
  resetUser.password = hashPassword(newPassword);
  resetUser.save();

  // clear client access token
  res.clearCookie("passwordResetToken", {
    httpOnly: false, // accss token can be accessed by client side
    secure: process.env.APP_ENV == "Development" ? false : true,
    sameSite: "strict",
    path: "/",
  });

  // response send
  successResponse(res, {
    statusCode: 200,
    message: "Successfully password reset.",
    payload: {
      data: resetUser,
    },
  });
});

/**
 * @description update user photo
 */

export const updatePhoto = asyncHandler(async (req, res) => {
  const photo = req.file;

  if (!photo) throw createError.BadRequest("Photo is required.");

  // find user
  const user = await User.findById(req.me._id);

  const PHOTO_URL = await cloudUpload(photo.path);

  // update photo
  user.photo = PHOTO_URL;

  user.save();

  // response send
  successResponse(res, {
    statusCode: 200,
    message: "Photo updated successfully.",
    payload: {
      data: user,
    },
  });
});
