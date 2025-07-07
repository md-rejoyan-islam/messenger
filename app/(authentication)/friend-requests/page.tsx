import FriendRequestClient from "@/components/frient-request/friend-request-client";
import { FadeIn } from "@/components/ui/transitions";
import { User } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Friend Requests",
  description: "Manage your incoming friend requests.",
};

const FriendRequests = () => {
  return (
    <FadeIn>
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center gap-2 mb-6">
          <User className="h-6 w-6 text-messenger-blue" />
          <h1 className="text-2xl font-bold">Friend Requests</h1>
        </div>

        <FriendRequestClient />
      </div>
    </FadeIn>
  );
};

export default FriendRequests;
