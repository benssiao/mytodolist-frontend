import TodoList from "../components/TodoList";
import { useAuth } from "../hooks/useAuth.js";
import { getEntries } from "../services/entryServices.js";
import { useContext } from "react";
import { ErrorContext } from "../contexts/ErrorContext.jsx";

import { useState, useEffect } from "react";

function HomePage() {
  const { showError } = useContext(ErrorContext);
  const { loggedIn, user } = useAuth();
  const [entries, setEntries] = useState([]);
  useEffect(() => {
    if (!loggedIn || !user?.username) return;
    async function fetchEntries() {
      try {
        const userEntries = await getEntries(user.username);
        setEntries(userEntries || []);
      } catch (err) {
        console.error("Error fetching entries:", err);
        showError(err.message || "Failed to fetch entries.");
      }
    }
    fetchEntries();
  }, [loggedIn, user]);

  return (
    <div className="flex-1 py-20 grid grid-cols-[1fr_3fr_1fr] border-t-1 border-[#DFA837] border-b-1">
      <div></div>
      <div>
        <TodoList entries={entries} setEntries={setEntries} />
      </div>
      <div></div>
    </div>
  );
}

export default HomePage;
