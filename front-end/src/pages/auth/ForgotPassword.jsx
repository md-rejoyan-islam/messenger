import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/messenger.png";
import { Helmet } from "react-helmet-async";
import useFormFields from "../../hook/useFormFields";
import { handleKeyDown } from "../../helpers/helpers";
import { toast } from "react-toastify";
import SmallLoader from "../../components/loader/SmallLoader";
import { useState } from "react";
import { forgottenPassword } from "../../features/auth/authApiSlice";
import { useDispatch } from "react-redux";
import Input from "../../components/Input";

export default function ForgotPassword() {
  const dispatch = useDispatch();
  const { inputs, handleInputChange, resetForm } = useFormFields({
    auth: "",
  });

  const navigate = useNavigate("");

  // loading
  const [isLoading, setIsLoading] = useState(false);

  // handle submit
  const handleSubmit = (e) => {
    e.preventDefault();
    const { auth } = inputs;

    if (!auth) return toast.warning("Please enter your email or phone.");

    setIsLoading(true);
    dispatch(forgottenPassword({ auth, setIsLoading, resetForm, navigate }));
  };

  return (
    <>
      <Helmet>
        <title>Forgot Password</title>
      </Helmet>

      <div className=" min-h-[calc(100vh-6px)] flex items-center  py-16 bg-[#f3f5f7]">
        <div className="  box-border  text-center w-full  sm:w-[450px] mx-auto  px-4">
          <div className="px-3 sm:px-6 py-4 sm:border rounded-md shadow-sm bg-white flex justify-between min-h-[65vh] flex-col">
            <div className="header">
              <figure className="mx-auto py-2">
                <img src={logo} className="w-10 mx-auto" alt="Messenggar" />
              </figure>
              <div>
                <h1 className="text-xl font-bold">Forgotten your password?</h1>
              </div>

              <form onSubmit={handleSubmit} onKeyDown={handleKeyDown}>
                <div className="my-4">
                  <Input
                    placeholder={"Your Email or Phone Number"}
                    handleChange={handleInputChange}
                    name={"auth"}
                    value={inputs.auth}
                    type={"text"}
                  />
                </div>
                <div className="my-4">
                  <button
                    type="submit"
                    className="w-full bg-blue-400 hover:bg-blue-500 py-1 px-4 rounded-md text-white"
                  >
                    {isLoading ? <SmallLoader /> : "Reset Password"}
                  </button>
                </div>
              </form>
            </div>
            <div className="">
              <Link
                to="/login"
                className="bg-[#e8e8e7] hover:bg-[#e0e0db]  py-1 px-4 rounded-md block"
              >
                Log in now
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
