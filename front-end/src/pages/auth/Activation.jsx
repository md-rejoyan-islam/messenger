import { Helmet } from "react-helmet-async";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/messenger.png";
import useFormFields from "../../hook/useFormFields";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import { activateAccountByOTP } from "../../features/auth/authApiSlice";
import { toast } from "react-toastify";
import { handleKeyDown } from "../../helpers/helpers";

export default function Activation() {
  const dispatch = useDispatch();
  const token = Cookies.get("verifyToken");
  const navigate = useNavigate();
  const { inputs, handleInputChange, resetForm } = useFormFields({
    code: "",
  });

  useEffect(() => {
    if (!token) {
      return navigate("/login");
    }

    // delete if cookie expire but save in storage
    else if (token === undefined) {
      Cookies.remove("verifyToken");
    }
  }, [token, navigate]);

  // handle submit
  const handleSubmit = (event) => {
    event.preventDefault();
    if (!inputs.code) return toast.warn("Code is require!");
    dispatch(activateAccountByOTP({ code: inputs.code, token, resetForm }));
  };

  const [isEmail, setIsEmail] = useState(true);

  return (
    <>
      <Helmet>
        <title>Account Activation</title>
      </Helmet>
      <div className="maxWidth min-h-screen">
        <div className="py-20  min-h-screen box-border  text-center  sm:w-[450px] mx-auto  ">
          <div className="px-6 py-4 sm:border rounded-md sm:shadow-2xl flex justify-between min-h-[65vh] flex-col gap-7">
            <div className="header">
              <figure className="mx-auto py-2">
                <img src={logo} className="w-10 mx-auto" alt="" />
              </figure>
              <div>
                <h1 className="text-xl font-bold">Active Your Account</h1>
              </div>
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
                  <button className="bg-violet-500 text-[12px] rounded-sm py-1 px-2 hover:bg-violet-600 text-white">
                    Resend OTP
                  </button>
                ) : (
                  <button className="bg-violet-500 text-[12px] rounded-sm py-1 px-2 hover:bg-violet-600 text-white">
                    Resend Email
                  </button>
                )}
                <p className="text-[11px] py-2">
                  OTP send to re******1@gmail.com
                </p>
              </div>
            </div>
            <div className="">
              <Link
                to={"/login"}
                className="bg-[#e8e8e7] hover:bg-[#e0e0db]  py-1 px-4 rounded-md block"
              >
                Login
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
