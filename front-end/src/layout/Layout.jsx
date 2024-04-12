import { Outlet } from "react-router-dom";
import LeftBody from "../components/messenger/part/LeftBody";
import { useOutletContext } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getAllUserWithLastMessage } from "../features/user/userApiSlice";
import { useEffect } from "react";
import { io } from "socket.io-client";
import { useState, useRef } from "react";
import { useSelector } from "react-redux";
import { getAuthData } from "../features/auth/authSlice";
import { updateActiveUserIncomingMsg } from "../features/chat/chatSlice";

export default function Layout() {
  const {
    showProfile,
    setShowProfile,
    activeChatUser,
    isOpen,
    setIsOpen,
    setActiveChatUser,
    drawerToggle,
  } = useOutletContext();
  const dispatch = useDispatch();

  const { user } = useSelector(getAuthData);

  // active users
  const [activeUsers, setActiveUsers] = useState([]);

  // socket  ref
  const socket = useRef();

  useEffect(() => {
    dispatch(getAllUserWithLastMessage());
  }, [dispatch]);

  // socket initialize
  useEffect(() => {
    socket.current = io("ws://localhost:9000", {
      // transports: ["websocket"],
    });
    // currentSocket(socket);

    // join
    socket.current.emit("join", user._id);

    // update active user data
    socket?.current?.on("getLastMessageFromUser", (msgInfo) => {
      dispatch(updateActiveUserIncomingMsg(msgInfo));
    });

    // get data from server
    socket.current.on("activeUsers", (users) => {
      // console.log(users);
      setActiveUsers(users);
    });
    return () => {
      socket.current.disconnect();
    };
  }, [user._id]);
  return (
    <>
      <LeftBody
        setActiveChatUser={setActiveChatUser}
        activeChatUser={activeChatUser}
        toggleMenu={drawerToggle}
        activeUsers={activeUsers}
      />

      <Outlet
        context={{
          showProfile,
          setShowProfile,
          activeChatUser,
          isOpen,
          setIsOpen,
          activeUsers,
          socket,
        }}
      />
    </>
  );
}
