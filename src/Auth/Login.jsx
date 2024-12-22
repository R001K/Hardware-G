import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom"; 
import AuthContext from "../utils/AuthContext";

const Login = () => {
  const { login, user } = useContext(AuthContext); // Getting login function and user state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // If user is already logged in, navigate to profile
  useEffect(() => {
    if (user) {
      navigate("/profile"); 
    }
  }, [user, navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await login(email, password); 
      navigate("/profile"); // Redirect to profile after successful login
    } catch (err) {
      setError("Invalid email or password"); 
    }
  };
  
  //Redirect to the Register page
  const handleSignup = () => {
    navigate("/register"); 
  };
  return (
    <div className="flex items-center justify-center h-screen" style={{ backgroundColor: "#0a2351" }}>
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold text-center mb-6 text-yellow-500">Login</h2>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700 font-medium mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-yellow-500 text-white py-2 rounded-lg hover:bg-gray-600 transition duration-200"
          >
            Login
          </button>
          <button
            type="submit" 
            onClick={handleSignup} // Navigate to Register page
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-green-600 transition duration-200"
          >
            Signup
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
