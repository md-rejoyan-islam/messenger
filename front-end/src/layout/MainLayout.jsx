import { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { Outlet, useParams } from "react-router-dom";
import { io } from "socket.io-client";
import useSound from "use-sound";

import MenuBar from "../components/messenger/menu/MenuBar";
import useDrawerPopup from "../hook/useDrawerPopup";
import DrawerMenu from "../components/messenger/menu/DrawerMenu";
import { getConversationById } from "../features/conversation/conversationApiSlice";
import { getDisconnectedUsers } from "../features/user/userApiSlice";
import {
  updateActiveUserIncomingMsg,
  updateTypingChatuser,
} from "../features/conversation/conversationSlice";
import { updateActiveChatUsers } from "../features/chat/chatSlice";
import { useSelector } from "react-redux";
import { getAuthData } from "../features/auth/authSlice";

import audio from "../assets/audio/messenger.mp3";

export default function MainLayout() {
  const dispatch = useDispatch();

  const [showProfile, setShowProfile] = useState(false);
  const [activeChatUser, setActiveChatUser] = useState({});
  let [isOpen, setIsOpen] = useState(false);

  const { drawerOpen, drawerToggle, drawerRef } = useDrawerPopup();

  const { id } = useParams();

  const { user } = useSelector(getAuthData);
  // sound
  const [play] = useSound(audio);

  // socket  ref
  const socket = useRef();

  useEffect(() => {
    if (id) {
      dispatch(getConversationById(id));
    }
  }, [dispatch, activeChatUser, id]);

  useEffect(() => {
    dispatch(getDisconnectedUsers());
  }, [dispatch]);

  // socket initialize
  useEffect(() => {
    socket.current = io(import.meta.env.VITE_SOCKET_URL);

    // show online when join
    socket?.current.emit("join", user._id);

    // update active user data
    socket?.current?.on("getLastMessageFromUser", (msgInfo) => {
      dispatch(updateActiveUserIncomingMsg(msgInfo));
      play();
    });

    // update typing user data
    socket?.current?.on("getTypingForMsgData", (data) => {
      dispatch(updateTypingChatuser(data));
    });

    // get active users data from server
    socket.current.on("activeUsers", (users) => {
      dispatch(updateActiveChatUsers(users));
    });

    // when logout or disconnect server socket will be disconnect
    return () => {
      socket.current.disconnect();
    };
  }, [dispatch, play, user._id]);

  return (
    <section className="flex outside_drawer">
      <DrawerMenu
        drawerOpen={drawerOpen}
        drawerRef={drawerRef}
        drawerToggle={drawerToggle}
      />
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
          socket,
        }}
      />
    </section>
  );
}
