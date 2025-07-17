import SentRequestClient from "@/components/sent-request/sent-request-client";
import { FadeIn } from "@/components/ui/transitions";
import { Send } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sent Friend Requests",
  description:
    "View and manage your sent friend requests. You can see the status of your requests and cancel them if needed.",
};

const SentRequests = () => {
  return (
    <FadeIn>
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center gap-2 mb-6">
          <Send className="h-6 w-6 text-messenger-blue" />
          <h1 className="text-2xl font-bold">Sent Friend Requests</h1>
        </div>

        <SentRequestClient />
      </div>
    </FadeIn>
  );
};

export default SentRequests;
