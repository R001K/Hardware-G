import React, { createContext, useState, useEffect } from "react";
import { account } from "../Auth/Appwriteconfig";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch the authenticated user
  const fetchUser = async () => {
    try {
      const response = await account.get();
      setUser(response);
    } catch {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  // Run fetchUser once 
  useEffect(() => {
    fetchUser();
  }, []);

  const login = async (email, password) => {
    try {
      await account.createEmailPasswordSession(email, password); 
      console.log('Login successful');
      
      fetchUser(); 
    } catch (error) {
      console.error('Login failed:', error.message);
    }
  };
  
  

  const logout = async () => {
    try {
      await account.deleteSession("current"); // Delete the current session
      setUser(null); // Reset user state
    } catch (error) {
      console.error("Logout failed:", error.message);
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;