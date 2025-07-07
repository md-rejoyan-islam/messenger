import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const groupApi = createApi({
  reducerPath: "groupApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api/proxy", // Base URL for the API requests
  }), // Use the proxy endpoint for API requests
  // baseQuery: customBaseQuery,
  tagTypes: ["Group"], // Define tag type for group-related data
  endpoints: (builder) => ({
    createGroup: builder.mutation({
      query: (groupData) => ({
        url: "/",
        method: "POST",
        body: groupData,
      }),
      invalidatesTags: ["Group"], // Invalidate 'Group' tag after creating a group
    }),
    addGroupMember: builder.mutation({
      query: (data) => ({
        url: "/add-member",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Group"], // Invalidate 'Group' tag after adding a member
    }),
    removeGroupMember: builder.mutation({
      query: (data) => ({
        url: "/remove-member",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Group"], // Invalidate 'Group' tag after removing a member
    }),
  }),
});

export const {
  useCreateGroupMutation,
  useAddGroupMemberMutation,
  useRemoveGroupMemberMutation,
} = groupApi;
