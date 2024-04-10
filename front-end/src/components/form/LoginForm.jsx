import { Link } from "react-router-dom";
import useFormFields from "../../hook/useFormFields";
import SmallLoader from "../loader/SmallLoader";
import { useState } from "react";
import { toast } from "react-toastify";
import { IoEye } from "react-icons/io5";
import { IoEyeOff } from "react-icons/io5";
import { handleKeyDown } from "../../helpers/helpers";
import { loginUser } from "../../features/auth/authApiSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function LoginForm() {
  const { inputs, handleInputChange } = useFormFields({
    auth: "",
    password: "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // loading
  const [isLoading, setIsLoading] = useState(false);
  // password show
  const [isPasswordShow, setIsPasswordShow] = useState(false);

  // handle submit
  const handleSubmit = (e) => {
    e.preventDefault();

    const { auth, password } = inputs;

    // all field is require
    if (!auth || !password) {
      return toast.error("Please fill in all fields");
    }
    // loading
    setIsLoading(true);

    dispatch(loginUser({ inputs, setIsLoading, navigate }));
  };

  return (
    <form
      className="lg:w-[350px] mx-auto lg:mx-0  sm:w-[420px]"
      onSubmit={handleSubmit}
      onKeyDown={handleKeyDown}
    >
      <div className="my-4">
        <input
          className=" w-full focus:border-blue-400 border border-transparent focus:border focus:outline-none bg-[#f5f5f5] rounded-xl px-4 py-[6px]"
          type="text"
          name="auth"
          value={inputs.auth}
          onChange={handleInputChange}
          placeholder="Email address or phone number"
        />
      </div>
      <div className="my-4 relative">
        <input
          className="w-full border border-transparent focus:border-blue-400 focus:border focus:outline-none  bg-[#f5f5f5] rounded-xl px-4  py-[6px]"
          name="password"
          onChange={handleInputChange}
          value={inputs.password}
          type={isPasswordShow ? "text" : "password"}
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

      <div className="my-7 flex items-center gap-6 flex-wrap">
        <button
          type="submit"
          className="bg-blue-500 hover:bg-violet-500 text-white rounded-3xl px-5 flex items-center h-11  font-bold py-[6px]"
        >
          {isLoading ? <SmallLoader /> : "Log In"}
        </button>

        <Link
          to={"/forgot-password"}
          className="text-blue-500 hover:underline font-semibold appearance-none accent-red-300"
        >
          forgotten your password?
        </Link>
      </div>
    </form>
  );
}
