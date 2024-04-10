import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import userReducer from "../features/user/userSlice";
import chatReducer from "../features/chat/chatSlice";

// create store
const store = configureStore({
  reducer: {
    auth: authReducer,
    users: userReducer,
    chats: chatReducer,
  },
  middleware: (getDefaultMiddlewares) => getDefaultMiddlewares(),
  devTools: true,
});

// export
export default store;
