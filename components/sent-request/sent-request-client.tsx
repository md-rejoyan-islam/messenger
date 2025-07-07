"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import {
  useCancelFriendRequestMutation,
  useGetSendFriendRequestsQuery,
} from "@/lib/services/userApi";
import { getTimeElapsed } from "@/lib/utils/getTimeElapsed";
import { Send, X } from "lucide-react";
import { toast } from "sonner";

type SentRequest = {
  _id: string;
  name: string;
  profilePhoto: string;
  createdAt: string;
};

const SentRequestClient = () => {
  const { data, refetch } = useGetSendFriendRequestsQuery({});

  const sendRequests: SentRequest[] = data?.data || [];

  const [cancelFriendRequestMutation] = useCancelFriendRequestMutation();

  const cancelRequest = async (id: string) => {
    try {
      await cancelFriendRequestMutation({ id }).unwrap();
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
      {sendRequests.length === 0 ? (
        <Card className="border border-gray-200">
          <CardContent className="flex flex-col items-center justify-center p-6">
            <Send className="h-12 w-12 text-gray-400 mb-2" />
            <p className="text-center text-gray-500">
              You haven&apos;t sent any friend requests.
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {sendRequests.map((request) => (
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
                      <span>Sent {getTimeElapsed(request.createdAt)}</span>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-2">
                <Button
                  variant="outline"
                  className="w-full text-xs"
                  onClick={() => cancelRequest(request._id)}
                >
                  <X className="h-4 w-4 mr-1" />
                  Cancel Request
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </>
  );
};

export default SentRequestClient;
