import { useState } from "react";
import { useAuth } from "../../contexts/AuthContext.jsx";

function RegisterCard() {
  const { setUsername, setLoggedIn } = useAuth();
  const [inputUsername, setInputUsername] = useState("");

  const handleRegister = async () => {
    // Simulate registration process
    localStorage.setItem("username", inputUsername);
    setUsername(inputUsername);
    setLoggedIn(true);
  };

  return (
    <div className="register-card">
      <h2>Register</h2>
      <input
        type="text"
        placeholder="Username"
        value={inputUsername}
        onChange={(e) => setInputUsername(e.target.value)}
      />
      <button onClick={handleRegister}>Register</button>
    </div>
  );
}

export default RegisterCard;
