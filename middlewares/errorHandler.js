import { errorResponse } from "../helpers/responseHandler.js";
import mongoose from "mongoose";

/**
 * @description Custom error handler
 * @param {*} error
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
export const errorHandler = (err, req, res, next) => {
  if (err instanceof mongoose.Error) {
    //  mongoose validation error
    // show first error message only to user
    Object.values(err.errors).forEach((error, index) => {
      if (index === 0) {
        err.message = error.message;
      }
    });

    // full error details
    // Object.values(err.errors).find((val) => val.message);

    err.status = 400;
  }

  if (err instanceof mongoose.CastError) {
    err.status = 400;
  }

  // mongoose duplicate key error
  if (err.code === 11000) {
    err.status = 400;

    err.message = ` ${Object.keys(err.keyValue)} must be unique`;
  }

  errorResponse(res, {
    statusCode: err.status || 500,
    message: err.message,
  });
};
