import ProfileChatBody from "../chat/middleBar/ProfileChatBody";
import ProfileChatFooter from "../chat/middleBar/ProfileChatFooter";
import ProfileChatHeader from "../chat/middleBar/ProfileChatHeader";
import PropTypes from "prop-types";

export default function MiddleBody({
  showProfile,
  setShowProfile,
  isOpen,
  setIsOpen,
  activeChatUser,
}) {
  return (
    <div
      className={`chat-body flex-1 border-x h-[calc(100vh-3px)] xsm:w-fit flex justify-between flex-col overflow-hidden xsm:relative w-full bg-white absolute top-0  `}
    >
      <ProfileChatHeader
        showProfile={showProfile}
        activeChatUser={activeChatUser}
        setShowProfile={setShowProfile}
        setIsOpen={setIsOpen}
        isOpen={isOpen}
      />
      <ProfileChatBody />

      <ProfileChatFooter activeChatUser={activeChatUser} />
    </div>
  );
}

MiddleBody.propTypes = {
  showProfile: PropTypes.bool.isRequired,
  setShowProfile: PropTypes.func.isRequired,
  activeChatUser: PropTypes.object.isRequired,
  isOpen: PropTypes.bool.isRequired,
  setIsOpen: PropTypes.func.isRequired,
};
