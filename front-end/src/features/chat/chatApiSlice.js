import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

// get all chat
export const getAllChat = createAsyncThunk("user/getAllChat", async () => {
  try {
    const response = await axios.get(`${API_URL}/api/v1/chat`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.error.message);
  }
});

// create chat
export const createChat = createAsyncThunk("user/createChat", async (data) => {
  try {
    const response = await axios.post(`${API_URL}/api/v1/chat`, data.formData, {
      withCredentials: true,
    });
    data.setChat("");
    data.setPhotos("");

    data.socket.current.emit("lastMessageFromUser", response.data.data);

    return response.data;
  } catch (error) {
    throw new Error(error.response.data.error.message);
  }
});

// get user to use chat
export const getUserToUserChat = createAsyncThunk(
  "user/getUserToUserChat",
  async (id) => {
    try {
      const response = await axios.get(`${API_URL}/api/v1/chat/${id}`, {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.error.message);
    }
  }
);
