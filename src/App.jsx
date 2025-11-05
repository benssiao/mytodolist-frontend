import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "./hooks/useAuth.js";
import TopHeader from "./components/TopHeader";
import Footer from "./components/Footer";
import TodoList from "./components/TodoList";
import DimmedModal from "./modals/DimmedModal.jsx";
import LoginCard from "./components/auth/LoginCard";
import RegisterCard from "./components/auth/RegisterCard";
import HomePage from "./pages/HomePage.jsx";
import { NotFoundPage } from "./pages/NotFoundPage.jsx";

function App() {
  const { loggedIn, loading } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  // Check if we're on a modal route
  const isModalRoute =
    location.pathname === "/login" || location.pathname === "/register";

  const handleCloseModal = () => {
    navigate("/"); // Navigate back to home when closing modal
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        Loading...
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen w-screen bg-[#FFC857]">
      <TopHeader />
      <HomePage />

      <Routes>
        <Route
          path="/login"
          element={
            <DimmedModal isOpen={true} onClose={handleCloseModal}>
              <LoginCard
                onSwitchToRegister={() => navigate("/register")}
                onClose={handleCloseModal}
              />
            </DimmedModal>
          }
        />

        <Route
          path="/register"
          element={
            <DimmedModal isOpen={true} onClose={handleCloseModal}>
              <RegisterCard
                onSwitchToLogin={() => navigate("/login")}
                onClose={handleCloseModal}
              />
            </DimmedModal>
          }
        />
        <Route path="/" element={<div />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
