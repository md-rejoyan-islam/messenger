import { cn } from "@/lib/utils";
import React from "react";
import Avatar from "./Avatar";

export interface Message {
  id: string;
  text: string;
  sender: {
    id: string;
    name: string;
    avatar: string;
  };
  timestamp: string;
  isSent: boolean;
  status?: "sent" | "delivered" | "read";
}

interface MessageBubbleProps {
  message: Message;
  showAvatar?: boolean;
}

const MessageBubble: React.FC<MessageBubbleProps> = ({
  message,
  showAvatar = true,
}) => {
  // Format timestamp
  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  return (
    <div
      className={cn(
        "flex items-end mb-4",
        message.isSent ? "justify-end" : "justify-start"
      )}
    >
      {!message.isSent && showAvatar && (
        <div className="flex-shrink-0 mr-2">
          <Avatar
            src={message.sender.avatar}
            alt={message.sender.name}
            size="sm"
          />
        </div>
      )}
      <div
        className={cn(
          "message-bubble",
          message.isSent ? "message-bubble-sent" : "message-bubble-received"
        )}
      >
        <p>{message.text}</p>
        <div
          className={cn(
            "text-[10px] mt-1 flex",
            message.isSent
              ? "justify-end text-white/80"
              : "justify-start text-messenger-dark-grey"
          )}
        >
          {formatTime(message.timestamp)}
          {message.isSent && message.status && (
            <span className="ml-1">
              {message.status === "read" && "✓✓"}
              {message.status === "delivered" && "✓✓"}
              {message.status === "sent" && "✓"}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default MessageBubble;
