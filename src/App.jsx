import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "./hooks/useAuth.js";
import TopHeader from "./components/TopHeader";
import Footer from "./components/Footer";
import TodoList from "./components/TodoList";
import Modal from "./modals/DimmedModal.jsx";
import LoginCard from "./components/auth/LoginCard";
import RegisterCard from "./components/auth/RegisterCard";

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

      <div className="flex-1 py-20 grid grid-cols-[1fr_3fr_1fr] border-t-1 border-[#DFA837] border-b-1">
        <div></div>
        <div>
          {loggedIn ? (
            <TodoList />
          ) : (
            <div className="bg-gray-100 dark:bg-gray-700 p-8 rounded-lg shadow-md w-full h-full flex flex-col items-center justify-center">
              <h1 className="text-3xl font-bold mb-4 text-gray-800">
                Welcome to Woohoo Todo!
              </h1>
              <p className="text-gray-600 mb-8 text-center">
                Please login or register to start managing your tasks.
              </p>
              <div className="space-x-4">
                <button
                  onClick={() => navigate("/login")}
                  className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                >
                  Login
                </button>
                <button
                  onClick={() => navigate("/register")}
                  className="px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                >
                  Register
                </button>
              </div>
            </div>
          )}
        </div>
        <div></div>
      </div>

      <Footer />

      {/* Route-based Modals */}
      <Routes>
        <Route
          path="/login"
          element={
            <Modal isOpen={true} onClose={handleCloseModal}>
              <LoginCard
                onSwitchToRegister={() => navigate("/register")}
                onClose={handleCloseModal}
              />
            </Modal>
          }
        />

        <Route
          path="/register"
          element={
            <Modal isOpen={true} onClose={handleCloseModal}>
              <RegisterCard
                onSwitchToLogin={() => navigate("/login")}
                onClose={handleCloseModal}
              />
            </Modal>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
