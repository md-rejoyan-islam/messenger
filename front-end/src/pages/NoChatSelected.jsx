import messengerPhoto from "../assets/messengar_transparent.png";
import { useSelector } from "react-redux";
import { getAuthData } from "../features/auth/authSlice";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function NoChatSelected() {
  const { user } = useSelector(getAuthData);

  const navigate = useNavigate();

  // useEffect(() => {
  //   if (!user?.isVerified) {
  //     navigate("/account-verify");
  //   }
  // }, [navigate, user.isVerified]);

  return (
    <>
      <section className=" hidden xsm:block min-h-[calc(100vh-3px)] mx-auto flex-1  p-4 border-l">
        <div className="flex justify-center items-center flex-col h-full">
          <figure>
            <img src={messengerPhoto} className="w-40 " alt="" />
          </figure>
          <span className="text-lg font-semibold">No Chat Selected</span>
        </div>
      </section>
    </>
  );
}
