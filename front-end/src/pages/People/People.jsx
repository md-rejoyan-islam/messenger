import icon from "../../assets/messenger.png";
import { Helmet } from "react-helmet-async";
import UserCard from "./UserCard";
import { useSelector } from "react-redux";
import { getAllUserData } from "../../features/user/userSlice";
import { MdOutlineMenu } from "react-icons/md";
import { FiEdit } from "react-icons/fi";
import { Search } from "../../SVG";
import useDrawerPopup from "../../hook/useDrawerPopup";
import DrawerMenu from "../../components/messenger/menu/DrawerMenu";

export default function People() {
  const { disconnectedUser } = useSelector(getAllUserData);
  const { drawerOpen, drawerToggle, drawerRef } = useDrawerPopup();

  return (
    <>
      <Helmet>
        <title>People</title>
        {/* <link rel="canonical" href={icon} /> */}
        <link rel="shortcut icon" href={icon} type="image/x-icon" />
      </Helmet>
      <section className="  w-full  h-[calc(100vh-3px)] overflow-hidden">
        <div className="h-full overflow-scroll  overflow-y-auto lsm:py-10 md:py-8 px-2 md:px-3">
          {/* small header  */}
          <div className="left-header flex justify-between items-center px-3 py-4 lsm:hidden sticky top-0 bg-white border-b ">
            <div className="flex gap-2 items-center">
              <button
                className="h-8 w-8  rounded-full p-1 lsm:hidden flex justify-center items-center bg-zinc-700/10"
                onClick={drawerToggle}
              >
                <MdOutlineMenu className="text-xl" />
              </button>
              <h3 className=" font-bold text-xl">Peoples</h3>
            </div>
            <div className="space-x-2">
              {/* <DotBtn /> */}
              <button className="h-9 w-9 rounded-full bg-[#e4e6eb] hover:bg-[#dadde5]">
                <FiEdit className="mx-auto text-xl" />
              </button>
            </div>
          </div>

          {/* drawer  */}
          <DrawerMenu
            drawerOpen={drawerOpen}
            drawerRef={drawerRef}
            drawerToggle={drawerToggle}
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 items-center lmd:items-start md:grid-cols-4 xsm:grid-cols-3 lg:grid-cols-5  gap-7  justify-center  py-6 lsm:py-0 ">
            {disconnectedUser.map((user) => (
              <UserCard
                name={user.name}
                key={user._id}
                photo={user.photo || icon}
                id={user._id}
              />
            ))}
            {!disconnectedUser.length && (
              <div className="text-center col-span-5">
                <h2 className="text-lg font-semibold">
                  You have no disconnected user
                </h2>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
