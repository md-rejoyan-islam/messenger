import { createSlice } from "@reduxjs/toolkit";
import { getAllUserWithLastMessage } from "./userApiSlice";

// create auth slice
const userSlice = createSlice({
  name: "users",
  initialState: {
    users: [],
    error: null,
    message: null,
  },
  reducers: {
    setMessageEmpty: (state) => {
      state.message = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // all users
      .addCase(getAllUserWithLastMessage.fulfilled, (state, action) => {
        state.users = action.payload.data;
      });
  },
});

// selectors
export const getAllUserData = (state) => state.users;
// actions
export const { setMessageEmpty } = userSlice.actions;

// export
export default userSlice.reducer;
