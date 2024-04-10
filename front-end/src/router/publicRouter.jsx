import Activation from "../pages/auth/Activation.jsx";
import ActivationURL from "../pages/auth/ActivationURL.jsx";
import Forgot from "../pages/auth/ForgotPassword.jsx";

import Login from "../pages/auth/login/Login.jsx";
import Register from "../pages/auth/Register.jsx";
import ResetPassword from "../pages/auth/ResetPassword.jsx";
import PublicGuard from "./PublicGuard.jsx";

// create public router
const publicRouter = [
  {
    element: <PublicGuard />,
    children: [
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/forgot-password",
        element: <Forgot />,
      },
      {
        path: "/reset-password",
        element: <ResetPassword />,
      },
      {
        path: "/activation",
        element: <Activation />,
        loader: async ({ request }) => {
          const url = new URL(request.url);
          const search = url.searchParams.get("auth");

          // const res = await getSingleService(params.id);
          // return res.data;
          return null;
        },
      },
      {
        path: "/activation/:activationToken",
        element: <ActivationURL />,
        loader: async ({ params }) => {
          return params;
        },
      },
    ],
  },
];

// export router
export default publicRouter;
