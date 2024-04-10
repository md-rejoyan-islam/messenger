import { FaUserEdit } from "react-icons/fa";
import { FaMoon, FaLock } from "react-icons/fa";
import { IoLogOut } from "react-icons/io5";
import Avatar from "../Avatar";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logoutUser } from "../../features/auth/authApiSlice";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { getAuthData } from "../../features/auth/authSlice";

export default function UserModal({ style }) {
  const { user } = useSelector(getAuthData);
  const dispatch = useDispatch();
  // handle logout
  const handleLogout = () => {
    dispatch(logoutUser());
  };
  return (
    <>
      <ul
        className={`${style} bg-white shadow-[0_0_30px_rgba(0,0,0,0.3)]  absolute  p-2 flex flex-col gap-3 rounded-md w-[250px]  z-10`}
      >
        <li className="flex  items-center gap-2 cursor-pointer hover:bg-[#e1dfdd48] py-1 px-2 rounded-md">
          <Avatar
            style="h-10 w-10 border"
            photo={user?.photo}
            name={user?.name}
          />

          <span>{user?.name}</span>
        </li>
        <li className="flex  items-center gap-2 cursor-pointer hover:bg-[#e1dfdd48] py-1 px-2 rounded-md">
          <button className="bg-[#e4e6eb]  h-8 w-8 rounded-full flex justify-center items-center">
            <FaLock className="text-[17px]" />
          </button>
          <span>Password Change</span>
        </li>
        <li>
          <Link
            className="flex  items-center gap-2 cursor-pointer hover:bg-[#e1dfdd48] py-1 px-2 rounded-md"
            to={"/edit-profile"}
          >
            <span className="bg-[#e4e6eb]  h-8 w-8 rounded-full flex justify-center items-center">
              <FaUserEdit className="text-[17px]" />
            </span>
            <span>Edit Profile</span>
          </Link>
        </li>
        <li className="flex  items-center gap-2 cursor-pointer hover:bg-[#e1dfdd48] py-1 px-2 rounded-md">
          <button className="bg-[#e4e6eb]  h-8 w-8 rounded-full flex justify-center items-center">
            <FaMoon />
          </button>
          <span>Dark Mood</span>
        </li>
        <li
          className="flex  items-center gap-2 cursor-pointer hover:bg-[#e1dfdd48] py-1 px-2 rounded-md"
          onClick={handleLogout}
        >
          <button className="bg-[#e4e6eb]  h-8 w-8 rounded-full flex justify-center items-center">
            <IoLogOut />
          </button>
          <span>Log out</span>
        </li>
      </ul>
    </>
  );
}

UserModal.propTypes = {
  style: PropTypes.string,
};
