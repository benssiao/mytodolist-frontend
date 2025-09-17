import { useState, useEffect } from "react";
import "./App.css";
import TopHeader from "./components/TopHeader";
import Footer from "./components/Footer";
import TodoList from "./components/TodoList";

import { useAuth } from "./hooks/useAuth.js";
import LoginCard from "./components/auth/LoginCard.jsx";
import RegisterCard from "./components/auth/RegisterCard.jsx";
import {
  getEntries,
  postEntry,
  updateEntry,
  removeEntry,
} from "./services/entryServices";
import { createUser, getUser } from "./services/userServices.js";

function App() {
  const { user, loggedIn, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!loggedIn) {
    

  

  const [loggedIn, setLoggedIn] = useState(false);

  return (
    <>
      <div className="flex flex-col  min-h-screen w-screen bg-[#FFC857]">
        <TopHeader loggedIn={loggedIn} />
        <div className="flex-1 py-20 grid grid-cols-[1fr_3fr_1fr] border-t-1 border-[#DFA837] border-b-1 ">
          <div className=""></div>
          <div className="">
            {" "}
            <TodoList
              entries={entries}
              setEntries={setEntries}
              username={username}
            ></TodoList>{" "}
          </div>
          <div> </div>
        </div>
        <Footer />
      </div>
    </>
  );
}

export default App;
