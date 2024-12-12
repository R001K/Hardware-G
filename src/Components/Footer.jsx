import React from "react";
import { FaDiscord, FaInstagram, FaTwitter } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-[#0a2351] text-white py-6">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center px-6">
        {/* Left Section: Quick Links */}
        <div className="mb-6 md:mb-0">
          <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2">
            <li>
              <a href="/terms" className="hover:underline">
                Terms of Service
              </a>
            </li>
            <li>
              <a href="/shipping" className="hover:underline">
                Shipping Policy
              </a>
            </li>
            <li>
              <a href="/refund" className="hover:underline">
                Refund Policy
              </a>
            </li>
            <li>
              <a href="/privacy" className="hover:underline">
                Privacy Policy
              </a>
            </li>
            <li>
              <a href="/contact" className="hover:underline">
                Contact Us
              </a>
            </li>
          </ul>
        </div>

        {/* Center Section: Brand Name */}
        <div className="mb-6 md:mb-0">
          <h3 className="text-xl font-bold">HardwareG</h3>
          <p className="text-sm text-gray-300">© 2024 HardwareG. All rights reserved.</p>
        </div>

        {/* Right Section: Social Media Links */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
          <div className="flex space-x-4">
            <a href="https://discord.com" target="_blank" rel="noopener noreferrer">
              <FaDiscord className="text-2xl hover:text-yellow-400" />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
              <FaInstagram className="text-2xl hover:text-yellow-400" />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
              <FaTwitter className="text-2xl hover:text-yellow-400" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
