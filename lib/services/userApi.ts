import type { BaseQueryFn, FetchArgs } from "@reduxjs/toolkit/query";
import {
  createApi,
  fetchBaseQuery,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query/react";
const rawBaseQuery = fetchBaseQuery({
  baseUrl: "/api/proxy/user",
  credentials: "include",
});

export const baseQueryWithRedirect: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  const result = await rawBaseQuery(args, api, extraOptions);

  if (result.error?.status === 401) {
    if (typeof window !== "undefined") {
      window.location.href = "/login";
    }
    return result;
  }

  return result;
};

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: baseQueryWithRedirect,
  tagTypes: ["User"],
  endpoints: (builder) => ({
    updateProfile: builder.mutation({
      query: (userData) => ({
        url: "/profile",
        method: "PUT",
        body: userData,
      }),
      invalidatesTags: ["User"], // Invalidate 'User' tag after profile update
    }),
    changePassword: builder.mutation({
      query: (passwords) => ({
        url: "/change-password",
        method: "PUT",
        body: passwords,
      }),
      invalidatesTags: ["User"], // Invalidate 'User' tag after password change
    }),
    sendFriendRequest: builder.mutation({
      query: ({ id }) => ({
        url: `/friend-requests/${id}`,
        method: "POST",
      }),
      // providesTags: ["User"], // Provide 'User' tag for friend requests
      invalidatesTags: ["User"], // Invalidate 'User' tag after friend request
    }),
    getFriendRequests: builder.query({
      query: () => ({
        url: "/friend-requests",
        method: "GET",
      }),
      providesTags: ["User"], // Provide 'User' tag for friend requests
    }),
    acceptFriendRequest: builder.mutation({
      query: ({ id }) => ({
        url: `/friend-requests/${id}/accept`,
        method: "POST",
      }),
      invalidatesTags: ["User"], // Invalidate 'User' tag after accepting friend request
    }),
    rejectFriendRequest: builder.mutation({
      query: ({ id }) => ({
        url: `/friend-requests/${id}/reject`,
      }),
      invalidatesTags: ["User"], // Invalidate 'User' tag after rejecting friend request
    }),
    cancelFriendRequest: builder.mutation({
      query: ({ id }) => ({
        url: `/friend-requests/${id}/cancel`,
        method: "POST",
      }),
      invalidatesTags: ["User"], // Invalidate 'User' tag after cancelling friend request
    }),
    unfriend: builder.mutation({
      query: ({ id }) => ({
        url: `${id}/unfriend`,
        method: "POST",
      }),
      invalidatesTags: ["User"], // Invalidate 'User' tag after unfriending
    }),
    blockUser: builder.mutation({
      query: (data) => ({
        url: "/block",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["User"], // Invalidate 'User' tag after blocking user
    }),
    unblockUser: builder.mutation({
      query: (data) => ({
        url: "/unblock",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["User"], // Invalidate 'User' tag after unblocking user
    }),
    findFriends: builder.query({
      query: (searchTerm) => ({
        url: `/find-friends?search=${searchTerm}`,
        method: "GET",
      }),
    }),
    getSendFriendRequests: builder.query({
      query: () => ({
        url: "/sent-requests",
        method: "GET",
      }),
      providesTags: ["User"], // Provide 'User' tag for sent friend requests
    }),
    getAllFriends: builder.query({
      query: () => ({
        url: "/friends",
        method: "GET",
      }),
      providesTags: ["User"], // Provide 'User' tag for all friends
    }),
    getUserProfile: builder.query({
      query: () => ({
        url: `/profile`,
        method: "GET",
      }),
    }),
    // providesTags: (result) =>
    //   result
    //     ? [...result.map(({ id }) => ({ type: "User", id })), "User"]
    //     : ["User"], // Provide tags for each user found
  }),
});

export const {
  useUpdateProfileMutation,
  useChangePasswordMutation,
  useSendFriendRequestMutation,
  useAcceptFriendRequestMutation,
  useRejectFriendRequestMutation,
  useCancelFriendRequestMutation,
  useUnfriendMutation,
  useBlockUserMutation,
  useUnblockUserMutation,
  useFindFriendsQuery,
  useGetFriendRequestsQuery,
  useGetSendFriendRequestsQuery,
  useGetAllFriendsQuery,
  useGetUserProfileQuery,
} = userApi;
