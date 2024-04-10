import PropTypes from "prop-types";
import { nameToLetterAvatar } from "../helpers/helpers";

export default function Avatar({ style, photo, name = "Md Rejoyan" }) {
  return (
    <div className={`${style} rounded-full border-2 border-green-100 `}>
      {photo ? (
        <img src={photo} alt="" className={` rounded-full `} />
      ) : (
        <div className="bg-[#9fecaa] h-full w-full rounded-full flex items-center justify-center">
          <span className="text-[#444487] font-semibold text-[14px]">
            {nameToLetterAvatar(name)}
          </span>
        </div>
      )}
    </div>
  );
}

Avatar.propTypes = {
  style: PropTypes.string.isRequired,
  photo: PropTypes.string,
  name: PropTypes.string,
};
