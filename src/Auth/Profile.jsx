import React, { useState, useContext ,useEffect } from "react";
import { FaUserCircle } from "react-icons/fa";
import AuthContext from "../utils/AuthContext";  

const Profile = () => {
  const { logout , user } = useContext(AuthContext); 
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  const handleSave = () => {
    alert("Profile updated successfully!");
    setIsEditing(false);
  };

  useEffect(()=>{
    if(user){
      setEmail(user.email)
      setName(user.name)
    }
  },[user])


  const handleLogout = () => {
    logout(); 
  };

  return (
    <div className="min-h-screen bg-[#0a2351] text-white">
      {/* Profile Header */}
      <header className="flex items-center justify-between px-6 py-4 bg-[#0a2351]">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-white rounded-full">
            <FaUserCircle className="w-full h-full text-[#0a2351]" />
          </div>
          <span className="text-2xl font-bold">Profile</span>
        </div>
      </header>

      {/* Profile Info Section */}
      <div className="px-6 py-8">
        <h2 className="text-3xl font-semibold mb-4">Your Profile</h2>

        <div className="space-y-6">
          <div>
            <label className="block text-lg font-medium" htmlFor="name">
              Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              disabled={!isEditing}
              className="w-full p-4 mt-2 text-black rounded-lg outline-none"
              placeholder="Enter your name"
            />
          </div>

          <div>
            <label className="block text-lg font-medium" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={!isEditing}
              className="w-full p-4 mt-2 text-black rounded-lg outline-none"
              placeholder="Enter your email"
            />
          </div>

          <div className="flex justify-between items-center">
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="px-6 py-2 bg-yellow-500 hover:bg-yellow-400 text-white rounded-lg"
            >
              {isEditing ? "Cancel" : "Edit Profile"}
            </button>
            {isEditing && (
              <button
                onClick={handleSave}
                className="px-6 py-2 bg-green-500 hover:bg-green-400 text-white rounded-lg"
              >
                Save Changes
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Logout Section */}
      <div className="px-6 py-8 text-center">
        <button
          onClick={handleLogout} // Call the handleLogout function
          className="px-6 py-2 bg-red-500 hover:bg-red-400 text-white rounded-lg"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Profile;
