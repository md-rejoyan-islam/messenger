"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import {
  useAcceptFriendRequestMutation,
  useGetFriendRequestsQuery,
  useRejectFriendRequestMutation,
} from "@/lib/services/userApi";
import { getTimeElapsed } from "@/lib/utils/getTimeElapsed";
import { Check, User, X } from "lucide-react";
import { toast } from "sonner";

type FriendRequest = {
  _id: string;
  name: string;
  profilePhoto: string;
  mutualFriends?: number;
  createdAt: string;
};

const FriendRequestClient = () => {
  const { data, refetch } = useGetFriendRequestsQuery({});

  const friendRequests: FriendRequest[] = data?.data || [];

  console.log(data);

  const [
    sendAcceptFriendRequestMutation,
    // {
    //   isLoading: isSendingRequest,
    //   isSuccess: isRequestSent,
    //   error: requestError,
    // },
  ] = useAcceptFriendRequestMutation();

  const [
    rejectFriendRequestMutation,
    // {
    //   isLoading: isRejectingRequest,
    //   isSuccess: isRequestRejected,
    //   error: rejectError,
    // },
  ] = useRejectFriendRequestMutation();

  const acceptFriendRequest = async (id: string) => {
    try {
      await sendAcceptFriendRequestMutation({ id }).unwrap();
      refetch();
      toast.success("Friend Request Cancelled", {
        description: "Your friend request has been cancelled.",
      });
    } catch (err) {
      console.error("Failed to cancel friend request:", err);
      toast.error("Failed to cancel", {
        description: "Failed to cancel friend request.",
      });
    }
  };

  const rejectFriendRequest = async (id: string) => {
    try {
      await rejectFriendRequestMutation({ id }).unwrap();
      refetch();
      toast.success("Friend Request Cancelled", {
        description: "Your friend request has been cancelled.",
      });
    } catch (err) {
      console.error("Failed to cancel friend request:", err);
      toast.error("Failed to cancel", {
        description: "Failed to cancel friend request.",
      });
    }
  };
  return (
    <>
      {friendRequests.length === 0 ? (
        <Card className="border border-gray-200">
          <CardContent className="flex flex-col items-center justify-center p-6">
            <User className="h-12 w-12 text-gray-400 mb-2" />
            <p className="text-center text-gray-500">
              You don&apos;t have any friend requests.
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {friendRequests.map((request) => (
            <Card key={request._id} className="border border-gray-200">
              <CardHeader className="pb-2">
                <div className="flex items-center gap-3">
                  <Avatar className="h-10 w-10">
                    <AvatarImage
                      src={request.profilePhoto}
                      alt={request.name}
                    />
                    <AvatarFallback>{request.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-base font-medium">
                      {request.name}
                    </CardTitle>
                    <div className="flex flex-col text-xs text-gray-500">
                      {request.mutualFriends !== undefined &&
                        request.mutualFriends > 0 && (
                          <span>
                            2 mutual friends
                            {/* {request.mutualFriends} mutual friend
                            {request.mutualFriends !== 1 ? "s" : ""} */}
                          </span>
                        )}
                      <span>Sent {getTimeElapsed(request.createdAt)} ago</span>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-2">
                <div className="flex gap-2">
                  <Button
                    className="flex-1 text-xs bg-messenger-blue hover:bg-messenger-light-blue"
                    onClick={() => acceptFriendRequest(request._id)}
                  >
                    <Check className="h-4 w-4 mr-1" />
                    Accept
                  </Button>
                  <Button
                    variant="outline"
                    className="flex-1 text-xs"
                    onClick={() => rejectFriendRequest(request._id)}
                  >
                    <X className="h-4 w-4 mr-1" />
                    Decline
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </>
  );
};

export default FriendRequestClient;
