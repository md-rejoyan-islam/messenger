import { createSlice } from "@reduxjs/toolkit";
import {
  createUserToUserChat,
  getConversationById,
  getUserAllConversationWithLastMessage,
} from "./conversationApiSlice";

// create auth slice
const conversationSlice = createSlice({
  name: "conversations",
  initialState: {
    conversations: [],
    activeConversation: null,
    error: null,
    message: null,
    loading: false,
    typingChatUser: {},
  },
  reducers: {
    setMessageEmpty: (state) => {
      state.message = null;
      state.error = null;
    },
    updateActiveUserIncomingMsg: (state, action) => {
      // update last message of conversation
      state.conversations = state.conversations.map((conversation) => {
        if (conversation._id === action.payload.conversationId) {
          return {
            ...conversation,
            messagesIds: action.payload,
          };
        }
        return conversation;
      });

      // update active conversation
      if (state.activeConversation?._id === action.payload.conversationId) {
        state.activeConversation = {
          ...state.activeConversation,
          messagesIds: [
            ...state.activeConversation.messagesIds,
            action.payload,
          ],
        };
      }
    },
    updateTypingChatuser: (state, action) => {
      state.tyingChatUser = action.payload ? action.payload : {};
    },
  },
  extraReducers: (builder) => {
    builder
      // get user all conversation with last message
      .addCase(
        getUserAllConversationWithLastMessage.fulfilled,
        (state, action) => {
          state.conversations = action.payload.data;
        }
      )
      // get conversation by id
      .addCase(getConversationById.rejected, (state) => {
        state.activeConversation = null;
      })
      .addCase(getConversationById.fulfilled, (state, action) => {
        state.activeConversation = action.payload.data;
      })
      // create user to user chat
      .addCase(createUserToUserChat.fulfilled, (state, action) => {
        state.activeConversation = {
          ...state.activeConversation,
          messagesIds: [
            ...state.activeConversation.messagesIds,
            action.payload.data,
          ],
        };

        // update data in conversation
        state.conversations = state.conversations.map((conversation) => {
          if (conversation._id === action.payload.data.conversationId) {
            return {
              ...conversation,
              messagesIds: action.payload.data,
            };
          }
          return conversation;
        });
      });
  },
});

// selectors
export const getAllConversation = (state) => state.conversations;
// actions
export const {
  setMessageEmpty,
  updateActiveUserIncomingMsg,
  updateTypingChatuser,
} = conversationSlice.actions;

// export
export default conversationSlice.reducer;
