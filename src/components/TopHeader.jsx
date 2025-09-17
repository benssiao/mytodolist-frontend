import NavBar from "./NavBar";
import TodoLogo from "./TodoLogo";

function TopHeader() {
  return (
    <nav className="flex items-center justify-between bg-[#119DA4] dark:bg-gray-800 p-4">
      <div className="flex">
        <TodoLogo />
        <div className="flex flex-col">
          <p>Woohoo</p> 
          <p>Todo</p>
        </div>
      </div>
      <NavBar />
    </nav>
  );
}

export default TopHeader;