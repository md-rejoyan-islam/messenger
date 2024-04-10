import { FiEdit } from "react-icons/fi";
import UserChatBar from "../chat/leftBar/UserChatBar";
import GroupChatBar from "../chat/leftBar/GroupChatBar";
import { useSelector } from "react-redux";
import { getAllUserData } from "../../../features/user/userSlice";
import PropTypes from "prop-types";
import { Search } from "../../../SVG";
import { MdOutlineMenu } from "react-icons/md";
import { NavLink } from "react-router-dom";

export default function LeftBody({
  setActiveChatUser,
  toggleMenu,
  activeUsers,
}) {
  const { users } = useSelector(getAllUserData);

  return (
    <>
      <section className=" left-chat h-[calc(100vh-3px)] flex w-screen xsm:w-[270px] lg:w-[300px] ">
        <aside className="flex flex-col py-2 pl-2 w-full xsm:w-fit">
          <div className="left-header flex justify-between items-center px-3 pt-2">
            <div className="flex gap-2 items-center">
              <button
                className="h-8 w-8  rounded-full p-1 lsm:hidden flex justify-center items-center bg-zinc-700/10"
                onClick={toggleMenu}
              >
                <MdOutlineMenu className="text-xl" />
              </button>
              <h3 className=" font-bold text-xl">Chats</h3>
            </div>
            <div className="space-x-2">
              {/* <DotBtn /> */}
              <button className="h-9 w-9 rounded-full bg-[#e4e6eb] hover:bg-[#dadde5]">
                <FiEdit className="mx-auto text-xl" />
              </button>
            </div>
          </div>
          <div className="search my-3 px-3 relative">
            <input
              type="text"
              placeholder="Search"
              className="w-full border border-transparent focus:border-[#b5b1b674] focus:border focus:outline-none bg-[#f0f2f5]  rounded-full pl-9 pr-4 py-[6px]"
            />
            {/* <IoIosSearch className="absolute top-0 bottom-0 my-auto left-4 text-xl " /> */}
            <Search style="absolute left-[22px] fill-[#b5b1b6] top-0 bottom-0 my-auto  " />
          </div>

          <div className="users flex-1 pr-2 sticky top-0 overflow-auto  scroll-smooth">
            <ul className=" space-y-1 py-3 ">
              {users?.map((user) => (
                <li
                  key={user._id}
                  onClick={() => {
                    setActiveChatUser(user);
                  }}
                >
                  <NavLink to={`/t/${user?._id}`} className="block rounded-md ">
                    <UserChatBar
                      user={user}
                      isActive={activeUsers.some(
                        (activeUser) => activeUser.userId === user._id
                      )}
                    />
                  </NavLink>
                </li>
              ))}
              <li>
                <GroupChatBar />
              </li>
            </ul>
          </div>
        </aside>
      </section>
    </>
  );
}

LeftBody.propTypes = {
  setActiveChatUser: PropTypes.func,
  activeChatUser: PropTypes.object,
  toggleMenu: PropTypes.func,
  activeUsers: PropTypes.array,
};
