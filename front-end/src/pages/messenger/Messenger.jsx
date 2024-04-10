import { useOutletContext, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { getUserToUserChat } from "../../features/chat/chatApiSlice";
import MiddleBody from "../../components/messenger/part/MiddleBody";
import RightBody from "../../components/messenger/part/RightBody";

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
