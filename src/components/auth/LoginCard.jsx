import { useState } from "react";
import { useAuth } from "../../hooks/useAuth.js";
import { useNavigate } from "react-router-dom";
import { ErrorContext } from "../../contexts/ErrorContext.jsx";
import { useContext } from "react";

function LoginCard({ onSwitchToRegister, onClose }) {
  const { login } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { showError } = useContext(ErrorContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await login(username, password);
      navigate("/"); // Redirect to home on successful login
    } catch (err) {
      showError(err.message || "Failed to login.");
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 relative ">
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-xl"
      >
        ×
      </button>

      <h2 className="text-2xl font-bold mb-4">Login</h2>

      {error && <div className="text-red-500 mb-4 text-sm">{error}</div>}

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 mb-6 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          required
        />
        <button
          type="submit"
          className="w-full p-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-200"
        >
          Login
        </button>
      </form>

      <div className="mt-4 text-center text-sm">
        <span className="text-gray-600">Don't have an account? </span>
        <button
          onClick={onSwitchToRegister}
          className="text-blue-500 hover:underline font-medium"
        >
          Register
        </button>
      </div>
    </div>
  );
}

export default LoginCard;
