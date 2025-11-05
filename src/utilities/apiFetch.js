import { refreshTokenIfNeeded } from "./tokenUtils";

export async function apiFetch(url, options = {}) {
  try {
    const tokenIsNotNeededUrl =
      url.endsWith("/auth/login") ||
      url.endsWith("/auth/register") ||
      url.endsWith("/auth/verifyaccess") ||
      url.endsWith("/auth/verifyrefresh");

    const accessToken = tokenIsNotNeededUrl
      ? null
      : await refreshTokenIfNeeded();

    const finalOptions = {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
        ...(options.headers || {}),
      },
    };

    console.log("apiFetch options before fetch:", finalOptions);
    const response = await fetch(url, finalOptions);

    // --- Handle non-OK responses safely ---
    if (!response.ok) {
      let errorMessage = `HTTP ${response.status}`;
      try {
        const errorData = await response.json();
        errorMessage = errorData.message || JSON.stringify(errorData);
      } catch {
        const text = await response.text();
        errorMessage = text || errorMessage;
      }
      const error = new Error(errorMessage);
      error.status = response.status;
      throw error;
    }

    if (response.status !== 204) {
      const text = await response.text();
      try {
        return JSON.parse(text);
      } catch {
        console.warn(`Non-JSON response from ${url}: ${text}`);
        return text;
      }
    }
    if (response.status === 204) return null;

    const text = await response.text();
    try {
      return text ? JSON.parse(text) : null;
    } catch {
      // fallback when backend returns plain text instead of JSON
      console.warn(`Non-JSON response from ${url}:`, text);
      return text;
    }
  } catch (error) {
    console.error("Error in apiFetch:", error);
    throw error;
  }
}
