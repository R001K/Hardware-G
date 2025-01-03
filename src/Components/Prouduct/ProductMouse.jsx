import React, { useEffect, useState } from "react";
import { Client, Databases } from "appwrite";
import { Link } from "react-router-dom";
import mouseImage from "../../assets/homeimg/mouse.jpg";

const client = new Client();
client.setEndpoint(import.meta.env.VITE_APPWRITE_ENDPOINT).setProject(import.meta.env.VITE_APPWRITE_PROJECT_ID);

const databases = new Databases(client);

const ProductMouse = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await databases.listDocuments(
          import.meta.env.VITE_DATABASE_ID, // Database ID
          import.meta.env.VITE_MOUSE_COLLECTION_ID // Collection ID
        );
        setProducts(response.documents);
      } catch (error) {
        console.error("Error fetching products:", error.message);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="bg-white p-6">
  <h1 className="text-3xl font-bold mb-6">Mice</h1>
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
    {products.map((product) => (
      <Link to={`/product/${product.$id}`} key={product.$id}>
        <div className="border rounded-lg p-4 shadow-lg hover:shadow-2xl transition-shadow duration-300">
          <img
            src={product.imgUrl || "https://via.placeholder.com/150"}
            alt={product.name}
            className="w-full h-40 object-contain rounded-md mb-4" // object-contain to prevent cropping
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

export default ProductMouse;
