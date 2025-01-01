import React from "react";
// <<<<<<< Updated upstream
import mouseImage from "../assets/homeimg/mouse.jpg"
import Keybord from "../assets/homeimg/keybord.jpg"
import Microphone from "../assets/homeimg/Mic.jpg"
import Mousepad from "../assets/homeimg/MPad.jpg"



// =======
// import mouseImage from "../assets/homeimg/mouse.jpg";
// import Keybord from "../assets/homeimg/Keybord.jpg";
// import Microphone from "../assets/homeimg/Mic.jpg";
// import Mousepad from "../assets/homeimg/MPad.jpg";
import { NavLink } from "react-router-dom";
// >>>>>>> Stashed changes

const Home = () => {
  const cards = [
    { id: 1, img: mouseImage, text: "Mouse", Navi: "/Product/Mouse" },
    { id: 2, img: Keybord, text: "Keyboard", Navi: "/Product/Keyboard" },
    { id: 3, img: Microphone, text: "Case", Navi: "/Product/Case" },
    { id: 4, img: Mousepad, text: "Monitor", Navi: "/Product/Monitor" },
    { id: 5, img: Mousepad, text: "VideoCard", Navi: "/Product/VideoCard" },
    { id: 6, img: Mousepad, text: "Headphones", Navi: "/Product/Headphones" },
  ];  

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-[#0a2351] text-center mb-8">Our Products</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {cards.map((card) => (
          <NavLink
            to={card.Navi}
            key={card.id}
            className="relative group rounded-lg overflow-hidden shadow-lg bg-white"
          >
            {/* Image */}
            <img
              src={card.img}
              alt={card.text}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
            />
            {/* Text Overlay */}
            <div className="absolute inset-0 bg-black bg-opacity-50 flex justify-center items-center text-white text-xl font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              {card.text}
            </div>
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default Home;
