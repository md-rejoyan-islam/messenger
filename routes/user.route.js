import express from "express";
import {
  createUser,
  deleteUserById,
  getAllUser,
  getSingleUserById,
  updateUserById,
} from "../controllers/user.controller.js";
import { isLoggedIn } from "../middlewares/verify.js";

const userRouter = express.Router();

// use verify token
// userRouter.use(isLoggedIn);

// create route

userRouter.route("/").get(isLoggedIn, getAllUser);
userRouter
  .route("/:id")
  .get(getSingleUserById)
  .delete(deleteUserById)
  .put(updateUserById);

// export default router
export default userRouter;
