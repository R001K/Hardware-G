import React from "react";
import mouseImage from "../assets/homeimg/mouse.jpg";
import Keybord from "../assets/homeimg/Keybord.jpg"
import Microphone from "../assets/homeimg/Mic.jpg"
import Mousepad from "../assets/homeimg/MPad.jpg"




const Home = () => {
  const cards = [
    { id: 1, img: mouseImage, text: "Mouse" },
    { id: 2, img: Keybord, text: "Keyboard" },
    { id: 3, img: Microphone, text: "Mic" },
    { id: 4, img: Mousepad, text: "Mousepad" },
  ];

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-[#0a2351] text-center mb-8">Our Products</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {cards.map((card) => (
          <div
            key={card.id}
            className="relative group rounded-lg overflow-hidden shadow-lg bg-white"
          >
            {/* Image */}
            <img
              src={card.img}
              alt={card.text}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
            />
            {/* Text on Image */}
            <div className="absolute top-0 left-0 right-0 bottom-0 bg-black bg-opacity-50 flex justify-center items-center text-white text-xl font-semibold">
              {card.text}
            </div>
            {/* Text Below Image */}
            <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-60 p-2 text-white text-center">
              {card.text}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
