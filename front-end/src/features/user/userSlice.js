import { createSlice } from "@reduxjs/toolkit";
import {
  getAllUserWithLastMessage,
  getDisconnectedUsers,
} from "./userApiSlice";

// create auth slice
const userSlice = createSlice({
  name: "users",
  initialState: {
    users: [],
    error: null,
    message: null,
    disconnectedUser: [],
  },
  reducers: {
    setMessageEmpty: (state) => {
      state.message = null;
      state.error = null;
    },
    updateDisconnectedUsersData: (state, action) => {
      state.disconnectedUser = state.disconnectedUser.filter(
        (user) => user._id !== action.payload.receiverId
      );
    },
  },
  extraReducers: (builder) => {
    builder
      // all users
      .addCase(getAllUserWithLastMessage.fulfilled, (state, action) => {
        state.users = action.payload.data;
      })
      // disconnected users

      .addCase(getDisconnectedUsers.fulfilled, (state, action) => {
        state.disconnectedUser = action.payload.data;
      });
  },
});

// selectors
export const getAllUserData = (state) => state.users;
// actions
export const { setMessageEmpty, updateDisconnectedUsersData } =
  userSlice.actions;

// export
export default userSlice.reducer;
