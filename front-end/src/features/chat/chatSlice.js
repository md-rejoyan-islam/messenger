import { createSlice } from "@reduxjs/toolkit";
import { createChat, getUserToUserChat } from "./chatApiSlice";

// create auth slice
const chatSlice = createSlice({
  name: "chats",
  initialState: {
    chats: [],
    error: null,
    message: null,
    loading: false,
  },
  reducers: {
    setMessageEmpty: (state) => {
      state.message = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // add new chat
      .addCase(createChat.fulfilled, (state, action) => {
        state.chats = [...state.chats, action.payload.data];
      })

      // user to use chat
      .addCase(getUserToUserChat.rejected, (state) => {
        state.chats = [];
      })
      .addCase(getUserToUserChat.fulfilled, (state, action) => {
        state.chats = action.payload.data;
      });
  },
});

// selectors
export const getAllUserChat = (state) => state.chats;
// actions
export const { setMessageEmpty } = chatSlice.actions;

// export
export default chatSlice.reducer;
