import FriendClient from "@/components/friend/friend-client";
import { Button } from "@/components/ui/button";
import { FadeIn } from "@/components/ui/transitions";
import { Users } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Friends",
  description: "View and manage your friends list.",
};

const Friends = () => {
  return (
    <FadeIn>
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <Users className="h-6 w-6 text-messenger-blue" />
            <h1 className="text-2xl font-bold">Friends</h1>
          </div>
          <Button className="bg-messenger-blue hover:bg-messenger-light-blue">
            <Link href={"/find-friends"}>Find Friends</Link>
          </Button>
        </div>

        <FriendClient />
      </div>
    </FadeIn>
  );
};

export default Friends;
