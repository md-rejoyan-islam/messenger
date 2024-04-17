import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

// user conversation with last message
export const getUserAllConversationWithLastMessage = createAsyncThunk(
  "conversation/getUserAllConversationWithLastMessage",
  async () => {
    try {
      const response = await axios.get(
        `${API_URL}/api/v1/conversation/user-with-last-message`,
        {
          withCredentials: true,
        }
      );
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.error.message);
    }
  }
);

// get conversaiton by id
export const getConversationById = createAsyncThunk(
  "conversation/getConversationById",
  async (id) => {
    try {
      const response = await axios.get(`${API_URL}/api/v1/conversation/${id}`, {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.error.message);
    }
  }
);

// create user to user message
export const createUserToUserChat = createAsyncThunk(
  "message/createUserToUserChat",
  async (data) => {
    try {
      const response = await axios.post(
        `${API_URL}/api/v1/message/user-to-user`,
        data.formData,
        {
          withCredentials: true,
        }
      );

      // receiver id
      const receiverId = data.formData.get("receiverId");

      data.setChat("");
      data.setPhotos("");

      data.socket.current.emit("lastMessageFromUser", {
        ...response.data.data,
        receiverId,
      });

      return response.data;
    } catch (error) {
      throw new Error(error.response.data.error.message);
    }
  }
);

// create user conversation

export const createUserConversation = createAsyncThunk(
  "conversation/createUserConversation",
  async (data) => {
    try {
      const response = await axios.post(
        `${API_URL}/api/v1/conversation/create-user-conversation`,
        data,
        {
          withCredentials: true,
        }
      );

      return response.data;
    } catch (error) {
      throw new Error(error.response.data.error.message);
    }
  }
);
