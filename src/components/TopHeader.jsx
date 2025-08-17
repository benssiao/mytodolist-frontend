import NavBar from "./NavBar";
import { useState } from "react";
import logo from "../assets/icons/applogo.png";
import TodoLogo from "./TodoLogo";
function TopHeader(props) {
  return (
    <nav className=" flex items-center justify-between bg-[#119DA4] dark:bg-gray-800 p-4">
      <div className="flex">
        <TodoLogo></TodoLogo>
        <div className="flex flex-col">
          <p>Woohoo</p> <p>Todo</p>
        </div>
      </div>

      <NavBar loggedIn={props.loggedIn} />
    </nav>
  );
}

export default TopHeader;
