import { UserPlus } from "lucide-react";

import { useSendFriendRequestMutation } from "@/lib/services/userApi";
import { toast } from "sonner";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

const FriendCard = ({
  photo,
  name,
  userId,
  refetch,
}: {
  refetch: () => void;
  photo?: string;
  name: string;
  userId: string;
}) => {
  const [sendFriendRequest] = useSendFriendRequestMutation();
  // const [cancelFriendRequestMutation] = useCancelFriendRequestMutation();
  // const handleCancelFriendRequest = async () => {
  //   try {
  //     await cancelFriendRequestMutation({ id: userId }).unwrap();
  //     refetch();
  //     toast.success("Friend Request Cancelled", {
  //       description: "Your friend request has been cancelled.",
  //     });
  //   } catch (err) {
  //     console.error("Failed to cancel friend request:", err);
  //     toast.error("Failed to cancel", {
  //       description: "Failed to cancel friend request.",
  //     });
  //   }
  // };
  const handleSendFriendRequest = async () => {
    try {
      await sendFriendRequest({ id: userId }).unwrap();
      refetch();
      toast.success("Friend Request Sent", {
        description: "Your friend request has been sent successfully.",
      });
    } catch (err) {
      console.error("Failed to send friend request:", err);
      toast.error("Error", {
        description: "Failed to send friend request.",
      });
    }
  };
  return (
    <Card className="border border-gray-200">
      <CardHeader className="pb-2">
        <div className="flex items-center gap-3">
          <Avatar className="h-10 w-10">
            <AvatarImage src={photo} alt={name} />
            <AvatarFallback>{name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <CardTitle className="text-base font-medium">{name}</CardTitle>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-2">
        <Button
          className="w-full text-xs bg-messenger-blue hover:bg-messenger-light-blue"
          onClick={() => handleSendFriendRequest()}
        >
          <UserPlus className="h-4 w-4 mr-1" />
          Add Friend
        </Button>
      </CardContent>
    </Card>
  );
};

export default FriendCard;
