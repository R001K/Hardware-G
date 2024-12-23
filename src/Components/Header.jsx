import React, { useState } from "react";
import { FaSearch, FaUserCircle, FaShoppingCart } from "react-icons/fa";
import { NavLink } from "react-router-dom"; // 

const Header = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isCatalogOpen, setIsCatalogOpen] = useState(false);

  return (
    <header className="w-full bg-[#0a2351] text-white">
      {/* Top Header */}
      <div className="flex items-center justify-between px-6 py-4">
        {/* Left: Logo and Text */}
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-white"></div>
          <span className="text-xl font-bold">HardwareG</span>
        </div>

        {/* Middle: Search Bar */}
        <div className="relative">
          <FaSearch
            className="text-xl cursor-pointer"
            onClick={() => setIsSearchOpen(!isSearchOpen)}
          />
          {isSearchOpen && (
            <input
              type="text"
              placeholder="Search..."
              className="absolute top-0 left-0 mt-8 w-64 p-2 text-black rounded-lg outline-none"
            />
          )}
        </div>

        {/* Right: Profile and Cart */}
        <div className="flex items-center gap-4">
          {/* Profile Icon */}
          <div className="relative">
            <NavLink 
            to="/Profile" >
            <FaUserCircle
              className="text-2xl cursor-pointer"
              onClick={() => setIsProfileOpen(!isProfileOpen)}
            />
            </NavLink>

          </div>
          {/* Cart Icon */}
          <NavLink
          to="/Profile">
          <FaShoppingCart className="text-2xl cursor-pointer"
           onClick={() => setIsProfileOpen(!isProfileOpen)} />
          </NavLink>
          
        </div>
      </div>

      {/* Bottom Header: Navigation */}
      <nav className="bg-yellow-500 py-2">
        <ul className="flex justify-center items-center gap-8 text-black">
          {/* Home Link */}
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? "text-white" : "hover:text-white"
              }
            >
              Home
            </NavLink>
          </li>

          {/* Catalog Link with Dropdown */}
          <li
            className="relative cursor-pointer hover:text-white"
            onMouseEnter={() => setIsCatalogOpen(true)}
            onMouseLeave={() => setIsCatalogOpen(false)}
          >
            Catalog
            {isCatalogOpen && (
              <ul className="absolute top-8 left-0 bg-white text-black rounded-lg shadow-lg p-4 z-50">
                <li className="hover:bg-gray-200 p-2 rounded">Mouse</li>
                <li className="hover:bg-gray-200 p-2 rounded">Keyboard</li>
                <li className="hover:bg-gray-200 p-2 rounded">Mic</li>
                <li className="hover:bg-gray-200 p-2 rounded">Mousepad</li>
                <li className="hover:bg-gray-200 p-2 rounded">IEM</li>
              </ul>
            )}
          </li>

          {/* About Link */}
          <li>
            <NavLink
              to="/about"
              className={({ isActive }) =>
                isActive ? "text-white" : "hover:text-white"
              }
            >
              About
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
