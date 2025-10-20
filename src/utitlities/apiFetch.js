import { refreshTokenIfNeeded } from "./tokenUtils";

export async function apiFetch(url, options = {}) {
  try {
    let accessToken = localStorage.getItem("accessToken");
    accessToken = await refreshTokenIfNeeded();

    const finalOptions = {
      ...options,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
        ...(options.headers || {}),
      },
    };

    const response = await fetch(url, finalOptions);

    if (!response.ok) {
      const errorData = await response.json();
      const error = Error(errorData.message || "API request failed");
      error.status = response.status;
      error.details = errorData.details || "";
      throw error;
    }

    if (response.status !== 204) {
      return await response.json();
    }
    return null; // No content
  } catch (error) {
    console.error("Error in apiFetch while refreshing token:", error);
    throw error;
  }
}
