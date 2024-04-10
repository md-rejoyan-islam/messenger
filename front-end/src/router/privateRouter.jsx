import Layout from "../layout/Layout";
import MainLayout from "../layout/MainLayout";
import ActivationAfterLogin from "../pages/auth/ActivationAfterLogin";
import Messenger from "../pages/messenger/Messenger";
import NoChatSelected from "../pages/NoChatSelected";
import People from "../pages/People";
import EditProfile from "../pages/profile/EditProfile";
import Requeted from "../pages/Requeted";
import PrivateGuard from "./PrivateGuard";

// create Private router
const privateRouter = [
  {
    element: <PrivateGuard />,
    children: [
      {
        element: <MainLayout />,
        children: [
          {
            element: <Layout />,
            children: [
              {
                path: "/",
                element: <NoChatSelected />,
              },
              {
                path: "/t/:id",
                element: <Messenger />,
              },
            ],
          },
          {
            path: "/edit-profile",
            element: <EditProfile />,
          },
          {
            path: "/requested",
            element: <Requeted />,
          },
          {
            path: "/people",
            element: <People />,
          },
        ],
      },
    ],
  },
  {
    path: "/account-activation",
    element: <ActivationAfterLogin />,
  },
];

// export router
export default privateRouter;
