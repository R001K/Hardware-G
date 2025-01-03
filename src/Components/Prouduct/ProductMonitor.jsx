import React, { useEffect, useState } from "react";
import { Client, Databases } from "appwrite";
import { Link } from "react-router-dom";


const client = new Client();
client.setEndpoint(import.meta.env.VITE_APPWRITE_ENDPOINT).setProject(import.meta.env.VITE_APPWRITE_PROJECT_ID);

const databases = new Databases(client);

const ProductMonitor = () => {
  const [cases, setCases] = useState([]);

  useEffect(() => {
    const fetchCases = async () => {
      try {
        const response = await databases.listDocuments(
          import.meta.env.VITE_DATABASE_ID, // Database ID
          import.meta.env.VITE_MONITOR_COLLECTION_ID
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
      <h1 className="text-3xl font-bold mb-6">Monitor</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        {cases.map((monitoritem) => (
          <Link to={`/Monitor/${monitoritem.$id}`} key={monitoritem.$id}>
            <div className="border rounded-lg p-4 shadow-lg hover:shadow-2xl transition-shadow duration-300">
              <img
                src={monitoritem.imgUrl || "https://via.placeholder.com/150"}
                alt={monitoritem.name}
                className="w-full h-40 object-cover rounded-md mb-4"
              />
              <h2 className="text-lg font-semibold">{monitoritem.name}</h2>
              <p className="text-gray-600 mt-2">${monitoritem.price}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ProductMonitor;
