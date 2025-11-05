import { useState, useContext } from "react";
import Entry from "./Entry";
import { postEntry } from "../services/entryServices";
import { ErrorContext } from "../contexts/ErrorContext.jsx";
import { useAuth } from "../hooks/useAuth.js";
import { removeEntry } from "../services/entryServices.js";

export default function TodoList({ entries, setEntries }) {
  const [newEntryText, setNewEntryText] = useState("");
  const { showError } = useContext(ErrorContext);
  const { username } = useAuth();

  const handleInputChange = (event) => {
    setNewEntryText(event.target.value);
  };

  async function addEntry() {
    if (!newEntryText.trim()) {
      showError("Entry text cannot be empty");
      return;
    }
    try {
      const newEntry = { username, entryBody: newEntryText };
      const savedEntry = await postEntry(newEntry);
      console.log(savedEntry);
      console.log("entries", entries);
      if (savedEntry) {
        setEntries([...entries, savedEntry]);
        setNewEntryText("");
      }
    } catch (err) {
      console.error("Error adding entry:", err);
      showError(err.message || "Failed to add entry.");
    }
  }

  function onRemove(id) {
    console.log("Removing entry with id:", id);
    removeEntry(id);
    setEntries(entries.filter((entry) => entry.id !== id));
  }

  return (
    <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg shadow-md w-full h-full flex flex-col items-center">
      <div className="flex items-center w-full mb-4">
        <input
          type="text"
          placeholder="Add a new entry"
          className="add-entry-input w-full p-2 mb-4 border border-gray-300 rounded-lg dark:bg-gray-800 dark:text-white hover:border-gray-500 focus:border-gray-500"
          onChange={handleInputChange}
          value={newEntryText}
        />
        <button
          onClick={addEntry}
          className="relative -top-1.5 w-9 aspect-square rounded-full outline-1 mx-5 bg-white text-black border border-black hover:bg-black hover:text-white active:bg-gray-800 active:text-white transition-colors duration-150"
        >
          <div className="text-2xl">+</div>
        </button>
      </div>

      <div className="divide-dashed divide-gray-700 w-full divide-y">
        {entries && entries.length !== 0 ? (
          entries.map((entry) => (
            <Entry
              onRemove={() => onRemove(entry.id)}
              key={entry.id}
              entryText={entry.entryBody}
            />
          ))
        ) : (
          <div className="text-center text-gray-500 dark:text-gray-300 mt-10">
            No entries yet. Add one above!
          </div>
        )}
      </div>
    </div>
  );
}
