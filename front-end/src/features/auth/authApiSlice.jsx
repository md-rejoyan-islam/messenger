import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

// register user
export const createUser = createAsyncThunk(
  "auth/createUser",
  async ({ data, setIsLoading, resetForm, navigate }) => {
    try {
      const response = await axios.post(
        `${API_URL}/api/v1/auth/register`,
        data,
        {
          withCredentials: true,
        }
      );
      resetForm();
      navigate(`/activation?auth=${data.auth}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.error.message);
    } finally {
      setIsLoading(false);
    }
  }
);

// activation by otp
export const activateAccountByOTP = createAsyncThunk(
  "auth/accountActivateByOTP",
  async (data) => {
    try {
      const response = await axios.post(
        `${API_URL}/api/v1/auth/activation-by-otp/${data.token}`,
        { otp: data.code },
        {
          withCredentials: true,
        }
      );
      data.resetForm();
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.error.message);
    }
  }
);
// activation by token url
export const activateAccountByURL = createAsyncThunk(
  "auth/accountActivateByURL",
  async ({ url }) => {
    try {
      const response = await axios.post(
        `${API_URL}/api/v1/auth/activation-by-link/${url}`,
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

// Login user
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async ({ inputs, setIsLoading, navigate }) => {
    try {
      const response = await axios.post(
        `${API_URL}/api/v1/auth/login`,
        inputs,
        {
          withCredentials: true,
        }
      );

      navigate("/");
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.error.message);
    } finally {
      setIsLoading(false);
    }
  }
);

// Login user
export const logoutUser = createAsyncThunk("auth/logoutUser", async () => {
  try {
    const response = await axios.post(`${API_URL}/api/v1/auth/logout`, "", {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.error.message);
  }
});

// Login user
export const getLoggedInUser = createAsyncThunk(
  "auth/getLoggedInUser",
  async () => {
    try {
      const response = await axios.get(`${API_URL}/api/v1/auth/me`, {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.error.message);
    }
  }
);

// resend verification code
export const resendVerificationCode = createAsyncThunk(
  "auth/resendVerificationCode",
  async ({ auth }) => {
    try {
      const response = await axios.get(
        `${API_URL}/api/v1/auth/resend-code/${auth}`,
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

// forgotten password
export const forgottenPassword = createAsyncThunk(
  "auth/forgottenPassword ",
  async ({ auth, resetForm, setIsLoading, navigate }) => {
    try {
      const response = await axios.post(
        `${API_URL}/api/v1/auth/forgotten-password/`,
        { auth },
        {
          withCredentials: true,
        }
      );
      resetForm();
      navigate("/reset-password");
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.error.message);
    } finally {
      setIsLoading(false);
    }
  }
);

// reset password
export const resetPassword = createAsyncThunk(
  "auth/resetPassword",
  async ({ inputs, setLoading, resetForm, navigate }) => {
    try {
      const response = await axios.post(
        `${API_URL}/api/v1/auth/reset-password`,
        inputs,
        {
          withCredentials: true,
        }
      );
      resetForm();
      navigate("/login");
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.error.message);
    } finally {
      setLoading(false);
    }
  }
);

// update user photo
export const changeUserPhoto = createAsyncThunk(
  "auth/ changeUserPhoto",
  async (data) => {
    try {
      const response = await axios.post(
        `${API_URL}/api/v1/auth/photo-change`,
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
