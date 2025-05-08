import { Link, useNavigate } from "react-router-dom";
import {
  FaSignInAlt,
  FaSignOutAlt,
  FaUser,
  FaCalendarAlt,
} from "react-icons/fa";
import { useContext } from "react";
import AuthContext from "../contexts/AuthContext"; // Make sure path is correct
import { toast } from "react-toastify";

function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const onLogout = () => {
    logout();
    toast.success("Logged out successfully");
    navigate("/");
  };

  return (
    <nav className="bg-white shadow-lg">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-primary-600">
          MeetX
        </Link>
        <div className="flex space-x-4">
          <Link
            to="/activities"
            className="flex items-center px-3 py-2 text-gray-700 hover:text-primary-600"
          >
            <FaCalendarAlt className="mr-2" />
            Activities
          </Link>
          {user ? (
            <>
              <Link
                to="/my-bookings"
                className="flex items-center px-3 py-2 text-gray-700 hover:text-primary-600"
              >
                My Bookings
              </Link>
              <button
                onClick={onLogout}
                className="flex items-center px-3 py-2 text-gray-700 hover:text-primary-600"
              >
                <FaSignOutAlt className="mr-2" />
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="flex items-center px-3 py-2 text-gray-700 hover:text-primary-600"
              >
                <FaSignInAlt className="mr-2" />
                Login
              </Link>
              <Link
                to="/register"
                className="flex items-center px-3 py-2 text-gray-700 hover:text-primary-600"
              >
                <FaUser className="mr-2" />
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
