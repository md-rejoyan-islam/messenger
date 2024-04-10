import { Boxicon, Message, Request, Users } from "../../../SVG";
import Avatar from "../../Avatar";
import useDropDownPopup from "../../../hook/useDropDownPopup";
import { useSelector } from "react-redux";
import { getAuthData } from "../../../features/auth/authSlice";
import { NavLink } from "react-router-dom";

import { useState } from "react";
import UserModal from "../../modal/UserModal";

export default function MenuBar() {
  const { user } = useSelector(getAuthData);
  const { isOpen, toggleMenu, dropDownRef } = useDropDownPopup();
  // full menu
  const [fullMenu, setFullMenu] = useState(false);

  return (
    <aside
      className={`${
        fullMenu ? "w-[70px] lg:w-[200px]  xl:w-[225px]" : " w-[70px]"
      } hidden lsm:flex overflow-hidden transition-all duration-50    flex-col items-center h-[calc(100vh-3px)] justify-between gap-5 border-r py-4`}
    >
      <ul className="flex flex-col   mx-auto  px-[10px] text-center w-full gap-1">
        <li>
          <NavLink
            to="/"
            className={`${
              fullMenu ? " w-full" : ""
            } px-4 h-[44px]   items-center rounded-md hover:bg-[#f0f0f0] flex gap-4`}
            title="Chat"
          >
            <Message />
            {fullMenu && (
              <span className="text-[17px] invisible lg:visible text-[#050526] mb-1">
                Chats
              </span>
            )}
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/people"
            className={`${
              fullMenu ? " w-full" : ""
            } px-4 h-[44px]   items-center rounded-md hover:bg-[#f0f0f0] flex gap-4 `}
            title="People"
          >
            <Users />
            {fullMenu && (
              <span className="text-[17px] invisible lg:visible text-[#050526] mb-1">
                Peoples
              </span>
            )}
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/requested"
            className={`${
              fullMenu ? " w-full" : ""
            } px-4 h-[44px]   items-center rounded-md hover:bg-[#f0f0f0] flex gap-4 `}
            title="Requests"
          >
            <Request />
            {fullMenu && (
              <span className=" invisible lg:visible text-[17px] text-[#050526] mb-1">
                Requests
              </span>
            )}
          </NavLink>
        </li>
      </ul>
      <div
        className={`${
          fullMenu ? " flex-col lg:flex-row lg:justify-between" : "flex-col "
        } flex  gap-2 w-full px-3 items-center `}
      >
        <div ref={dropDownRef}>
          <button onClick={toggleMenu}>
            <Avatar style="w-10 h-10" photo={user?.photo} name={user?.name} />
          </button>
          {isOpen && <UserModal style={"left-[6px] bottom-[106px]"} />}
        </div>
        <button
          className="p-3 hidden lg:inline-block rounded-md hover:bg-[#f0f0f0]"
          onClick={() => {
            setFullMenu(!fullMenu);
          }}
        >
          <Boxicon />
        </button>
      </div>
    </aside>
  );
}
