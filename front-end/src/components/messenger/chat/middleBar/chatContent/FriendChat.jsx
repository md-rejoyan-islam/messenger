import Avatar from "../../../../Avatar";
import PropTypes from "prop-types";
import moment from "moment";

export default function FriendChat({ chat }) {
  return (
    <div className="flex w-[80%] sm:w-[65%] xsm:w-[75%] md:w-[70%] lg:w-[60%] items-end friend-chat  gap-1">
      <div className="">
        <Avatar style="h-8 w-8" />
      </div>
      <div className=" space-y-1">
        <p
          className="bg-[#f0f0f0] rounded-2xl p-3"
          data-title={moment(chat?.createdAt).format("LLLL")}
        >
          {chat?.message?.text}
        </p>
        {chat?.message?.photo && (
          <figure className="py-2">
            <img src={chat?.message?.photo} className="w-40 " alt="" />
          </figure>
        )}
      </div>
    </div>
  );
}

FriendChat.propTypes = {
  chat: PropTypes.object.isRequired,
};
