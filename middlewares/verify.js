import asyncHandler from "express-async-handler";
import createError from "http-errors";
import jwt from "jsonwebtoken";
import { errorResponse } from "../helpers/responseHandler.js";
import User from "../models/user.model.js";
import isBdMobile from "../helpers/isBdMobile.js";
import isEmail from "../helpers/isEmail.js";

const isLoggedIn = asyncHandler(async (req, res, next) => {
  //     const authHeader = req.headers.authorization || req.headers.Authorization;
  // console.log(authHeader);
  //     const authToken = req?.cookies?.accessToken;
  //     const token = authHeader?.split(" ")[1] || authToken;
  // console.log(authHeader);

  const token = req?.cookies?.accessToken; // direct access token from cookie

  if (!token) {
    throw createError(
      401,
      "Unauthorized, Access token not found. Please login."
    );
  }

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (err, decode) => {
    if (err) {
      // clear cookie
      res.clearCookie("accessToken", {
        secure: process.env.APP_ENV == "Development" ? false : true,
        sameSite: "strict",
      });

      // response send
      return errorResponse(res, {
        statusCode: 400,
        message: "Unauthorized, Invalid access token.Please login again",
      });
    }
    const { auth } = decode;
    let loginUser = null;

    // if mobile
    if (isBdMobile(auth)) {
      loginUser = await User.findOne({
        phone: auth,
      });
    } else if (isEmail(auth)) {
      loginUser = await User.findOne({
        email: auth,
      });
    }

    // if user not exist
    if (!loginUser) {
      // clear cookie
      res.clearCookie("accessToken");
      // send response
      return errorResponse(res, {
        statusCode: 400,
        message: "User not found.",
      });
    }

    req.me = loginUser;
    next();
  });
});

const isLoggedOut = asyncHandler(async (req, res, next) => {
  //   const authHeader = req.headers.authorization || req.headers.Authorization;

  const authToken = req?.cookies?.accessToken;
  //   const token = authHeader?.split(" ")[1] || authToken;

  if (authToken) {
    throw createError(400, "User is already logged in");
  }

  next();
});

export { isLoggedIn, isLoggedOut };
