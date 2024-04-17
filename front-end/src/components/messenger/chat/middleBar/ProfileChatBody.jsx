import { getAuthData } from "../../../../features/auth/authSlice";
import FriendChat from "./chatContent/FriendChat";
import UserChat from "./chatContent/UserChat";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useRef } from "react";
import TimeCount from "./chatContent/TimeCount";
import Typing from "./chatContent/Typing";
import { useParams } from "react-router-dom";
import { getAllConversation } from "../../../../features/conversation/conversationSlice";

export default function ProfileChatBody() {
  const { user } = useSelector(getAuthData);

  const { activeConversation, tyingChatUser } = useSelector(getAllConversation);

  const { id } = useParams();

  // ref
  const chatBody = useRef(null);
  useEffect(() => {
    chatBody.current.scrollTop = chatBody.current.scrollHeight;
    chatBody.current.scrollIntoView({ behavior: "smooth" });
  }, [activeConversation?.messagesIds, tyingChatUser?.typing]);

  return (
    <div
      className="flex-1 static top-0 overflow-auto p-3 space-y-4 chat-body"
      ref={chatBody}
    >
      {activeConversation?.messagesIds.map((chat) => {
        return chat?.senderId === user?._id ? (
          <div key={chat._id}>
            <TimeCount time={chat?.createdAt} />
            <UserChat key={chat._id} chat={chat} />
          </div>
        ) : (
          <div key={chat._id}>
            <TimeCount time={chat?.createdAt} />
            <FriendChat key={chat._id} chat={chat} />
          </div>
        );
      })}

      {tyingChatUser?.typing &&
        tyingChatUser?.conversationId === id &&
        tyingChatUser?.receiverId === user._id && <Typing />}
    </div>
  );
}
