import express from "express";
import {
  accountActivationByLINK,
  accountActivationByOTP,
  forgottenPassword,
  loggedInUser,
  resendVerificationCode,
  resetPassword,
  updatePhoto,
  userLogin,
  userLogout,
  userRegister,
} from "../controllers/auth.controller.js";
import { isLoggedIn, isLoggedOut } from "../middlewares/verify.js";
import { userPhotoUpload } from "../utils/multerForCloudinary.js";

const authRouter = express.Router();

// create route
authRouter.route("/login").post(isLoggedOut, userLogin);
authRouter.route("/logout").post(isLoggedIn, userLogout);
authRouter.route("/register").post(isLoggedOut, userRegister);
authRouter.route("/me").get(isLoggedIn, loggedInUser);
authRouter.route("/activation-by-otp/:token").post(accountActivationByOTP);
authRouter.route("/activation-by-link/:token").post(accountActivationByLINK);
authRouter.route("/resend-code/:auth").get(resendVerificationCode);
authRouter.route("/forgotten-password").post(forgottenPassword);
authRouter.route("/reset-password").post(resetPassword);
authRouter
  .route("/photo-change")
  .post(isLoggedIn, userPhotoUpload, updatePhoto);

// export default router
export default authRouter;
