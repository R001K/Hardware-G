import React, { useEffect, useState } from "react";
import { Client, Databases } from "appwrite";
import { Link } from "react-router-dom";

const client = new Client();
client.setEndpoint(import.meta.env.VITE_APPWRITE_ENDPOINT).setProject(import.meta.env.VITE_APPWRITE_PROJECT_ID);

const databases = new Databases(client);

const ProductKeyboard = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await databases.listDocuments(
          import.meta.env.VITE_DATABASE_ID, // Database ID
          import.meta.env.VITE_KEYBOARD_COLLECTION_ID // Collection ID
        );

        // Assuming your collection has an 'imageUrl' field for each product
        const productsWithImage = response.documents.map((product) => ({
          ...product,
          imageUrl: product.imageId || "https://via.placeholder.com/150", // Fallback to placeholder if no imageUrl
        }));

        setProducts(productsWithImage);
      } catch (error) {
        console.error("Error fetching products:", error.message);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="bg-white p-6">
      <h1 className="text-3xl font-bold mb-6">Keyboards</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        {products.map((product) => (
          <Link to={`/KeyBord/${product.$id}`} key={product.$id}>
            <div className="border rounded-lg p-4 shadow-lg hover:shadow-2xl transition-shadow duration-300">
              <img
                src={product.imageUrl} // Dynamically using the imageUrl from the product
                alt={product.name}
                className="w-full h-40 object-cover rounded-md mb-4"
                onError={(e) => (e.target.src = "https://via.placeholder.com/150")} // Fallback image in case of error
              />
              <h2 className="text-lg font-semibold">{product.name}</h2>
              <p className="text-gray-600 mt-2">${product.price}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ProductKeyboard;
