import { useState } from "react";

import appStore from "../../../assets/app-store.svg";
import microsoftStore from "../../../assets/microsoft-store.png";
import chat from "../../../assets/chat.png";
import LoginForm from "../../../components/form/LoginForm";
import LoginHeader from "./LoginHeader";
import icon from "../../../assets/messenger.png";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";

export default function Login() {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <>
      <Helmet>
        <title>Login</title>
        {/* <link rel="canonical" href={icon} /> */}
        <link rel="shortcut icon" href={icon} type="image/x-icon" />
      </Helmet>
      <div
        className={`${
          showMenu && "overflow-hidden h-[calc(100vh-10px)]"
        } maxWidth`}
      >
        <LoginHeader showMenu={showMenu} setShowMenu={setShowMenu} />
        <main className=" flex flex-col lg:flex-row justify-between lg:gap-28 gap-12 py-10 px-6">
          <div className="flex-1 ">
            <div className="max-w-[440px] mx-auto lg:mx-0">
              <h1 className="lg:text-left text-[40px] sm:text-[60px] text-center lg:text-[82px] leading-10 sm:leading-[65px] lg:leading-[85px]  lg:tracking-[-4px] tracking-[-2px]  font-semibold text-transparent bg-clip-text bg-gradient-to-r  from-[#0088FF] from-0%  via-[#A033FF] via-25% to-[#FF5C87] to-60% ">
                Hang out anytime, <br /> anywhere
              </h1>
              <p className="my-7 text-lg text-center lg:text-left text-[#595959]">
                Messenger makes it easy and fun to stay close to your favourite
                people.
              </p>
              <div>
                <LoginForm />
                <div>
                  <label className="flex items-center gap-2 text-sm cursor-pointer">
                    <input type="checkbox" className="" />

                    <span>Keep me signed in</span>
                  </label>
                </div>
                <div className="my-7 flex items-center gap-6 flex-wrap">
                  <Link
                    to="/register"
                    className="text-center lg:w-[350px] w-full bg-[#2d9629] hover:bg-[#32a92e] py-[6px] px-4 rounded-2xl text-white"
                  >
                    Create New Account
                  </Link>
                </div>

                <div className="my-3 flex gap-5 items-center flex-wrap">
                  <figure>
                    <img
                      src={appStore}
                      className="w-[120px] rounded-md"
                      alt=""
                    />
                  </figure>
                  <figure>
                    <img
                      src={microsoftStore}
                      className="w-[120px] rounded-md"
                      alt=""
                    />
                  </figure>
                </div>
              </div>
            </div>
          </div>
          <div className="flex-1  md:w-full max-w-[400px] lg:max-w-full mx-auto">
            <figure>
              <img src={chat} alt="Discord" />
            </figure>
          </div>
        </main>
      </div>
    </>
  );
}
