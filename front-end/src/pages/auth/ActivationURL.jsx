import { Helmet } from "react-helmet-async";
import { Link, useNavigate, useLoaderData } from "react-router-dom";
import logo from "../../assets/messenger.png";
import useFormFields from "../../hook/useFormFields";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import {
  activateAccountByOTP,
  activateAccountByURL,
} from "../../features/auth/authApiSlice";

export default function ActivationURL() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { activationToken } = useLoaderData();

  const [message, setMessage] = useState({
    error: null,
    success: null,
  });

  const [redirectIn, setRedirectIn] = useState(5);

  useEffect(() => {
    (async () => {
      const result = await dispatch(
        activateAccountByURL({ url: activationToken })
      );

      if (result.error) {
        setMessage((prev) => ({
          ...prev,
          error: result.error.message,
        }));
      } else if (result.payload.message) {
        setMessage((prev) => ({
          ...prev,
          success: result.payload.message,
        }));
      }
    })();
  }, [dispatch, activationToken]);

  useEffect(() => {
    let clear;
    if (message.success) {
      clear = setTimeout(() => {
        setRedirectIn(redirectIn - 1);
      }, 1000);
    }
    if (redirectIn == 0) {
      clearInterval(clear);
      navigate("/login");
    }
  }, [redirectIn, message.success, navigate]);

  return (
    <>
      <Helmet>
        <title>Account Activation</title>
      </Helmet>
      <div className="maxWidth min-h-[calc(100vh-10px)] flex justify-center items-center">
        <div className="py-20   box-border  text-center   mx-auto">
          <div className="px-6 py-4 sm:border rounded-md sm:shadow-2xl  h-fit sm:w-[450px]">
            <div className="header">
              <figure className="mx-auto py-2">
                <img src={logo} className="w-10 mx-auto" alt="" />
              </figure>
              <div>
                <h1 className="text-xl font-bold">Active Your Account</h1>
              </div>
              <div className="py-4">
                {message.success && (
                  <p className="">
                    {message.success}. Redict in
                    <span className="text-violet-500 pl-1 pr-[2px]">
                      {redirectIn}
                    </span>
                    s.
                  </p>
                )}
                {message.error && (
                  <p className="py-2 text-red-400">{message.error}</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
