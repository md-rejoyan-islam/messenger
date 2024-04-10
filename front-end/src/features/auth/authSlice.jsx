import { createSlice } from "@reduxjs/toolkit";
import {
  activateAccountByOTP,
  activateAccountByURL,
  changeUserPhoto,
  createUser,
  forgottenPassword,
  getLoggedInUser,
  loginUser,
  logoutUser,
  resendVerificationCode,
  resetPassword,
} from "./authApiSlice";

// create auth slice
const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: localStorage?.getItem("user")
      ? JSON.parse(localStorage?.getItem("user"))
      : null,
    message: null,
    error: null,
    loader: null,
  },
  reducers: {
    setMessageEmpty: (state) => {
      state.message = null;
      state.error = null;
    },
    setLogout: (state) => {
      state.message = null;
      state.error = null;
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // user create
      .addCase(createUser.pending, (state) => {
        state.loader = true;
      })
      .addCase(createUser.rejected, (state, action) => {
        state.loader = false;
        state.error = action.error.message;
      })

      .addCase(createUser.fulfilled, (state, action) => {
        state.loader = false;
        state.message = action.payload.message;
      })

      // account activate by otp
      .addCase(activateAccountByOTP.pending, (state) => {
        state.loader = true;
      })
      .addCase(activateAccountByOTP.rejected, (state, action) => {
        state.loader = false;
        state.error = action.error.message;
      })
      .addCase(activateAccountByOTP.fulfilled, (state, action) => {
        state.loader = false;
        state.message = action.payload.message;
        if (state.user) {
          state.user = action.payload.data;
          localStorage.setItem("user", JSON.stringify(action.payload.data));
        }
      })
      // account activate by url
      .addCase(activateAccountByURL.pending, (state) => {
        state.loader = true;
      })
      .addCase(activateAccountByURL.rejected, (state, action) => {
        state.loader = false;
        // state.error = action.error.message;
      })
      .addCase(activateAccountByURL.fulfilled, (state, action) => {
        state.loader = false;
        // state.message = action.payload.message;
      })

      // user login
      .addCase(loginUser.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.message = action.payload.message;
        state.user = action.payload.data;
        localStorage.setItem("user", JSON.stringify(action.payload.data));
      })

      // logout
      .addCase(logoutUser.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(logoutUser.fulfilled, (state, action) => {
        state.message = action.payload.message;
        state.user = null;
        localStorage.removeItem("user");
      })

      // get logged in your
      .addCase(getLoggedInUser.rejected, (state, action) => {
        // state.error = action.error.message;
        state.user = null;
      })
      .addCase(getLoggedInUser.fulfilled, (state, action) => {
        state.user = action.payload.data;
        localStorage.setItem("user", JSON.stringify(action.payload.data));
      })
      // resend verification code
      .addCase(resendVerificationCode.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(resendVerificationCode.fulfilled, (state, action) => {
        state.message = action.payload.message;
        state.user = action.payload.data;
        localStorage.setItem("user", JSON.stringify(action.payload.data));
      })
      // forgooten password
      .addCase(forgottenPassword.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(forgottenPassword.fulfilled, (state, action) => {
        state.message = action.payload.message;
      })
      // reset password
      .addCase(resetPassword.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(resetPassword.fulfilled, (state, action) => {
        state.message = action.payload.message;
      })
      // change user photo
      .addCase(changeUserPhoto.fulfilled, (state, action) => {
        state.user = action.payload.data;
        localStorage.setItem("user", JSON.stringify(action.payload.data));
      });
  },
});

// selectors
export const getAuthData = (state) => state.auth;
// actions
export const { setMessageEmpty, setLogout } = authSlice.actions;

// export
export default authSlice.reducer;
