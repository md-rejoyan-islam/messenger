"use client";

import ContactList from "@/components/contact-list";
import { PageTransition, ScaleIn } from "@/components/ui/transitions";
import { MessageCircle } from "lucide-react";

const Messages = () => {
  return (
    <PageTransition>
      <div className="h-full grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4">
        <div className="md:col-span-1">
          <ContactList />
        </div>
        <div className="hidden md:block md:col-span-2 lg:col-span-3">
          <div className="h-full flex items-center justify-center">
            <ScaleIn className="flex flex-col items-center text-center p-6">
              <div className="w-16 h-16 rounded-full bg-messenger-light-grey flex items-center justify-center mb-4">
                <MessageCircle className="text-messenger-dark-grey w-8 h-8" />
              </div>
              <h2 className="text-2xl font-bold mb-2">Your Messages</h2>
              <p className="text-messenger-dark-grey">
                Select a conversation or start a new one
              </p>
            </ScaleIn>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default Messages;
