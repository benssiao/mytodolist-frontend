import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../hooks/useAuth.js";
import TodoLogo from "./TodoLogo";

function NavBar() {
  const { loggedIn, logout } = useAuth();
  const location = useLocation();
  return (
    <div className="flex items-center py-4 overflow-x-auto whitespace-nowrap">
      {loggedIn ? (
        (
        <div className="flex items-center space-x-4">
          <Link
            to="/settings"
            className="text-[#4B3F72] dark:text-blue-400 hover:underline"
          >
            Settings
          </Link>
      <button
            onClick={logout}
            className="text-[#4B3F72] dark:text-blue-400 hover:underline"
          >
            Logout
          </button>
        </div>
      ) : (
        <div>
          <a
            href="#"
            className="text-[#4B3F72] dark:text-blue-400 hover:underline"
          >
            Register
          </a>
          <span className="mx-5 text-black dark:text-gray-300">/</span>

          <a
            href="#"
            className="text-[#4B3F72] dark:text-gray-200 hover:underline"
          >
            Login
          </a>
        </div>
      )}

      <span className="mx-5 text-black dark:text-gray-300">/</span>

      <a href="#" className="text-[#4B3F72] dark:text-blue-400 hover:underline">
        Settings
      </a>
    </div>
  );
}

export default NavBar;
