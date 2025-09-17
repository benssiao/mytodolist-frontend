async function getEntries() {
  const token = localStorage.getItem("accessToken");

  if (!token) {
    console.log("No JWT token found in local storage");
    return [];
  }

  return fetch(`http://localhost:8080/api/v1/entries/`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      console.log("Response from getEntries:", response);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      response
        .clone()
        .json()
        .then((data) => {
          console.log("Fetched entries:", data);
        });
      return response.json();
    })
    .catch((error) => {
      console.error(
        "There has been a problem with your fetch operation:",
        error
      );
    });
}

async function updateEntry(entryId, newBody) {
  const token = localStorage.getItem("accessToken");

  if (!token) {
    console.log("No JWT token found in local storage");
    return null;
  }

  return fetch(`http://localhost:8080/api/v1/entries/${entryId}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newBody),
  })
    .then((response) => {
      console.log("Response from updateEntry:", response);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .catch((error) => {
      console.error("There was a problem with the fetch operation:", error);
    });
}

async function postEntry(entry) {
  const token = localStorage.getItem("accessToken");

  if (!token) {
    console.log("No JWT token found in local storage");
    return null;
  }
  return fetch("http://localhost:8080/api/v1/entries", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(entry),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .catch((error) => {
      console.error("There was a problem with the fetch operation:", error);
    });
}

async function removeEntry(id) {
  const accessToken = localStorage.getItem("accessToken");

  if (!accessToken) {
    console.log("No JWT token found in local storage");
    return null;
  }
  return fetch(`http://localhost:8080/api/v1/entries/${id}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    method: "DELETE",
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .catch((error) => {
      console.error("There was a problem with the fetch operation:", error);
    });
}

export { getEntries, postEntry, updateEntry, removeEntry };
