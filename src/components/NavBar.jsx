import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

function NavBar() {
  const { loggedIn, logout, user } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="flex items-center py-4 overflow-x-auto whitespace-nowrap">
      {loggedIn ? (
        <div className="flex items-center space-x-4">
          <span className="text-[#4B3F72] font-medium">
            Welcome, {user?.username}
          </span>
          <button
            onClick={logout}
            className="text-[#4B3F72] dark:text-blue-400 hover:underline"
          >
            Logout
          </button>
        </div>
      ) : (
        <div className="flex items-center space-x-4">
          <button
            onClick={() => navigate("/register")}
            className="text-[#4B3F72] dark:text-blue-400 hover:underline"
          >
            Register
          </button>
          <span className="text-black dark:text-gray-300">/</span>
          <button
            onClick={() => navigate("/login")}
            className="text-[#4B3F72] dark:text-blue-400 hover:underline"
          >
            Login
          </button>
        </div>
      )}
    </div>
  );
}

export default NavBar;
