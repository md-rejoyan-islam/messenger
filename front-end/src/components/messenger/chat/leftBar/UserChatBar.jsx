import Avatar from "../../../Avatar";
import DotBtn from "../../../DotBtn";
import PropTypes from "prop-types";
import moment from "moment";

export default function UserChatBar({ user, isActive }) {
  const shortTime = moment(user?.lastMessageTime).startOf("").fromNow();
  moment.updateLocale("en", {
    relativeTime: {
      future: "in %s",
      past: "%s ago",
      s: "1 s",
      ss: "%d s",
      m: "1 m",
      mm: "%d m",
      h: "1 h",
      hh: "%d h",
      d: "1 d",
      dd: "%d d",
      w: "1 w",
      ww: "%d w",
      M: "1 m",
      MM: "%d m",
      y: "1 y",
      yy: "%d y",
    },
  });
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
          <span className="px-1 text-[14px] text-gray-500">
            {user.lastMessageTime ? shortTime.split("ago")[0] : ""}
          </span>
        </div>
        <div className="flex">
          <p className="text-[14px] text-gray-600 w-[200px] exsm:w-[252px] esm:w-[300px] sm:w-[390px] xsm:w-[180px] lg:w-[215px] truncate ...  ">
            {user?.lastMessage?.text ? user?.lastMessage.text : ""}
            {user?.lastMessage?.sender === "me"
              ? `you: ${user?.lastMessage?.message?.text}`
              : user?.lastMessage?.message?.text}
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
