import { createContext, useState, useEffect } from "react";
import { createUser } from "../services/userServices.js";
import {
  verifyAccessToken,
  verifyRefreshToken,
} from "../services/authServices.js";
import { refreshTokenIfNeeded } from "../utitlities/tokenUtils.js";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function initializeTokens() {
      let accessToken = localStorage.getItem("accessToken");
      let refreshToken = localStorage.getItem("refreshToken");

      if (!accessToken || !refreshToken) {
        setUser(null);
        setLoggedIn(false);
        setLoading(false);
        return;
      }

      try {
        const isAccessTokenValid = await verifyAccessToken(accessToken);
        const isRefreshTokenValid = await verifyRefreshToken(refreshToken);
        if (!isRefreshTokenValid) {
          localStorage.removeItem("accessToken");
          localStorage.removeItem("refreshToken");
          setUser(null);
          setLoggedIn(false);
          setLoading(false);
          return;
          // Both tokens are invalid, user needs to login again.
          //redirect to login again.
        }

        if (!isAccessTokenValid) {
          refreshToken = await refreshTokenIfNeeded(refreshToken);
          if (!refreshToken) {
            throw new Error("Unable to refresh access token");
          }
          localStorage.setItem("refreshToken", refreshToken);
          accessToken = localStorage.getItem("accessToken");
        }
        setLoggedIn(true);
      } catch (error) {
        console.error("Error during token verification:", error);
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        setUser(null);
        setLoggedIn(false);
      } finally {
        setLoading(false);
      }
    }

    initializeTokens();
  }, []);
  async function login(username, password) {
    try {
      const response = await fetch("http://localhost:8080/api/v1/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem("accessToken", data.accessToken);
        localStorage.setItem("refreshToken", data.refreshToken);

        const userData = {
          id: data.userId,
          username: data.username,
          roles: data.roles,
        };

        setUser(userData);
        setLoggedIn(true);

        return { success: true };
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message || "Login failed");
      }
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    }
  }

  async function logout() {
    try {
      const response = await fetch("http://localhost:8080/api/v1/auth/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username: user?.username }),
      });

      if (!response.ok) {
        console.error("Logout failed on server");
      }
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      // Always clear local state regardless of server response
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      setUser(null);
      setLoggedIn(false);
    }
  }

  async function register(username, password) {
    try {
      await createUser({ username, password });
      return { success: true, message: "User registered successfully" };
    } catch (error) {
      console.error("Registration error:", error);
      throw error;
    }
  }

  const value = {
    user,
    loggedIn,
    loading,
    login,
    logout,
    register,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export { AuthContext, AuthProvider };
