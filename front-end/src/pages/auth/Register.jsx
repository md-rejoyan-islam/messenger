import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/messenger.png";
import { Helmet } from "react-helmet-async";
import useFormFields from "../../hook/useFormFields";
import { useDispatch } from "react-redux";
import { createUser } from "../../features/auth/authApiSlice";
import { toast } from "react-toastify";
import { useState } from "react";
import { IoEye } from "react-icons/io5";
import { IoEyeOff } from "react-icons/io5";
import { handleKeyDown, isBdMobile, isEmail } from "../../helpers/helpers";
import SmallLoader from "../../components/loader/SmallLoader";

export default function Register() {
  const navigate = useNavigate();

  // dispatch
  const dispatch = useDispatch();

  const { inputs, handleInputChange, resetForm } = useFormFields({
    name: "",
    auth: "",
    password: "",
  });

  // password show
  const [isPasswordShow, setIsPasswordShow] = useState(false);

  // loading
  const [isLoading, setIsLoading] = useState(false);

  // handle submit
  const handleSubmit = (e) => {
    e.preventDefault();

    const { name, auth, password } = inputs;

    // all field is require
    if (!name || !auth || !password) {
      return toast.error("Please fill in all fields");
    }

    // email or phone number validate
    if (!isEmail(auth) && !isBdMobile(auth))
      return toast.error("Invalid email or phone number.");

    // minimum password length
    if (password.length < 6)
      return toast.warning("Password must be at least 6 character.");

    // loading true
    setIsLoading(true);

    // dispatch
    dispatch(createUser({ data: inputs, setIsLoading, resetForm, navigate }));
  };

  return (
    <>
      <Helmet>
        <title>Register </title>
      </Helmet>
      <div className="maxWidth min-h-[calc(100vh-6px)] py-16 flex items-center justify-center">
        <div className=" box-border  text-center w-full   sm:w-[450px] mx-auto  ">
          <div className="px-6 py-4 sm:border rounded-md sm:shadow-2xl flex justify-between min-h-[65vh] flex-col">
            <div className="header">
              <figure className="mx-auto py-2">
                <img src={logo} className="w-10 mx-auto" alt="" />
              </figure>
              <div>
                <h1 className="text-xl font-bold">Create your account</h1>
              </div>
              <form onSubmit={handleSubmit} onKeyDown={handleKeyDown}>
                <div className="my-4">
                  <input
                    className=" w-full border border-transparent focus:border-blue-400 focus:border focus:outline-none bg-[#f5f5f5] rounded-xl px-4 py-[6px]"
                    type="text"
                    name="name"
                    value={inputs.name}
                    onChange={handleInputChange}
                    placeholder="Your Name"
                  />
                </div>

                <div className="my-4">
                  <input
                    className=" w-full border border-transparent focus:border-blue-400 focus:border focus:outline-none bg-[#f5f5f5] rounded-xl px-4 py-[6px]"
                    type="text"
                    name="auth"
                    value={inputs.auth}
                    onChange={handleInputChange}
                    placeholder="Email address or phone number"
                  />
                </div>
                <div className="my-4 relative">
                  <input
                    className=" w-full border border-transparent focus:border-blue-400 focus:border focus:outline-none bg-[#f5f5f5] rounded-xl px-4 py-[6px]"
                    onChange={handleInputChange}
                    type={isPasswordShow ? "text" : "password"}
                    name="password"
                    value={inputs.password}
                    placeholder="Password"
                  />
                  <span
                    onClick={() => setIsPasswordShow(!isPasswordShow)}
                    className="cursor-pointer"
                  >
                    {inputs.password &&
                      (isPasswordShow ? (
                        <IoEyeOff className="absolute top-[12px] right-3" />
                      ) : (
                        <IoEye className="absolute top-[12px] right-3" />
                      ))}
                  </span>
                </div>
                <div className="my-4">
                  <button
                    type="submit"
                    className="w-full bg-[#2d9629] hover:bg-[#32a92e] py-1 px-4 rounded-md text-white "
                  >
                    {isLoading ? <SmallLoader /> : "Register"}
                  </button>
                </div>
              </form>
            </div>
            <div className="">
              <Link
                to={"/login"}
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
