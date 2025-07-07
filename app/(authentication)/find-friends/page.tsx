import FindFriendsClient from "@/components/find-friends/find-friends-client";
import { FadeIn } from "@/components/ui/transitions";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Find Friends",
  description: "Find and connect with friends on our platform.",
};

const FindFriendsPage = () => {
  return (
    <FadeIn>
      <div className="container mx-auto px-4 py-6">
        <h1 className="text-2xl font-bold mb-6">Find Friends</h1>
        <FindFriendsClient />
      </div>
    </FadeIn>
  );
};

export default FindFriendsPage;
