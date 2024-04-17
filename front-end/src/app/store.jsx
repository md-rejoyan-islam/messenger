import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import userReducer from "../features/user/userSlice";
import chatReducer from "../features/chat/chatSlice";
import conversationReducer from "../features/conversation/conversationSlice";

// create store
const store = configureStore({
  reducer: {
    auth: authReducer,
    users: userReducer,
    chats: chatReducer,
    conversations: conversationReducer,
  },
  middleware: (getDefaultMiddlewares) => getDefaultMiddlewares(),
  devTools: true,
});

// export
export default store;
