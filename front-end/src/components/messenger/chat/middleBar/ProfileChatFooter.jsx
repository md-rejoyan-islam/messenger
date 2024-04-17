import { HiMiniHandThumbUp } from "react-icons/hi2";
import { BsEmojiSmileFill } from "react-icons/bs";
import { HiMiniGif } from "react-icons/hi2";
import { RiEmojiStickerFill } from "react-icons/ri";
import { ImImages } from "react-icons/im";
import { AiFillPlusCircle } from "react-icons/ai";
import EmojiPicker from "emoji-picker-react";
import useDropDownPopup from "../../../../hook/useDropDownPopup";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useParams } from "react-router-dom";
import useSound from "use-sound";
import sound from "../../../../assets/audio/messenger.mp3";
import { getAuthData } from "../../../../features/auth/authSlice";
import { createUserToUserChat } from "../../../../features/conversation/conversationApiSlice";
import { getAllConversation } from "../../../../features/conversation/conversationSlice";
import { BsFillSendFill } from "react-icons/bs";

export default function ProfileChatFooter({ activeChatUser, socket }) {
  const { isOpen, toggleMenu, dropDownRef } = useDropDownPopup();

  const { activeConversation } = useSelector(getAllConversation);

  const { user } = useSelector(getAuthData);

  const [chat, setChat] = useState("");
  const dispatch = useDispatch();

  const [photos, setPhotos] = useState(null);

  // sound
  const [play] = useSound(sound);

  // typing
  const [typing, setTyping] = useState(false);

  const { id } = useParams();
  const receiverId = activeConversation?.userIds?.find((member) => {
    return member !== user._id;
  });

  const handleKeyUp = (e) => {
    e.preventDefault();

    setTyping(true);

    if (!chat) {
      setTyping(false);
    }

    if (e.key === "Enter") {
      handleSubmit();
    }
  };

  const handleSubmit = () => {
    const formData = new FormData();
    formData.append("conversationId", id);
    formData.append("body", chat);
    formData.append("image", photos);
    formData.append("receiverId", receiverId);
    setTyping(false);

    dispatch(
      createUserToUserChat({
        formData,
        socket,
        setChat,
        setPhotos,
      })
    );
    // play();
  };

  useEffect(() => {
    socket?.current?.emit("typingForMsg", {
      typing,
      conversationId: activeChatUser?.conversationId || id,
      receiverId,
    });
  }, [socket, id, activeChatUser?.conversationId, receiverId, typing, chat]);

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
            onKeyDown={() => setTyping(true)}
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
            {isOpen && (
              <EmojiPicker
                previewConfig={{
                  showPreview: false,
                }}
                skinTonesDisabled={true}
                onEmojiClick={(object) => {
                  setChat((prev) => prev + object.emoji);
                }}
              />
            )}
          </div>
        </div>
      </div>
      <div className="flex items-center pr-1">
        <button className="text-[#0866ff] text-xl" onClick={handleSubmit}>
          {/* <HiMiniHandThumbUp /> */}
          <BsFillSendFill className="rotate-45 " />
        </button>
      </div>
    </div>
  );
}

ProfileChatFooter.propTypes = {
  activeChatUser: PropTypes.object.isRequired,
};
