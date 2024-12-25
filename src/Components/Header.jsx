import React, { useState, useRef } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import { FaSearch, FaUserCircle, FaShoppingCart } from "react-icons/fa";

const Header = () => {
  const [isCatalogOpen, setIsCatalogOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const timeoutRef = useRef(null);
  const navigate = useNavigate();

  const handleMouseEnter = () => {
    clearTimeout(timeoutRef.current); // Clear any existing timeout
    setIsCatalogOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setIsCatalogOpen(false); // Close dropdown after a small delay
    }, 200); // Adjust delay (in milliseconds) as needed
  };

  const navigateMouseProductDetailsPage = () => {
    navigate("/Product/Mouse"); // Navigate to the Mouse page
  };

  const navigateKeyboardProductDetailsPage = () => {
    navigate("/Product/Keyboard"); // Navigate to the Keyboard page
  };

  const navigateMicProductDetailsPage = () => {
    navigate("Product/Mic"); // Navigate to the Mic page
  };

  const navigateMousePadProductDetailsPage = () => {
    navigate("Product/MousePad"); // Navigate to the MousePad page
  };

  return (
    <header className="w-full bg-[#0a2351] text-white">
      {/* Top Header */}
      <div className="flex items-center justify-between px-6 py-4">
        {/* Left: Logo */}
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-white"></div>
          <span className="text-xl font-bold">HardwareG</span>
        </div>

        {/* Middle: Search */}
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
          <NavLink to="/Profile">
            <FaUserCircle className="text-2xl cursor-pointer" />
          </NavLink>
          <NavLink to="/Cart">
            <FaShoppingCart className="text-2xl cursor-pointer" />
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
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            Catalog
            {isCatalogOpen && (
              <ul
                className="absolute top-8 left-0 bg-white text-black rounded-lg shadow-lg p-4 z-50"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                <li>
                  <button
                    onClick={navigateMouseProductDetailsPage}
                    className="hover:bg-yellow-200 p-2 rounded w-full text-left"
                  >
                    Mouse
                  </button>
                </li>
                <li> 
                <button
                 onClick={navigateKeyboardProductDetailsPage}
                className="hover:bg-yellow-200 p-2 rounded"
                >
                  Keyboard
                </button>
                </li>
                <li>
                <button 
                onClick={navigateMicProductDetailsPage}
                className="hover:bg-yellow-200 p-2 rounded"
                  >
                  Mic
                </button>
                </li>          
                <li>
                  <button 
                  onClick={navigateMousePadProductDetailsPage}
                  className ="hover:bg-yellow-200 p-2 rounded"
                  >
                  Mousepad
                  </button>
                </li>
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
