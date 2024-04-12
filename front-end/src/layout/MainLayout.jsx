import { useState } from "react";

import { useDispatch } from "react-redux";

import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { getUserToUserChat } from "../features/chat/chatApiSlice";
import MenuBar from "../components/messenger/menu/MenuBar";
import useDrawerPopup from "../hook/useDrawerPopup";
import DrawerMenu from "../components/messenger/menu/DrawerMenu";

export default function MainLayout() {
  const dispatch = useDispatch();

  const [showProfile, setShowProfile] = useState(false);
  const [activeChatUser, setActiveChatUser] = useState({});
  let [isOpen, setIsOpen] = useState(false);

  const { drawerOpen, drawerToggle, drawerRef } = useDrawerPopup();

  useEffect(() => {
    if (activeChatUser._id) {
      dispatch(getUserToUserChat(activeChatUser?._id));
    }
  }, [dispatch, activeChatUser]);
  return (
    <section className="flex outside_drawer">
      <DrawerMenu drawerOpen={drawerOpen} drawerRef={drawerRef} />
      <MenuBar />

      <Outlet
        context={{
          showProfile,
          setShowProfile,
          activeChatUser,
          isOpen,
          setIsOpen,
          setActiveChatUser,
          drawerToggle,
        }}
      />
    </section>
  );
}
