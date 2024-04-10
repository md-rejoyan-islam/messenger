import { getAuthData } from "../../../../features/auth/authSlice";
import { getAllUserChat } from "../../../../features/chat/chatSlice";
import FriendChat from "./chatContent/FriendChat";
import UserChat from "./chatContent/UserChat";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useRef } from "react";

export default function ProfileChatBody() {
  const { user } = useSelector(getAuthData);
  const { chats } = useSelector(getAllUserChat);
  // ref
  const chatBody = useRef(null);
  useEffect(() => {
    chatBody.current.scrollTop = chatBody.current.scrollHeight;
    chatBody.current.scrollIntoView({ behavior: "smooth" });
  }, [chats]);

  return (
    <div
      className="flex-1 static top-0 overflow-auto p-3 space-y-4 chat-body"
      ref={chatBody}
    >
      {chats.map((chat) => {
        return chat?.senderId === user?._id ? (
          <UserChat key={chat._id} chat={chat} />
        ) : (
          <FriendChat key={chat._id} chat={chat} />
        );
      })}
    </div>
  );
}