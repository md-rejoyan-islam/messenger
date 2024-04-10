import Avatar from "../../../Avatar";
import PropTypes from "prop-types";
import {
  Audio,
  HorizontalDot,
  OnlyHorizontalDot,
  Video,
} from "../../../../SVG";
import { Link } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

export default function ProfileChatHeader({
  showProfile,
  setShowProfile,
  activeChatUser,
  isOpen,
  setIsOpen,
}) {
  // handle right side or modal popup show
  const handleRightOrModelShow = () => {
    if (window.innerWidth < 950) {
      setIsOpen(!isOpen);
    } else {
      setShowProfile(!showProfile);
    }
  };

  return (
    <div className="flex justify-between shadow-[0_0_4px_rgba(0,0,0,0.1)] items-center gap-4 p-4">
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-1">
          <Link
            to="/"
            className="hover:bg-[#eee] rounded-full  h-8 w-8 xsm:hidden flex justify-center items-center"
          >
            <FaArrowLeft className="fill-[#0084ff] mx-auto" />
          </Link>
          <div className="relative">
            <Avatar
              style="h-8 w-8"
              photo={activeChatUser?.photo}
              name={activeChatUser?.name}
            />
            <div className="absolute -bottom-[2px] right-[1px]">
              <span className="inline-block h-2 w-2 rounded-full bg-green-600"></span>
            </div>
          </div>
        </div>
        <span className="font-semibold text-[14px] esm:text-[16px] sm:text-lg">
          {" "}
          {activeChatUser?.name}{" "}
        </span>
      </div>
      <div className="flex gap-2">
        <button className="hover:bg-[#eee] rounded-full  h-10 w-10">
          <Audio />
        </button>
        <button className="hover:bg-[#eee] rounded-full  h-10 w-10">
          <Video />
        </button>
        <button
          className="hover:bg-[#eee] rounded-full  h-10 w-10"
          onClick={handleRightOrModelShow}
        >
          {showProfile ? <HorizontalDot /> : <OnlyHorizontalDot />}
        </button>
      </div>
    </div>
  );
}

ProfileChatHeader.propTypes = {
  showProfile: PropTypes.bool.isRequired,
  setShowProfile: PropTypes.func.isRequired,
  activeChatUser: PropTypes.object.isRequired,
  isOpen: PropTypes.bool.isRequired,
  setIsOpen: PropTypes.func.isRequired,
};
