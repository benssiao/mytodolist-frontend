import { useState } from "react";
import TodoLogo from "./TodoLogo";

function NavBar(props) {
  return (
    <div className="flex items-center py-4 overflow-x-auto whitespace-nowrap">
      {props.loggedIn ? (
        <div>
          {" "}
          <a
            href="#"
            className="text-[#4B3F72] dark:text-blue-400 hover:underline"
          >
            Profile
          </a>
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
