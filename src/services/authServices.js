async function verifyAccessToken(accessToken) {
  try {
    const verification = await fetch(
      "http://localhost:8080/api/v1/auth/verify",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ accessToken }),
      }
    );
    return verification.ok;
  } catch (error) {
    console.error("Error verifying access token:", error);
    return false;
  }
}

async function verifyRefreshToken(refreshToken) {
  try {
    const verification = await fetch(
      "http://localhost:8080/api/v1/auth/verifyRefresh",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ refreshToken }),
      }
    );
    return verification.ok;
  } catch (error) {
    console.error("Error verifying refresh token:", error);
    return false;
  }
}

export { verifyAccessToken, verifyRefreshToken };
