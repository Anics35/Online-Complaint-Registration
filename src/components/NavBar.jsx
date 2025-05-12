import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";
import { removeUser } from "../utils/userSlice";

const NavBar = () => {
  const user = useSelector((store) => store.user?.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post(BASE_URL + "/logout", {}, { withCredentials: true });
      dispatch(removeUser());
      navigate("/login");
    } catch (err) {
      // Optional: handle error
    }
  };

  return (
    <div className="navbar bg-base-300 px-4 sticky top-0 z-50 shadow-md">
      <div className="flex-1">
        <Link to="/" className="btn btn-ghost text-xl">
          🛠️ Complaint Portal
        </Link>
      </div>

      <div className="flex-none gap-4 items-center ">
        {!user ? (
          <>
            <Link to="/login" className="btn btn-sm btn-outline ">
              Login
            </Link >
            <Link to="/signup" className="btn btn-sm btn-primary">
              Signup
            </Link>
          </>
        ) : (
          <>
            <Link to="/dashboard" className="btn btn-sm btn-ghost">
              Dashboard
            </Link>
            <Link to="/profile" className="btn btn-sm btn-ghost">
              Profile
            </Link>
            <button onClick={handleLogout} className="btn btn-sm btn-error text-white">
              Logout
            </button>
            {/* <div className="avatar">
              <div className="w-8 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                <img src={user.photoUrl} alt="user" />
              </div>
            </div> */}
          </>
        )}
      </div>
    </div>
  );
};

export default NavBar;
