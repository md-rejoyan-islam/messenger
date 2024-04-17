import { useOutletContext, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import MiddleBody from "../../components/messenger/part/MiddleBody";
import RightBody from "../../components/messenger/part/RightBody";
import icon from "../../assets/messenger.png";
import { Helmet } from "react-helmet-async";
import { useSelector } from "react-redux";
import { getAllUserChat } from "../../features/chat/chatSlice";
import { getAuthData } from "../../features/auth/authSlice";
import { getAllConversation } from "../../features/conversation/conversationSlice";

export default function Messenger() {
  const dispatch = useDispatch();

  const {
    showProfile,
    setShowProfile,
    activeChatUser,
    isOpen,
    setIsOpen,
    socket,
  } = useOutletContext();

  const { id } = useParams();

  const { activeChatUsers } = useSelector(getAllUserChat);

  const { user } = useSelector(getAuthData);

  const { activeConversation } = useSelector(getAllConversation);

  const receiverId = activeConversation?.userIds?.find((member) => {
    return member !== user._id;
  });

  const isActive = activeChatUsers?.some(
    (activeUser) => activeUser.userId === receiverId
  );

  useEffect(() => {
    // dispatch(getUserToUserChat(id));
  }, [dispatch, id]);

  return (
    <>
      <Helmet>
        <title>Message</title>
        {/* <link rel="canonical" href={icon} /> */}
        <link rel="shortcut icon" href={icon} type="image/x-icon" />
      </Helmet>

      <MiddleBody
        showProfile={showProfile}
        setShowProfile={setShowProfile}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        activeChatUser={activeChatUser}
        socket={socket}
        isActive={isActive}
      />
      <RightBody
        activeChatUser={activeChatUser}
        showProfile={showProfile}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        isActive={isActive}
      />
    </>
  );
}
