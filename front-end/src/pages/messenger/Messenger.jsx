import { useOutletContext, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { getUserToUserChat } from "../../features/chat/chatApiSlice";
import MiddleBody from "../../components/messenger/part/MiddleBody";
import RightBody from "../../components/messenger/part/RightBody";
import icon from "../../assets/messenger.png";
import { Helmet } from "react-helmet-async";

export default function Messenger() {
  const dispatch = useDispatch();

  const { showProfile, setShowProfile, activeChatUser, isOpen, setIsOpen } =
    useOutletContext();

  const { id } = useParams();

  useEffect(() => {
    dispatch(getUserToUserChat(id));
  }, [dispatch, id]);

  return (
    <>
      <Helmet>
        <title>Chat</title>
        {/* <link rel="canonical" href={icon} /> */}
        <link rel="shortcut icon" href={icon} type="image/x-icon" />
      </Helmet>

      <MiddleBody
        showProfile={showProfile}
        setShowProfile={setShowProfile}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        activeChatUser={activeChatUser}
      />
      <RightBody
        activeChatUser={activeChatUser}
        showProfile={showProfile}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      />
    </>
  );
}
