import React, { useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { account } from "./Appwriteconfig";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      setLoading(false);
      return;
    }

    try {
      // Register user with Appwrite
      await account.create("unique()", email, password);
      alert("Registration successful! Please login.");
      window.location.href = "/login";
    } catch (err) {
      setError(err.message || "An error occurred during registration");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a2351] text-white">
      <header className="flex items-center justify-between px-6 py-4 bg-[#0a2351]">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-white rounded-full">
            <FaUserCircle className="w-full h-full text-[#0a2351]" />
          </div>
          <span className="text-2xl font-bold">Register</span>
        </div>
      </header>

      <div className="px-6 py-8">
        <h2 className="text-3xl font-semibold mb-4">Create Your Account</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}

        <form onSubmit={handleRegister} className="space-y-6">
          <div>
            <label className="block text-lg font-medium" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full p-4 mt-2 text-black rounded-lg outline-none"
              placeholder="Enter your email"
            />
          </div>

          <div>
            <label className="block text-lg font-medium" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full p-4 mt-2 text-black rounded-lg outline-none"
              placeholder="Enter your password"
            />
          </div>

          <div>
            <label className="block text-lg font-medium" htmlFor="confirmPassword">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="w-full p-4 mt-2 text-black rounded-lg outline-none"
              placeholder="Confirm your password"
            />
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className={`w-full p-4 text-white rounded-lg ${
                loading ? "bg-gray-400" : "bg-yellow-500 hover:bg-yellow-400"
              }`}
            >
              {loading ? "Registering..." : "Register"}
            </button>
          </div>
        </form>

        <div className="mt-6 text-center">
          <p>
            Already have an account?{" "}
            <a href="/login" className="text-yellow-500 hover:underline">
              Login here
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
