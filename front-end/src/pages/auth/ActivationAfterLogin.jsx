import { Helmet } from "react-helmet-async";
import { useState } from "react";
import Cookies from "js-cookie";
import { useDispatch, useSelector } from "react-redux";
import useFormFields from "../../hook/useFormFields";
import {
  activateAccountByOTP,
  resendVerificationCode,
} from "../../features/auth/authApiSlice";
import { toast } from "react-toastify";
import {
  handleKeyDown,
  starEmailAddress,
  starPhone,
} from "../../helpers/helpers";
import { getAuthData } from "../../features/auth/authSlice";
import MessengerHeader from "../../components/messenger/MessengerHeader";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function ActivationAfterLogin() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = Cookies.get("verifyToken");

  const { user } = useSelector(getAuthData);

  const { inputs, handleInputChange, resetForm } = useFormFields({
    code: "",
  });

  // first
  const [isFirst, setIsFirst] = useState(true);

  // handle submit
  const handleSubmit = (event) => {
    event.preventDefault();
    if (!inputs.code) return toast.warn("Code is require!");
    dispatch(activateAccountByOTP({ code: inputs.code, token, resetForm }));
  };

  // send verication code
  const handleSendCode = () => {
    setIsFirst(false);
    const auth = user?.email || user.phone;
    dispatch(resendVerificationCode({ auth }));
  };

  const [isEmail, setIsEmail] = useState(user?.email ? true : false);

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [navigate, user]);

  return (
    <>
      <Helmet>
        <title>Account Activation</title>
      </Helmet>

      <MessengerHeader />
      <div className="maxWidth">
        <div className="py-20   box-border  text-center  sm:w-[450px] mx-auto  ">
          <div className="px-6 py-4 sm:border rounded-md sm:shadow-2xl flex justify-between flex-col gap-7">
            <div className="header">
              <div>
                <h1 className="text-xl font-bold">
                  Please active your account.
                </h1>
              </div>
              {isFirst ? (
                <div className="first-show py-6">
                  {isEmail ? (
                    <>
                      <p className="pb-3">
                        Can you send verification code to{" "}
                        {user && starEmailAddress(user?.email)}?
                      </p>
                      <button
                        className="bg-violet-500 text-[12px] rounded-sm py-1 px-2 hover:bg-violet-600 text-white"
                        onClick={handleSendCode}
                      >
                        Send Email
                      </button>
                    </>
                  ) : (
                    <>
                      <p className="pb-3">
                        Can you send OTP to {starPhone("01738428141")}?
                      </p>
                      <button
                        className="bg-violet-500 text-[12px] rounded-sm py-1 px-2 hover:bg-violet-600 text-white"
                        onClick={handleSendCode}
                      >
                        Send OTP
                      </button>
                    </>
                  )}
                </div>
              ) : (
                <div className="after-send-code">
                  <form onSubmit={handleSubmit} onKeyDown={handleKeyDown}>
                    <div className="my-4">
                      <input
                        className=" w-full border border-transparent focus:border-blue-400 focus:border focus:outline-none bg-[#f5f5f5] rounded-xl px-4 py-[6px]"
                        type="text"
                        value={inputs.code}
                        name="code"
                        onChange={handleInputChange}
                        placeholder="Activation Code"
                      />
                    </div>
                    <div className="my-4">
                      <button
                        type="submit"
                        className="w-full bg-blue-400 hover:bg-blue-500 py-1 px-4 rounded-md text-white"
                      >
                        Activate Now
                      </button>
                    </div>
                  </form>
                  <div className="text-left">
                    {isEmail ? (
                      <>
                        <button
                          className="bg-violet-500 text-[12px] rounded-sm py-1 px-2 hover:bg-violet-600 text-white"
                          onClick={handleSendCode}
                        >
                          Resend Email
                        </button>
                        <p className="text-[11px] py-2">
                          Verification code send to{" "}
                          {user && starEmailAddress(user?.email)}
                        </p>
                      </>
                    ) : (
                      <>
                        <button
                          className="bg-violet-500 text-[12px] rounded-sm py-1 px-2 hover:bg-violet-600 text-white"
                          onClick={handleSendCode}
                        >
                          Resend OTP
                        </button>
                        <p className="text-[11px] py-2">
                          OTP send to {starPhone("01738428141")}
                        </p>
                      </>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
