/* eslint-disable react/prop-types */
import { createContext, useState, useEffect } from "react";

// Create Context
// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext();

// Create a Provider component
export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setAuth(true);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};
