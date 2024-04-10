import { Helmet } from "react-helmet-async";
import { FaCamera } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { getAuthData } from "../../features/auth/authSlice";
import defaultPhoto from "../../assets/default.png";
import { changeUserPhoto } from "../../features/auth/authApiSlice";
import MenuBar from "../../components/messenger/menu/MenuBar";
import DrawerMenu from "../../components/messenger/menu/DrawerMenu";

export default function EditProfile() {
  const { user } = useSelector(getAuthData);

  const dispatch = useDispatch();

  const handlePhotoChange = (event) => {
    const photo = event.target.files[0];
    const formData = new FormData();
    formData.append("photo", photo);
    dispatch(changeUserPhoto(formData));
  };

  return (
    <>
      <Helmet>
        <title>Profile Update</title>
      </Helmet>
      {/* <MessengerHeader /> */}
      <section className="flex items-center justify-center w-full">
        <div className="maxWidth min-h-[calc(100vh-3px)] ">
          <div className="py-20  box-border  text-center  sm:w-[450px] mx-auto  ">
            <div className="px-6 py-4 sm:border rounded-md sm:shadow-2xl  min-h-[65vh] ">
              <div className="profile-photo relative inline-block">
                <figure>
                  <img
                    src={user?.photo ? user.photo : defaultPhoto}
                    alt=""
                    className="w-36 h-36 rounded-full"
                  />
                </figure>
                <div className="absolute bottom-3 right-1">
                  <label
                    className="w-8 h-8 rounded-full bg-gray-300 inline-flex hover:bg-gray-400 justify-center items-center  cursor-pointer"
                    htmlFor="photo"
                  >
                    <FaCamera />
                  </label>
                  <input
                    type="file"
                    onChange={handlePhotoChange}
                    name="photo"
                    id="photo"
                    className="hidden"
                  />
                </div>
              </div>
              <div className="profile-body my-1">
                <h3 className="text-xl font-semibold text-center">
                  {user?.name}
                </h3>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
