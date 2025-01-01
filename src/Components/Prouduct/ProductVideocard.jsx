import React, { useEffect, useState } from "react";
import { Client, Databases } from "appwrite";
import { Link } from "react-router-dom";


const client = new Client();
client.setEndpoint("https://cloud.appwrite.io/v1").setProject("6746052c001ebc1e13ec");

const databases = new Databases(client);

const ProductVideocard = () => {
  const [cases, setCases] = useState([]);

  useEffect(() => {
    const fetchCases = async () => {
      try {
        const response = await databases.listDocuments(
          "675bcd71002a456f4295", // Database ID
          "676e7d93002f49c298bd"
        );
        setCases(response.documents);
      } catch (error) {
        console.error("Error fetching cases:", error.message);
      }
    };

    fetchCases();
  }, []);

  return (
    <div className="bg-white p-6">
      <h1 className="text-3xl font-bold mb-6">VIDEO-CARD</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        {cases.map((GPU) => (
          <Link to={`/VideoCard/${GPU.$id}`} key={GPU.$id}>
            <div className="border rounded-lg p-4 shadow-lg hover:shadow-2xl transition-shadow duration-300">
              <img
                src={GPU.imgUrl || "https://via.placeholder.com/150"}
                alt={GPU.name}
                className="w-full h-40 object-cover rounded-md mb-4"
              />
              <h2 className="text-lg font-semibold">{GPU.name}</h2>
              <p className="text-gray-600 mt-2">${GPU.price}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ProductVideocard;
