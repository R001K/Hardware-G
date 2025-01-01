import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { Client, Databases, Query } from "appwrite";
import AuthContext from "../../utils/AuthContext";

// Initialize Appwrite Client
const client = new Client();
client.setEndpoint("https://cloud.appwrite.io/v1").setProject("6746052c001ebc1e13ec");
const databases = new Databases(client);

const CaseDetail = () => {
  const { productId } = useParams(); // Get product ID from the URL
  const [product, setProduct] = useState(null);
  const [isInCart, setIsInCart] = useState(false);

  const { user, loading } = useContext(AuthContext); // Access AuthContext

  // Fetch product details and check if it's already in the cart
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await databases.getDocument(
          "675bcd71002a456f4295", // Database ID
          "676e7eff00240de2a059", // Collection ID
          productId // Document (Product) ID
        );
        setProduct(response);

        // Check if product is already in the cart
        if (user) {
          const cartCheck = await databases.listDocuments(
            "675bcd71002a456f4295", // Replace with your cart database ID
            "676e4a63000efb5da228", // Replace with your cart collection ID
            [
              Query.equal("userId", user.$id),
              Query.equal("productId", productId)
            ]
          );

          setIsInCart(cartCheck.documents.length > 0);
        }
      } catch (error) {
        console.error("Error fetching product or cart check:", error.message);
      }
    };

    if (!loading) fetchProduct();
  }, [productId, user, loading]);

  const addToCart = async () => {
    if (!user) return;

    const cartItem = {
      userId: user.$id,
      productId: product.$id,
      collectionId: "676e7eff00240de2a059",
      quantity: 1, // Default quantity
    };

    try {
      const response = await databases.createDocument(
        "675bcd71002a456f4295", // Replace with your cart database ID
        "676e4a63000efb5da228", // Replace with your cart collection ID
        "unique()", // Let Appwrite generate a unique ID
        cartItem
      );
      console.log("Item added to cart:", response);
      setIsInCart(true);
    } catch (error) {
      console.error("Error adding to cart:", error.message);
    }
  };

  const removeFromCart = async () => {
    if (!user) return;

    try {
      const cartResponse = await databases.listDocuments(
        "675bcd71002a456f4295", // Replace with your cart database ID
        "676e4a63000efb5da228", // Replace with your cart collection ID
        [
          Query.equal("userId", user.$id),
          Query.equal("productId", product.$id)
        ]
      );

      if (cartResponse.documents.length > 0) {
        await databases.deleteDocument(
          "675bcd71002a456f4295",
          "676e4a63000efb5da228",
          cartResponse.documents[0].$id
        );
        setIsInCart(false);
      }
    } catch (error) {
      console.error("Error removing from cart:", error.message);
    }
  };

  const handleCartToggle = async () => {
    if (isInCart) {
      await removeFromCart();
    } else {
      await addToCart();
    }
  };

  if (!product || loading) return <div>Loading...</div>;

  const {
    name = "Default Name",
    price = "0.00",
    type = "Unknown",
    color = "Default Color",
    productId: productCode = "N/A",
    imgUrl = "https://via.placeholder.com/600",
  } = product;

  return (
    <div className="min-h-screen bg-white p-6">
      <div className="flex flex-col md:flex-row gap-8 max-w-6xl mx-auto">
        {/* Product Image */}
        <div className="w-full md:w-1/2">
          <img
            src={imgUrl} // Display imgUrl if available
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
                  <td className="px-4 py-2 font-semibold">Name</td>
                  <td className="px-4 py-2">{name}</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 font-semibold">Price</td>
                  <td className="px-4 py-2">{price}</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 font-semibold">Type</td>
                  <td className="px-4 py-2">{type}</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 font-semibold">Color</td>
                  <td className="px-4 py-2">{color}</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 font-semibold">Product ID</td>
                  <td className="px-4 py-2">{productCode}</td>
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

export default CaseDetail;
