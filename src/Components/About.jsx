import React, { useEffect, useState } from "react";
import axios from "axios";

const About = () => {
  const [deepakData, setDeepakData] = useState(null);
  const [ro001kData, setRo001kData] = useState(null);

  useEffect(() => {
    // Fetch data for Deepak G
    axios
      .get("https://api.github.com/users/DeepakG45")
      .then((response) => setDeepakData(response.data))
      .catch((error) => console.error("Error fetching Deepak's GitHub data:", error));

    // Fetch data for R001K
    axios
      .get("https://api.github.com/users/R001K")
      .then((response) => setRo001kData(response.data))
      .catch((error) => console.error("Error fetching R001K's GitHub data:", error));
  }, []);

  if (!deepakData || !ro001kData) {
    return <div className="text-center text-xl text-[#0a2351]">Loading...</div>;
  }

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Header */}
      <div className="bg-[#0a2351] text-white p-8 rounded-xl shadow-2xl text-center">
        <h1 className="text-5xl font-bold">About Us</h1>
        <p className="text-lg mt-4">
          Welcome to Hardware-G, your one-stop solution for all your hardware component needs!
        </p>
      </div>

      {/* Mission Section */}
      <section className="bg-[#f3b300] text-[#0a2351] p-8 mt-8 rounded-xl shadow-lg">
        <h2 className="text-4xl font-semibold text-center">Our Mission</h2>
        <p className="mt-4 text-lg leading-relaxed text-center">
          Our goal is to create a seamless and engaging shopping experience for users looking for quality hardware components. 
          Hardware-G brings together the best hardware, offers clear specifications, and ensures smooth transactions, 
          all while providing educational content on each component's importance.
        </p>
      </section>

      {/* Team Section */}
      <section className="mt-8">
        <h2 className="text-4xl font-semibold text-center text-[#0a2351]">Meet the Team</h2>
        
        <div className="flex flex-col lg:flex-row gap-8 mt-8">
          {/* Deepak G */}
          <div className="flex items-center gap-8 p-6 bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300">
            <img
              src={deepakData.avatar_url}
              alt="Deepak's Avatar"
              className="w-36 h-36 rounded-full object-cover"
            />
            <div>
              <h3 className="text-2xl font-semibold text-[#0a2351]">Deepak G</h3>
              <a
                href="https://github.com/DeepakG45"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#f3b300] font-semibold hover:text-yellow-400"
              >
                GitHub Profile
              </a>
              <p className="mt-2 text-[#333]">{deepakData.bio}</p>
              <p className="mt-2 text-[#555]">Location: {deepakData.location || "N/A"}</p>
              <p className="mt-1 text-[#555]">Followers: {deepakData.followers} | Following: {deepakData.following}</p>
            </div>
          </div>

          {/* R001K */}
          <div className="flex items-center gap-8 p-6 bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300">
            <img
              src={ro001kData.avatar_url}
              alt="R001K's Avatar"
              className="w-36 h-36 rounded-full object-cover"
            />
            <div>
              <h3 className="text-2xl font-semibold text-[#0a2351]">R001K</h3>
              <a
                href="https://github.com/R001K"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#f3b300] font-semibold hover:text-yellow-400"
              >
                GitHub Profile
              </a>
              <p className="mt-2 text-[#333]">{ro001kData.bio}</p>
              <p className="mt-2 text-[#555]">Location: {ro001kData.location || "N/A"}</p>
              <p className="mt-1 text-[#555]">Followers: {ro001kData.followers} | Following: {ro001kData.following}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Technologies Section */}
      <section className="bg-[#0a2351] text-white p-8 mt-8 rounded-xl shadow-lg">
        <h2 className="text-4xl font-semibold text-center">Technologies Used</h2>
        <ul className="list-disc list-inside mt-4 text-lg">
          <li>Frontend: React, Vite</li>
          <li>Backend: Node.js, Appwrite</li>
          <li>Design: Custom UI based on a yellow and blue theme for consistency and user experience</li>
        </ul>
      </section>

      {/* Footer */}
      <section className="mt-8 text-center">
        <p className="text-lg text-[#333]">Thanks for visiting Hardware-G, and we hope you enjoy shopping with us!</p>
      </section>
    </div>
  );
};

export default About;
