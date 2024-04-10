import { Navigate, useLocation, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { getAuthData } from "../features/auth/authSlice";

const PublicGuard = () => {
  const { user, loader } = useSelector(getAuthData);

  const { state } = useLocation();

  // if (loading) {
  //   return <Loading />;
  // }

  if (!user) {
    return <Outlet />;
  }
  return <Navigate to={"/"} state={state?.from?.state} replace={true} />;
};

export default PublicGuard;
