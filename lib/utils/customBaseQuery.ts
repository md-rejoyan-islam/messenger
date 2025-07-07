import { BaseQueryFn, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  clearTokens,
  getAccessToken,
  getRefreshToken,
  saveTokens,
} from "./auth-storage";

const API_URL = "http://localhost:5050";

let isRefreshing = false;
let failedQueue: any[] = [];

const processQueue = (error: any | null, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

const baseQuery = fetchBaseQuery({
  baseUrl: `${API_URL}/api/v1`,
  prepareHeaders: (headers) => {
    const token = getAccessToken();
    console.log("Preparing headers with token:", token);

    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

export const customBaseQuery: BaseQueryFn = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result.error && result.error.status === 401) {
    if (isRefreshing) {
      return new Promise((resolve, reject) => {
        failedQueue.push({ resolve, reject });
      })
        .then((token) => {
          return baseQuery(args, api, extraOptions);
        })
        .catch((err) => {
          return { error: err };
        });
    }

    isRefreshing = true;

    const refreshToken = getRefreshToken();
    if (!refreshToken) {
      clearTokens();
      api.dispatch({ type: "auth/logout" }); // Dispatch a logout action
      return result;
    }

    const refreshResult = await baseQuery(
      {
        url: "/auth/refresh-token",
        method: "POST",
        body: { refreshToken },
      },
      api,
      extraOptions
    );

    if (refreshResult.data) {
      const { accessToken, refreshToken: newRefreshToken } =
        refreshResult.data as { accessToken: string; refreshToken: string };
      saveTokens(accessToken, newRefreshToken);
      processQueue(null, accessToken);
      result = await baseQuery(args, api, extraOptions);
    } else {
      clearTokens();
      api.dispatch({ type: "auth/logout" }); // Dispatch a logout action
      processQueue(refreshResult.error, null);
    }

    isRefreshing = false;
  }
  return result;
};
