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

async function refreshTokenIfNeeded() {
  const token = localStorage.getItem("accessToken");
  const refreshToken = localStorage.getItem("refreshToken");

  if (!token || !refreshToken) {
    throw new Error("No token or refresh token found");
  }

  if (isTokenExpired(token)) {
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
      if (response.status === 401 || response.status === 403) {
        // Refresh token is expired so redirect to login.
        throw new Error("Refresh token expired");
      }
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

  return token;
}

export { isTokenExpired, refreshTokenIfNeeded };
