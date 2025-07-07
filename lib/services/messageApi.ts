import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const messageApi = createApi({
  reducerPath: "messageApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api/proxy", // Base URL for the API requests
  }), // Use the proxy endpoint for API requests
  // baseQuery: customBaseQuery,
  tagTypes: ["Message"], // Define tag type for message-related data
  endpoints: (builder) => ({
    sendMessage: builder.mutation({
      query: (messageData) => ({
        url: "/",
        method: "POST",
        body: messageData,
      }),
      invalidatesTags: ["Message"], // Invalidate 'Message' tag after sending a message
    }),
    editMessage: builder.mutation({
      query: (messageData) => ({
        url: "/",
        method: "PUT",
        body: messageData,
      }),
      invalidatesTags: ["Message"], // Invalidate 'Message' tag after editing a message
    }),
    deleteMessage: builder.mutation({
      query: (messageData) => ({
        url: "/",
        method: "DELETE",
        body: messageData,
      }),
      invalidatesTags: ["Message"], // Invalidate 'Message' tag after deleting a message
    }),
  }),
});

export const {
  useSendMessageMutation,
  useEditMessageMutation,
  useDeleteMessageMutation,
} = messageApi;
