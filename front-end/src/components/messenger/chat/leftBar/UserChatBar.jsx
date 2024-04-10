import Avatar from "../../../Avatar";
import DotBtn from "../../../DotBtn";
import PropTypes from "prop-types";

export default function UserChatBar({ user, isActive }) {
  return (
    <div className="flex gap-2 items-center  hover:bg-[#eaecf1] px-2 py-2 rounded-md chat-bar cursor-pointer relative overflow-hidden">
      <div className="relative">
        <Avatar photo={user?.photo} name={user?.name} style="h-12 w-12" />
        {isActive && (
          <div className="absolute bottom-0 right-[2px]">
            <span className="inline-block h-2 w-2 rounded-full bg-green-600"></span>
          </div>
        )}
      </div>
      <div>
        <div className="flex justify-between items-center">
          <h5 className=" font-[500] text-[17px]">{user?.name}</h5>
          <span className="px-1 text-[14px] text-gray-500">1 w</span>
        </div>
        <div className="flex">
          <p className="text-[14px] text-gray-600 w-[200px] exsm:w-[252px] esm:w-[300px] sm:w-[390px] xsm:w-[180px] lg:w-[215px] truncate ...  ">
            Lorem ipsum dolor sit amet hwewew ewe we ew how rw reh wew
          </p>
        </div>
      </div>
      <div className="absolute right-2 dotButton">
        <DotBtn style="bg-white border border-gray-300" />
      </div>
    </div>
  );
}

UserChatBar.propTypes = {
  user: PropTypes.object.isRequired,
  isActive: PropTypes.bool,
};
