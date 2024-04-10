import { Navigate, useLocation, Outlet, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { getAuthData } from "../features/auth/authSlice";

const PrivateGuard = () => {
  const { user, loader } = useSelector(getAuthData);

  const { state } = useLocation();

  // if (loading) {
  //   return <Loading />;
  // }
  if (user && !user.isVerified) {
    return <Navigate to="/account-activation" />;
  } else if (user && user.isVerified) {
    return <Outlet />;
  }

  return <Navigate to="/login" state={state?.from?.state} replace={true} />;
};

export default PrivateGuard;
