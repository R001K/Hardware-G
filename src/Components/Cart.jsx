import React, { useState, useContext, useEffect } from "react";
import AuthContext from "../utils/AuthContext"; // Adjust path as needed
import { Client, Databases, Query } from "appwrite"; // Import Query

const client = new Client();
client.setEndpoint("https://cloud.appwrite.io/v1").setProject("6746052c001ebc1e13ec");
const databases = new Databases(client);

const Cart = () => {
  const { user, loading } = useContext(AuthContext); // Access the logged-in user from context
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const fetchCartItems = async () => {
      if (user) {
        try {
          // Fetch cart items for the logged-in user
          const response = await databases.listDocuments(
            "675bcd71002a456f4295",  // Database ID
            "675bd372002cc4d01082", // Collection ID
            [Query.equal("userId", user.$id)] // Filter by userId
          );
          setCartItems(response.documents);
        } catch (error) {
          console.error("Error fetching cart items:", error.message);
        }
      }
    };

    fetchCartItems();
  }, [user]);

  const handleRemoveFromCart = async (productId) => {
    try {
      // Find the cart item using productId instead of the document ID
      const itemToRemove = cartItems.find(item => item.productId === productId);
      
      if (itemToRemove) {
        // Delete the item based on the productId
        await databases.deleteDocument(
          "675bcd71002a456f4295", // Database ID
          "675bd372002cc4d01082", // Collection ID
          itemToRemove.$id // Document ID to delete
        );

        // Remove the item from the local cart state
        setCartItems(cartItems.filter(item => item.productId !== productId));
      }
    } catch (error) {
      console.error("Error removing item from cart:", error.message);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (!user) return <div>Please log in to view your cart.</div>; // Show message if user is not logged in

  return (
    <div className="min-h-screen bg-white p-6">
      <h1 className="text-3xl font-bold mb-4">Your Cart</h1>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div>
          <ul>
            {cartItems.map((item) => (
              <li key={item.$id} className="flex justify-between items-center mb-4">
                <div>
                  <p className="font-semibold">{item.name}</p>
                  <p className="text-sm text-gray-600">${item.price}</p>
                  <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                </div>
                <button
                  onClick={() => handleRemoveFromCart(item.productId)}
                  className="text-red-600 hover:text-red-700"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
          {/* Add additional functionality, like total price and checkout buttons */}
        </div>
      )}
    </div>
  );
};

export default Cart;
