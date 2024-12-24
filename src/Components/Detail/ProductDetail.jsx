import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { Client, Databases } from "appwrite";
import AuthContext from "../../utils/AuthContext";

// Initialize Appwrite Client
const client = new Client();
client.setEndpoint("https://cloud.appwrite.io/v1").setProject("6746052c001ebc1e13ec");
const databases = new Databases(client);

const ProductDetail = () => {
  const { productId } = useParams(); // Get product ID from the URL
  const [product, setProduct] = useState(null);
  const [isInCart, setIsInCart] = useState(false);
  const [cartItems, setCartItems] = useState([]); // State to hold cart items

  const { user, loading } = useContext(AuthContext); // Access AuthContext

  useEffect(() => {
    // Fetch product details
    const fetchProduct = async () => {
      try {
        const response = await databases.getDocument(
          "675bcd71002a456f4295", // Database ID
          "675bd372002cc4d01082", // Collection ID
          productId // Document (Product) ID, but here we're using name for the product
        );
        setProduct(response);
        // Check if product is already in the cart
        setIsInCart(cartItems.some((item) => item.name === response.name)); // Use name as unique identifier
      } catch (error) {
        console.error("Error fetching product:", error.message);
      }
    };

    fetchProduct();
  }, [productId, cartItems]);

  const handleCartToggle = async () => {
    // Keep the productId as a string (no need to convert to float)
    const sanitizedProductId = String(product?.productId).substring(0, 225); // Ensure it's a string and within 225 chars
    
    // Check if the conversion was successful
    if (!sanitizedProductId) {
      console.error("Invalid productId format. It must be a valid string.");
      return;
    }
  
    if (isInCart) {
      const updatedCartItems = cartItems.filter((item) => item.productId !== sanitizedProductId);
      setCartItems(updatedCartItems);
      try {
        await databases.deleteDocument(
          "675bcd71002a456f4295", // Database ID
          "675bd372002cc4d01082", // Collection ID
          sanitizedProductId // Pass productId as a string
        );
      } catch (error) {
        console.error("Error removing item from cart:", error.message);
      }
    } else {
      const newItem = {
        userId: user.$id,
        productId: sanitizedProductId, // Use the sanitized productId as a string
        name: product?.name || "Default Name",
        price: parseFloat(product?.price) || 0,
        tracking_method: product.tracking_method || "None",
        connection_type: product?.connection_type || "None",
        max_dpi: product?.max_dpi || "None",
        hand_orientation: product?.hand_orientation || "None",
        color: product?.color || "None",
      };
  
      try {
        await databases.createDocument(
          "675bcd71002a456f4295",
          "675bd372002cc4d01082",
          sanitizedProductId, // Use sanitized productId (as string)
          newItem
        );
        setCartItems([...cartItems, newItem]);
      } catch (error) {
        console.error("Error adding item to cart:", error.message);
      }
    }
  
    setIsInCart(!isInCart);
  };
  
  
  if (!product || loading) return <div>Loading...</div>;

  const {
    name = "Default Name",
    price = "0.00",
    tracking_method = "None",
    connection_type = "None",
    max_dpi = "None",
    hand_orientation = "Right-Handed",
    color = "None",
    imageUrl = "https://via.placeholder.com/600",
  } = product;

  return (
    <div className="min-h-screen bg-white p-6">
      <div className="flex flex-col md:flex-row gap-8 max-w-6xl mx-auto">
        {/* Product Image */}
        <div className="w-full md:w-1/2">
          <img
            src={imageUrl}
            alt={name}
            className="w-full h-full object-cover rounded-lg shadow-lg"
          />
        </div>

        {/* Product Details */}
        <div className="w-full md:w-1/2 flex flex-col">
          <h1 className="text-4xl font-bold mb-4">{name}</h1>
          <p className="text-green-600 mb-4 text-xl">${price}</p>

          {/* Product Table */}
          <div className="border border-gray-300 rounded-lg p-4 bg-gray-50 shadow-lg">
            <table className="table-auto w-full text-gray-700 mb-6">
              <thead>
                <tr>
                  <th className="px-4 py-2 text-left">Attribute</th>
                  <th className="px-4 py-2 text-left">Details</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="px-4 py-2 font-semibold">Tracking Method</td>
                  <td className="px-4 py-2">{tracking_method}</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 font-semibold">Connectivity Type</td>
                  <td className="px-4 py-2">{connection_type}</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 font-semibold">Max DPI</td>
                  <td className="px-4 py-2">{max_dpi}</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 font-semibold">Hand Orientation</td>
                  <td className="px-4 py-2">{hand_orientation}</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 font-semibold">Color</td>
                  <td className="px-4 py-2">{color}</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Buttons at the Bottom */}
          <div className="mt-auto flex gap-4">
            <button
              onClick={user ? handleCartToggle : undefined}
              disabled={!user}
              className={`px-6 py-3 rounded-md text-lg focus:outline-none transition ${
                user
                  ? isInCart
                    ? "bg-red-600 hover:bg-red-700 text-white"
                    : "bg-blue-600 hover:bg-blue-700 text-white"
                  : "bg-gray-400 cursor-not-allowed"
              }`}
            >
              {isInCart ? "Remove from Cart" : "Add to Cart"}
            </button>
            <button
              disabled={!user}
              className={`px-6 py-3 rounded-md text-lg focus:outline-none transition ${
                user
                  ? "bg-green-600 hover:bg-green-700 text-white"
                  : "bg-gray-400 cursor-not-allowed"
              }`}
            >
              Buy Now
            </button>
          </div>
          {!user && (
            <p className="text-red-500 mt-4">Please log in to add to cart or purchase.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
