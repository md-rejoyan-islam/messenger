import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { createUserConversation } from "../../features/conversation/conversationApiSlice";
import { useNavigate } from "react-router-dom";
import { updateDisconnectedUsersData } from "../../features/user/userSlice";

export default function UserCard({ name, photo, id }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // handle connect
  const handleConnect = async () => {
    const result = await dispatch(
      createUserConversation({
        receiverId: id,
      })
    );

    if (result.payload.success) {
      console.log(result.payload.data);
      const conversationId = result.payload.data._id;
      // update disconnected user data
      dispatch(updateDisconnectedUsersData(result.payload.data));
      navigate(`/t/${conversationId}`);
    }
  };
  return (
    <div className="card rounded-md  border bg-white  max-w-[250px] mx-auto md:mx-0 w-full">
      <div className="card-head ">
        <figure>
          <img
            src={photo}
            alt=""
            className="mx-auto  object-cover w-[180px] h-[180px] "
          />
        </figure>
      </div>
      <div className="card-body px-2 py-4">
        <h3 className="text-center text-lg font-semibold pb-3">{name}</h3>
        <button
          className="w-full py-2 px-3 rounded-md bg-violet-500 text-white hover:bg-violet-600 border-none focus:outline-none"
          onClick={handleConnect}
        >
          Connect
        </button>
      </div>
    </div>
  );
}

UserCard.propTypes = {
  photo: PropTypes.string,
  name: PropTypes.string,
  id: PropTypes.string,
};
