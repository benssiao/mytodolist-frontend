function isTokenExpired(token) {
  try {
    const payload = JSON.parse(atob(token.split(".")[1])); // gets the token payload. Looks like { sub: 'username', exp: 1234567890, iat: 1234567890 } etc...
    const currentTime = Math.floor(Date.now() / 1000);
    return payload.exp < currentTime;
  } catch (error) {
    console.error("Error decoding token:", error);
    throw error; // If we can't decode, assume expired
  }
}

// refreshes both refresh and access token if access token is expired
async function refreshTokenIfNeeded() {
  const accessToken = localStorage.getItem("accessToken");
  const refreshToken = localStorage.getItem("refreshToken");

  if (!accessToken || !refreshToken) {
    throw new Error("No token or refresh token found");
  }
  if (accessToken && !isTokenExpired(accessToken)) {
    return accessToken;
  }

  if (isTokenExpired(accessToken)) {
    try {
      const response = await fetch(
        "http://localhost:8080/api/v1/auth/refresh",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ refreshToken }),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to refresh token");
      }

      const { accessToken, refreshToken } = await response.json();
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);
      return accessToken;
    } catch (error) {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      // Router to login page
      throw error;
    }
  }
}

export { isTokenExpired, refreshTokenIfNeeded };
