import { createContext, useState, useEffect } from "react";
import { createUser } from "../services/userServices.js";
import {
  verifyAccessToken,
  verifyRefreshToken,
} from "../services/authServices.js";
import { refreshTokenIfNeeded } from "../utilities/tokenUtils.js";
import { useNavigate } from "react-router-dom";
import { getUser } from "../services/userServices.js";
import { logoutService } from "../services/authServices.js";

import { apiFetch } from "../utilities/apiFetch.js";
const AuthContext = createContext();

function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    async function initializeTokens() {
      setLoading(true);
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
          // Refresh token invalid, so clear all and log out
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
          await refreshTokenIfNeeded();
          accessToken = localStorage.getItem("accessToken");
        }
        const userData = await getUser();
        setUser(userData);
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
      const data = await apiFetch("http://localhost:8080/api/v1/auth/login", {
        method: "POST",
        body: JSON.stringify({ username, password }),
      });

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
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    }
  }

  async function logout() {
    if (!user) {
      return;
    }

    try {
      await logoutService(user.username);
      setUser(null);
      setLoggedIn(false);
      navigate("/");
    } catch (error) {
      console.error("Logout error:", error);
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
