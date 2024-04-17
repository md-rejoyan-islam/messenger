import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

// get all users
export const getAllUser = createAsyncThunk("user/getAllUser", async () => {
  try {
    const response = await axios.get(`${API_URL}/api/v1/users`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.error.message);
  }
});

// get all users with last message
export const getAllUserWithLastMessage = createAsyncThunk(
  "user/getAllUserWithLastMessage",
  async () => {
    try {
      const response = await axios.get(`${API_URL}/api/v1/users/last-message`, {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.error.message);
    }
  }
);

// disconnected users
export const getDisconnectedUsers = createAsyncThunk(
  "user/getDisconnectedUsers",
  async () => {
    try {
      const response = await axios.get(
        `${API_URL}/api/v1/users/disconnnect-user`,
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
