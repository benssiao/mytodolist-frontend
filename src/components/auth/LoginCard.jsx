import { useState } from "react";
import { useAuth } from "../../contexts/AuthContext.jsx";

function LoginCard() {
  const { setUsername, setLoggedIn } = useAuth();
  const [inputUsername, setInputUsername] = useState("");

  const handleLogin = async () => {
    // Simulate login process
    localStorage.setItem("username", inputUsername);
    setUsername(inputUsername);
    setLoggedIn(true);
  };

  return (
    <div className="login-card">
      <h2>Login</h2>
      <input
        type="text"
        placeholder="Username"
        value={inputUsername}
        onChange={(e) => setInputUsername(e.target.value)}
      />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
}

export default LoginCard;
