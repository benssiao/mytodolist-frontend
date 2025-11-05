import { apiFetch } from "../utilities/apiFetch.js";

async function verifyAccessToken(token) {
  const res = await apiFetch("http://localhost:8080/api/v1/auth/verifyaccess", {
    method: "POST",
    body: JSON.stringify({ accessToken: token }),
  });
  return res === "Access token is valid" || res.valid === true;
}

async function verifyRefreshToken(token) {
  const res = await apiFetch(
    "http://localhost:8080/api/v1/auth/verifyrefresh",
    {
      method: "POST",
      body: JSON.stringify({ refreshToken: token }),
    }
  );
  return res === "Refresh token is valid" || res.valid === true;
}

async function logoutService(username) {
  try {
    await apiFetch("http://localhost:8080/api/v1/auth/logout", {
      method: "POST",
      body: JSON.stringify({ username: username }),
    });
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
  } catch (error) {
    console.error("Error during logout:", error);
    throw error;
  }
}

export { verifyAccessToken, verifyRefreshToken, logoutService };
