import { Outlet } from "react-router-dom";
import LeftBody from "../components/messenger/part/LeftBody";
import { useOutletContext } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getAllUserWithLastMessage } from "../features/user/userApiSlice";
import { useEffect } from "react";

import { getUserAllConversationWithLastMessage } from "../features/conversation/conversationApiSlice";

export default function Layout() {
  const {
    showProfile,
    setShowProfile,
    activeChatUser,
    isOpen,
    setIsOpen,
    setActiveChatUser,
    drawerToggle,
    socket,
  } = useOutletContext();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllUserWithLastMessage());
    dispatch(getUserAllConversationWithLastMessage());
  }, [dispatch]);

  return (
    <>
      <LeftBody
        setActiveChatUser={setActiveChatUser}
        activeChatUser={activeChatUser}
        toggleMenu={drawerToggle}
      />

      <Outlet
        context={{
          showProfile,
          setShowProfile,
          activeChatUser,
          isOpen,
          setIsOpen,
          socket,
        }}
      />
    </>
  );
}
