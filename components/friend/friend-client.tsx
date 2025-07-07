"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import {
  useGetAllFriendsQuery,
  useUnfriendMutation,
} from "@/lib/services/userApi";
import { getTimeElapsed } from "@/lib/utils/getTimeElapsed";
import { MessageSquare, UserMinus, Users } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

type Friend = {
  _id: string;
  name: string;
  profilePhoto: string;
  online: boolean;
  lastSeen: string;
};
const FriendClient = () => {
  const router = useRouter();

  const { data, refetch } = useGetAllFriendsQuery({});
  console.log(data);
  const friends: Friend[] = data?.data || [];

  // // Mock friends data
  // const [friends, setFriends] = useState<Friend[]>([
  //   {
  //     id: "1",
  //     name: "Jane Smith",
  //     avatar: "https://i.pravatar.cc/150?img=1",
  //     status: "online",
  //   },
  //   {
  //     id: "2",
  //     name: "Robert Johnson",
  //     avatar: "https://i.pravatar.cc/150?img=2",
  //     status: "offline",
  //     lastSeen: "2 hours ago",
  //   },
  //   {
  //     id: "3",
  //     name: "Emily Davis",
  //     avatar: "https://i.pravatar.cc/150?img=3",
  //     status: "online",
  //   },
  //   {
  //     id: "4",
  //     name: "Michael Wilson",
  //     avatar: "https://i.pravatar.cc/150?img=4",
  //     status: "offline",
  //     lastSeen: "1 day ago",
  //   },
  // ]);

  const [
    unfriendMutation,
    // {
    //   isLoading: isUnfriending,
    //   isSuccess: isUnfriended,
    //   error: unfriendError,
    // },
  ] = useUnfriendMutation();

  const removeFriend = async (id: string) => {
    try {
      await unfriendMutation({ id }).unwrap();
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
      {friends.length === 0 ? (
        <Card className="border border-gray-200">
          <CardContent className="flex flex-col items-center justify-center p-6">
            <Users className="h-12 w-12 text-gray-400 mb-2" />
            <p className="text-center text-gray-500">
              You don&apos;t have any friends yet.
            </p>
            <Button
              onClick={() => router.push("/find-friends")}
              variant="outline"
              className="mt-4"
            >
              Find Friends
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {friends.map((friend) => (
            <Card key={friend._id} className="border border-gray-200">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <Avatar className="h-10 w-10">
                        <AvatarImage
                          src={friend.profilePhoto}
                          alt={friend.name}
                        />
                        <AvatarFallback>{friend.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <span
                        className={`absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white ${
                          friend.online === true
                            ? "bg-green-500"
                            : "bg-gray-300"
                        }`}
                      />
                    </div>
                    <div>
                      <CardTitle className="text-base font-medium">
                        {friend.name}
                      </CardTitle>
                      <p className="text-xs text-gray-500">
                        {friend.online
                          ? "Online now"
                          : `Last seen ${getTimeElapsed(friend.lastSeen)}`}
                      </p>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-2">
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1 text-xs"
                    onClick={() => router.push("/messages")}
                  >
                    <MessageSquare className="h-4 w-4 mr-1" />
                    Message
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1 text-xs text-red-500 hover:text-red-600 hover:bg-red-50"
                    onClick={() => removeFriend(friend._id)}
                  >
                    <UserMinus className="h-4 w-4 mr-1" />
                    Remove
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

export default FriendClient;
