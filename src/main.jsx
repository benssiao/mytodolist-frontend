import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { AuthProvider } from "./contexts/AuthContext.jsx";
import { BrowserRouter } from "react-router-dom";
import { ErrorProvider } from "./contexts/ErrorContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <ErrorProvider>
          <App />
        </ErrorProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
);
