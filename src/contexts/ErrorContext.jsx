import { createContext, useState, useCallback } from "react";

export const ErrorContext = createContext();

export function ErrorProvider({ children }) {
  const [error, setError] = useState(null);

  const showError = useCallback((message) => {
    setError(message);
    setTimeout(() => {
      setError(null);
    }, 4000);
  }, []);

  return (
    <ErrorContext.Provider value={{ error, showError }}>
      {children}
      {error && (
        <div className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none">
          <div className="bg-red-600 text-white px-6 py-4 rounded-lg shadow-lg text-center text-lg font-medium pointer-events-auto animate-fade-in">
            {error}
          </div>
        </div>
      )}
    </ErrorContext.Provider>
  );
}
