import React, { createContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = (email, password) => {
    // Mock login logic
    return new Promise((resolve, reject) => {
      if (email === "test@test.com" && password === "password") {
        setUser({ email });
        resolve();
      } else {
        reject("Invalid credentials");
      }
    });
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
