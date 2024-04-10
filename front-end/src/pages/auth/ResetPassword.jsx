import { Link, useNavigate } from "react-router-dom";
import useFormFields from "../../hook/useFormFields";
import { useEffect, useState } from "react";
import { handleKeyDown } from "../../helpers/helpers";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { resetPassword } from "../../features/auth/authApiSlice";
import Cookies from "js-cookie";

export default function ResetPassword() {
  const { inputs, handleInputChange, resetForm } = useFormFields({
    newPassword: "",
    oldPassword: "",
    code: "",
  });

  // password show hide
  const [showPassword, setShowPassword] = useState(false);

  const dispatch = useDispatch();

  const navigate = useNavigate("");

  const [loading, setLoading] = useState(false);

  const token = Cookies.get("passwordResetToken");
  console.log(token);

  // handle submit
  const handleSubmit = (event) => {
    event.preventDefault();

    const { newPassword, oldPassword, code } = inputs;

    if (!newPassword) return toast.error("New Password is required!");
    if (!oldPassword) return toast.error("Old Password is required!");
    if (!code) return toast.error("Code is required!");

    if (newPassword !== oldPassword)
      return toast.error("Password doesn't match");
    setLoading(true);

    dispatch(resetPassword({ inputs, setLoading, resetForm, navigate }));
  };

  useEffect(() => {
    if (!token) {
      navigate("/forgot-password");
    }
  }, [token, navigate]);

  return (
    <div className="maxWidth min-h-[calc(100vh-10px)] flex justify-center items-center">
      <div className="py-20   box-border  text-center  sm:w-[450px] mx-auto">
        <div className="px-6 py-4  sm:border rounded-md sm:shadow-2xl">
          <div className="header">
            <div>
              <h1 className="text-xl font-bold">Reset Password</h1>
            </div>
            <form onKeyDown={handleKeyDown} onSubmit={handleSubmit}>
              <div className="my-4">
                <input
                  className=" w-full border border-transparent focus:border-blue-400 focus:border focus:outline-none bg-[#f5f5f5] rounded-xl px-4 py-[6px]"
                  type={showPassword ? "text" : "password"}
                  name="newPassword"
                  value={inputs.newPassword}
                  onChange={handleInputChange}
                  placeholder="New Password"
                />
              </div>
              <div className="my-4">
                <input
                  className=" w-full border border-transparent focus:border-blue-400 focus:border focus:outline-none bg-[#f5f5f5] rounded-xl px-4 py-[6px]"
                  type={showPassword ? "text" : "password"}
                  name="oldPassword"
                  value={inputs.oldPassword}
                  onChange={handleInputChange}
                  placeholder="Old Password"
                />
              </div>
              <div className="my-4">
                <input
                  className=" w-full border border-transparent focus:border-blue-400 focus:border focus:outline-none bg-[#f5f5f5] rounded-xl px-4 py-[6px]"
                  type="text"
                  name="code"
                  value={inputs.code}
                  onChange={handleInputChange}
                  placeholder="Enter Your Code"
                />
              </div>
              <div className="my-1 text-left px-2">
                <label
                  className=" cursor-pointer "
                  onChange={() => {
                    setShowPassword(!showPassword);
                  }}
                >
                  <input type="checkbox" name="" id="" />
                  <span className="px-2">show password</span>
                </label>
              </div>
              <div className="my-4">
                <button
                  type="submit"
                  className="w-full bg-[#2d9629] hover:bg-[#32a92e] py-1 px-4 rounded-md text-white"
                >
                  Reset Password
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
