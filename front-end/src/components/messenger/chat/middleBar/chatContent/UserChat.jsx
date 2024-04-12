import Avatar from "../../../../Avatar";

import PropTypes from "prop-types";
import moment from "moment";

export default function UserChat({ chat }) {
  return (
    <div className="flex justify-end relative   user-chat">
      <div className=" flex w-[80%] sm:w-[65%] xsm:w-[75%] md:w-[70%] lg:w-[60%]  flex-row-reverse items-end    gap-2 ">
        <div className="flex h-fit  items-end">
          <Avatar style="h-8 w-8" />
        </div>

        <div className="  text-right">
          <p
            className="bg-[#f0f0f0] text-left   rounded-xl  pt-2 pb-3 px-3 inline-block "
            id="timeCount"
            data-title={moment(chat?.createdAt).format("LLLL")}
          >
            {chat?.message?.text}
          </p>
          {chat?.message?.photo && (
            <figure className="py-2 flex justify-end">
              <img
                src={chat?.message?.photo}
                className="w-40  text-right rounded-md"
                alt=""
              />
            </figure>
          )}
        </div>
      </div>
    </div>
  );
}

UserChat.propTypes = {
  chat: PropTypes.object.isRequired,
};
