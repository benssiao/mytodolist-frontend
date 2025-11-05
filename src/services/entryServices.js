import { apiFetch } from "../utilities/apiFetch.js";

export async function getEntries() {
  try {
    const data = await apiFetch("http://localhost:8080/api/v1/entries", {
      method: "GET",
    });
    console.log("Fetched entries:", data);
    return data;
  } catch (error) {
    console.error("Error fetching entries:", error);
    throw error;
  }
}

export async function postEntry(entry) {
  try {
    const data = await apiFetch("http://localhost:8080/api/v1/entries", {
      method: "POST",
      body: JSON.stringify(entry),
    });
    console.log("Created entry:", data);
    return data;
  } catch (error) {
    console.error("Error posting entry:", error);
    throw error;
  }
}

export async function updateEntry(entryId, newBody) {
  try {
    const data = await apiFetch(
      `http://localhost:8080/api/v1/entries/${entryId}`,
      {
        method: "PUT",
        body: JSON.stringify(newBody),
      }
    );
    console.log("Updated entry:", data);
    return data;
  } catch (error) {
    console.error("Error updating entry:", error);
    throw error;
  }
}

export async function removeEntry(id) {
  try {
    await apiFetch(`http://localhost:8080/api/v1/entries/${id}`, {
      method: "DELETE",
    });
    console.log(`Removed entry with id: ${id}`);
    return true;
  } catch (error) {
    console.error("Error removing entry:", error);
    throw error;
  }
}
