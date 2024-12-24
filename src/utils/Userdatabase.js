import { Databases } from "appwrite";

const databases = new Databases(client);

const updateCart = async (userId, cartItems) => {
  try {
    // Check if a cart exists for the user
    const cartQuery = await databases.listDocuments(
      "databaseId",
      "cartCollectionId",
      [`equal("userId", "${userId}")`]
    );

    if (cartQuery.total > 0) {
      // Update existing cart
      await databases.updateDocument(
        "databaseId",
        "cartCollectionId",
        cartQuery.documents[0].$id,
        { items: cartItems }
      );
    } else {
      // Create a new cart
      await databases.createDocument(
        "databaseId",
        "cartCollectionId",
        "unique()",
        { userId, items: cartItems }
      );
    }
    console.log("Cart updated successfully");
  } catch (error) {
    console.error("Error updating cart:", error.message);
  }
};
