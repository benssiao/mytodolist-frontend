import { useState, useEffect } from "react";
import "./App.css";
import TopHeader from "./components/TopHeader";
import Footer from "./components/Footer";
import TodoList from "./components/TodoList";
import {
  getEntries,
  postEntry,
  updateEntry,
  removeEntry,
} from "./services/entryServices";
import { createUser, getUser } from "./services/userServices";

function App() {
  const [testText, setTestText] = useState("");
  const [username, setUsername] = useState("");
  const [entries, setEntries] = useState([
    { id: crypto.randomUUID(), text: "hello" },
    { id: crypto.randomUUID(), text: "goodbye" },
  ]);

  useEffect(() => {
    localStorage.clear();
    async function initializeUser() {
      let username = localStorage.getItem("username");
      console.log("Retrieved username from localStorage:", username);
      if (!username) {
        username = "anon_" + crypto.randomUUID();
        setUsername(username);
        localStorage.setItem("username", username);
        try {
          console.log("Creating new user with username:", username);
          await createUser({ username: username });
          setEntries([]);
        } catch (error) {
          console.error("Error creating user:", error);
        }
      } else {
        try {
          const userEntries = await getEntries(username);
          setUsername(username);
          console.log("Fetched entries:", userEntries);
          setEntries(userEntries);
        } catch (error) {
          console.error("Error fetching entries:", error);
        }
      }
    }

    initializeUser();
  }, []);

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
