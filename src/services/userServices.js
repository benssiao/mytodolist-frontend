import { apiFetch } from "../utilities/apiFetch.js";

export async function createUser(userData) {
  try {
    return await apiFetch("http://localhost:8080/api/v1/auth/register", {
      method: "POST",
      body: JSON.stringify(userData),
    });
  } catch (error) {
    console.error("User registration failed:", error);
    throw error;
  }
}

export async function getUser() {
  try {
    return await apiFetch("http://localhost:8080/api/v1/users/me", {
      method: "GET",
    });
  } catch (error) {
    console.error("Fetching user info failed:", error);
    throw error;
  }
}
