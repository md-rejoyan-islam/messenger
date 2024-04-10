import { HiMiniHandThumbUp } from "react-icons/hi2";
import { BsEmojiSmileFill } from "react-icons/bs";
import { HiMiniGif } from "react-icons/hi2";
import { RiEmojiStickerFill } from "react-icons/ri";
import { ImImages } from "react-icons/im";
import { AiFillPlusCircle } from "react-icons/ai";
import EmojiPicker from "emoji-picker-react";
import useDropDownPopup from "../../../../hook/useDropDownPopup";
import { useDispatch } from "react-redux";
import { useState } from "react";

import PropTypes from "prop-types";
import { createChat } from "../../../../features/chat/chatApiSlice";
import photo from "../../../../assets/default.png";
export default function ProfileChatFooter({ activeChatUser }) {
  const { isOpen, toggleMenu, dropDownRef } = useDropDownPopup();

  const [chat, setChat] = useState("");
  const dispatch = useDispatch();

  const [photos, setPhotos] = useState(null);

  const handleKeyUp = (e) => {
    e.preventDefault();

    if (e.key === "Enter") {
      const formData = new FormData();
      formData.append("receiverId", activeChatUser?._id);
      formData.append("chat", chat);
      formData.append("photo", photos);

      dispatch(createChat({ formData, setChat, setPhotos }));
    }
  };

  return (
    <div className="flex gap-4 items-center justify-between p-3  bg-white ">
      <div className="flex gap-4 text-[#0866ff] items-center text-xl">
        <button>
          <AiFillPlusCircle />
        </button>
        <label htmlFor="photos" className="cursor-pointer">
          <ImImages />
          <input
            type="file"
            id="photos"
            name="photos"
            multiple
            className="hidden"
            onChange={(e) => {
              setPhotos(e.target.files[0]);
            }}
          />
        </label>
        <button>
          <RiEmojiStickerFill />
        </button>
        <button>
          <HiMiniGif />
        </button>
      </div>
      <div className="flex-1 relative">
        <div className=" ">
          {photos && (
            <div className="flex flex-wrap absolute rounded-t-md pb-6 bottom-[36px]  w-full bg-[#f0f2f5]">
              <div className="relative">
                <img
                  src={URL.createObjectURL(photos)}
                  className="w-16 h-16 object-cover p-2 "
                  alt=""
                />
                <button
                  className="bg-red-200 inline-flex justify-center items-center text-[11px] absolute top-2 right-2  w-4 h-4"
                  onClick={() => setPhotos("")}
                >
                  X
                </button>
              </div>
            </div>
          )}
          <input
            type="search"
            className={`${
              photos ? "rounded-t-none rounded-b-md" : "rounded-full"
            } w-full bg-[#f0f2f5]  py-[6px] px-3 focus:outline-none`}
            placeholder="Aa"
            value={chat}
            onChange={(e) => {
              setChat(e.target.value);
            }}
            onKeyUp={handleKeyUp}
          />
        </div>

        <div
          className="absolute right-3 top-[8px] bottom-0 my-auto"
          ref={dropDownRef}
        >
          <button onClick={toggleMenu}>
            <BsEmojiSmileFill className="text-[#0866ff] text-[18px]" />
          </button>

          <div className="absolute bottom-[42px] right-[5px]">
            {isOpen && <EmojiPicker />}
          </div>
        </div>
      </div>
      <div className="flex items-center">
        <button className="text-[#0866ff] text-xl">
          <HiMiniHandThumbUp />
        </button>
      </div>
    </div>
  );
}

ProfileChatFooter.propTypes = {
  activeChatUser: PropTypes.object.isRequired,
};
