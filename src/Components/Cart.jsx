import React, { useEffect, useState } from "react";
import { Client, Databases, Query } from "appwrite";
import { useContext } from "react";
import AuthContext from "../utils/AuthContext"; // Adjust the path as per your structure
import { useCart } from "../utils/CartContext"; // Import CartContext

// Initialize Appwrite client
const client = new Client();
client.setEndpoint(import.meta.env.VITE_APPWRITE_ENDPOINT).setProject(import.meta.env.VITE_APPWRITE_PROJECT_ID);
const databases = new Databases(client);

const Cart = () => {
  const { user, loading } = useContext(AuthContext);
  const { cart, removeFromCart, clearCart } = useCart(); // Access CartContext
  const [cartItems, setCartItems] = useState([]);
  const [cartLoading, setCartLoading] = useState(true);

  useEffect(() => {
    if (loading || !user) return; // Wait for user to be loaded

    const fetchCartItems = async () => {
      try {
        setCartLoading(true);

        // Query cart items for the logged-in user
        const cartResponse = await databases.listDocuments(
          import.meta.env.VITE_DATABASE_ID, // Database ID
          "676e4a63000efb5da228", // Cart Collection ID
          [Query.equal("userId", user.$id)] // Match userId from context
        );

        const fetchedItems = [];
        for (const cartItem of cartResponse.documents) {
          try {
            const productResponse = await databases.getDocument(
              import.meta.env.VITE_DATABASE_ID, // Database ID
              cartItem.collectionId, // Collection ID from the cart document
              cartItem.productId // Product ID from the cart document
            );

            fetchedItems.push({
              ...productResponse,
              quantity: cartItem.quantity,
              documentId: cartItem.$id,
            });
          } catch (error) {
            console.error("Error fetching product details:", error.message);
          }
        }

        setCartItems(fetchedItems);
      } catch (error) {
        console.error("Error fetching cart items:", error.message);
      } finally {
        setCartLoading(false);
      }
    };

    fetchCartItems();
  }, [user, loading]);

  // Handle Increase Quantity
  const handleIncreaseQuantity = async (item) => {
    try {
      const updatedQuantity = item.quantity + 1;
      await updateCartQuantity(item.documentId, updatedQuantity); // Update quantity in CartContext
      setCartItems((prevItems) =>
        prevItems.map((i) =>
          i.productId === item.productId
            ? { ...i, quantity: updatedQuantity }
            : i
        )
      );
    } catch (error) {
      console.error("Error increasing quantity:", error.message);
    }
  };

  // Handle Decrease Quantity
  const handleDecreaseQuantity = async (item) => {
    try {
      const updatedQuantity = item.quantity - 1;
      if (updatedQuantity <= 0) {
        // If quantity is 0, remove the item from cart and database
        await removeItemFromCart(item);  // Call remove function directly
      } else {
        // Update the quantity in CartContext and database
        await updateCartQuantity(item.documentId, updatedQuantity);
        setCartItems((prevItems) =>
          prevItems.map((i) =>
            i.productId === item.productId
              ? { ...i, quantity: updatedQuantity }
              : i
          )
        );
      }
    } catch (error) {
      console.error("Error decreasing quantity:", error.message);
    }
  };

  // Update cart quantity in the database
  const updateCartQuantity = async (documentId, newQuantity) => {
    try {
      // Update the quantity in the cart database document
      await databases.updateDocument(
        import.meta.env.VITE_DATABASE_ID, // Database ID
        "676e4a63000efb5da228", // Cart Collection ID
        documentId, // Document ID
        { quantity: newQuantity } // New quantity
      );
    } catch (error) {
      console.error("Error updating cart quantity:", error.message);
    }
  };

  // Remove an item from the cart in both UI and database
  const removeItemFromCart = async (item) => {
    try {
      await removeFromCart(item.productId, item.documentId); // Remove from CartContext
      setCartItems((prevItems) =>
        prevItems.filter((i) => i.productId !== item.productId)
      );
      // Also remove the item from the database
      await databases.deleteDocument(
        import.meta.env.VITE_DATABASE_ID, // Database ID
        "676e4a63000efb5da228", // Cart Collection ID
        item.documentId // Document ID to delete
      );
    } catch (error) {
      console.error("Error removing item:", error.message);
    }
  };

  // Calculate the total cost of items in the cart
  const calculateTotal = () => {
    const subtotal = cartItems.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );
    const shippingCharge = 1; // Default shipping charge
    return subtotal + shippingCharge;
  };

  if (loading) {
    return <p>Loading user data...</p>;
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg">
        <h1 className="text-2xl font-bold border-b border-gray-200 p-6">Your Cart</h1>
        {cartLoading ? (
          <p className="p-6 text-gray-600">Loading cart...</p>
        ) : cartItems.length === 0 ? (
          <p className="p-6 text-gray-600">Your cart is empty.</p>
        ) : (
          <ul className="p-6 space-y-6">
            {cartItems.map((item) => (
              <li key={item.documentId} className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <img
                    src={item.imgUrl || "https://via.placeholder.com/150"}
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded"
                  />
                  <div>
                    <p className="text-lg font-semibold">{item.name}</p>
                    <p className="text-sm text-gray-600">Price: ${item.price}</p>
                    <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => handleDecreaseQuantity(item)}
                    className="text-gray-600 hover:text-gray-800"
                  >
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    onClick={() => handleIncreaseQuantity(item)}
                    className="text-gray-600 hover:text-gray-800"
                  >
                    +
                  </button>
                </div>
                <button
                  className="text-red-600 hover:text-red-700"
                  onClick={() => removeItemFromCart(item)}
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        )}
        <div className="border-t border-gray-200 p-6 flex justify-between items-center">
          <p className="text-lg font-semibold">Total: ${calculateTotal()}</p>
          <button
            className="bg-blue-600 text-white py-2 px-6 rounded hover:bg-blue-700"
            onClick={() => console.log("Proceed to checkout")}
          >
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
