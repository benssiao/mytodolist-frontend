import { useState } from "react";
import { useAuth } from "../../hooks/useAuth.js";
import { useNavigate } from "react-router-dom";
import { ErrorContext } from "../../contexts/ErrorContext.jsx";
import { useContext } from "react";
import { apiFetch } from "../../utilities/apiFetch.js";

function RegisterCard({ onSwitchToLogin, onClose }) {
  const { register } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const { showError } = useContext(ErrorContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (password !== confirmPassword) {
      setError("Passwords don't match");
      return;
    }

    try {
      await register(username, password);
      setSuccess("Registration successful! Redirecting to login page.");
      setTimeout(() => {
        onSwitchToLogin();
      }, 1500);
    } catch (err) {
      showError(err.message || "Failed to register.");
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 relative">
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-xl"
      >
        ×
      </button>

      <h2 className="text-2xl font-bold mb-4">Register</h2>

      {error && <div className="text-red-500 mb-4 text-sm">{error}</div>}
      {success && <div className="text-green-500 mb-4 text-sm">{success}</div>}

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          required
          minLength="3"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          required
          minLength="6"
        />
        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="w-full p-3 mb-6 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          required
        />
        <button
          type="submit"
          className="w-full p-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:ring-blue-500 transition-colors duration-200"
        >
          Register
        </button>
      </form>
      <div className="mt-4 text-center text-sm">
        <span className="text-gray-600">Already have an account? </span>
        <button
          onClick={onSwitchToLogin}
          className="text-blue-500 hover:underline font-medium"
        >
          Login
        </button>
      </div>
    </div>
  );
}

export default RegisterCard;
