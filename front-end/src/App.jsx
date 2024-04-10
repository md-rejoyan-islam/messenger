import "./App.css";
import { RouterProvider } from "react-router-dom";
import router from "./router/router";
import { HelmetProvider } from "react-helmet-async";
import { ToastContainer } from "react-toastify";
import { useEffect } from "react";
import { getAuthData, setMessageEmpty } from "./features/auth/authSlice";
const helmetContext = {};
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { getLoggedInUser } from "./features/auth/authApiSlice";
import { getAllUser } from "./features/user/userApiSlice";

function App() {
  // get error
  const { error, message } = useSelector(getAuthData);

  // dispatch
  const dispatch = useDispatch();

  useEffect(() => {
    error && toast.error(error);
    message && toast.success(message);

    dispatch(setMessageEmpty());
  }, [dispatch, error, message]);

  useEffect(() => {
    dispatch(getLoggedInUser());
    // dispatch(getAllUser());
  }, [dispatch]);

  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        draggable
        theme="light"
      />
      <HelmetProvider context={helmetContext}>
        <RouterProvider router={router} />
      </HelmetProvider>
    </>
  );
}

export default App;
