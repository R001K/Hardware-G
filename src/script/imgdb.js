import { Client, Databases, Storage, Query } from "appwrite";

// Initialize Appwrite Client
const client = new Client();
client
  .setEndpoint("https://cloud.appwrite.io/v1") // Your Appwrite Endpoint
  .setProject("6746052c001ebc1e13ec"); // Your Project ID

// Initialize Database and Storage
const databases = new Databases(client);
const storage = new Storage(client);

const updateMouseCollection = async () => {
  const bucketId = "67763e26001fab38abd4"; // Your bucket ID
  const databaseId = "675bcd71002a456f4295"; // Your database ID
  const mouseCollectionId = "676e7d93002f49c298bd"; // Your mouse collection ID

  try {
    // Fetch all files from the bucket
    const files = await storage.listFiles(bucketId);
    console.log("All file names in bucket:", files.files.map(file => file.name));

    // Filter files starting with 'g' (like g1.jpg, g2.jpg, g3.jpg, etc.)
    const mouseImages = files.files.filter(file => /^g\d+/.test(file.name));
    console.log("Filtered mouse images:", mouseImages);

    // Check if there are any matching images
    if (mouseImages.length === 0) {
      console.log("No images found that match the pattern.");
      return; // Early return if no images found
    }

    // Loop through productIds from 4000 to 4029
    for (let i = 4000; i <= 4029; i++) {
      const productId = i.toString();

      // Query the documents by productId field
      const documents = await databases.listDocuments(
        databaseId,
        mouseCollectionId,
        [Query.equal("productId", productId)]
      );

      if (documents.documents.length > 0) {
        const document = documents.documents[0]; // Assuming one document per productId
        const file = mouseImages[i - 4000]; // Corresponds to g1, g2, g3, etc.
        const imageUrl = `${"https://cloud.appwrite.io/v1"}/storage/buckets/${bucketId}/files/${file.$id}/view?project=${"6746052c001ebc1e13ec"}`;

        const updatedDocument = await databases.updateDocument(
          databaseId,
          mouseCollectionId,
          document.$id,
          { imgUrl: imageUrl }
        );

        console.log(`Updated productId ${productId} with URL:`, updatedDocument);
      } else {
        console.log(`No document found for productId ${productId}`);
      }
    }
  } catch (error) {
    console.error("Error updating mouse collection:", error.message);
  }
};

// Call the function
updateMouseCollection();
