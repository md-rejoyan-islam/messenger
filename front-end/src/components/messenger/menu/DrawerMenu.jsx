import { Message, Request, Users } from "../../../SVG";
import Avatar from "../../Avatar";
import { useSelector } from "react-redux";
import { getAuthData } from "../../../features/auth/authSlice";
import { NavLink } from "react-router-dom";
import useDropDownPopup from "../../../hook/useDropDownPopup";
import PropTypes from "prop-types";
import UserModal from "../../modal/UserModal";
export default function DrawerMenu({ drawerOpen, drawerRef }) {
  const { user } = useSelector(getAuthData);

  const { isOpen, toggleMenu, dropDownRef } = useDropDownPopup();

  return (
    <aside
      ref={drawerRef}
      className={`${
        drawerOpen ? "w-[270px]" : " -translate-x-[470px]  overflow-hidden"
      } left-drawer lsm:hidden  absolute bg-white z-[10] top-0 bottom-0 left-0 transition-all duration-700 delay-50  py-4  flex-col items-center h-screen justify-between gap-5 border-r `}
    >
      <div className="pb-3 px-3 relative" ref={dropDownRef}>
        <button className="flex gap-2 items-center" onClick={toggleMenu}>
          <Avatar style="w-10 h-10" photo={user?.photo} name={user?.name} />{" "}
          <span className=" font-semibold">Md.Rejoyan Islam</span>
        </button>
        {isOpen && <UserModal style=" " />}
      </div>
      <ul className="flex flex-col    mx-auto  px-[10px] text-center w-full gap-1">
        <li>
          <NavLink
            to="/"
            className="px-4 h-[44px]   items-center rounded-md hover:bg-[#f0f0f0] flex gap-4"
            title="Chat"
          >
            <Message />

            <span className="text-[17px]  text-[#050526] mb-1">Chats</span>
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/people"
            className="px-4 h-[44px]   items-center rounded-md hover:bg-[#f0f0f0] flex gap-4"
            title="People"
          >
            <Users />

            <span className="text-[17px]  text-[#050526] mb-1">Peoples</span>
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/requested"
            className="px-4 h-[44px]   items-center rounded-md hover:bg-[#f0f0f0] flex gap-4"
            title="Requests"
          >
            <Request />

            <span className="  text-[17px] text-[#050526] mb-1">Requests</span>
          </NavLink>
        </li>
      </ul>
    </aside>
  );
}

DrawerMenu.propTypes = {
  drawerOpen: PropTypes.bool,
  drawerRef: PropTypes.object,
};
