import logo from "../../assets/messenger.png";
import Avatar from "../Avatar";
import useDropDownPopup from "../../hook/useDropDownPopup";
import UserModal from "../modal/UserModal";
import { getAuthData } from "../../features/auth/authSlice";
import { useSelector } from "react-redux";

export default function MessengerHeader() {
  const { isOpen, toggleMenu, dropDownRef } = useDropDownPopup();
  const { user } = useSelector(getAuthData);

  return (
    <header className="maxWidth py-4 sm:py-5 sticky top-0 w-full bg-white">
      <div className="destop flex items-center justify-between px-6">
        {/* logo  */}
        <figure className="inline-block">
          <img className=" h-10 w-10" src={logo} alt="logo" />
        </figure>

        <div ref={dropDownRef} className="relative">
          <button onClick={toggleMenu}>
            <Avatar style="h-10 w-10" name={user?.name} photo={user?.photo} />
          </button>
          {isOpen && <UserModal style="right-0 top-10" />}
        </div>
      </div>
    </header>
  );
}
