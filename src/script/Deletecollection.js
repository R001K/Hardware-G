import { Client, Databases } from 'appwrite';

// Initialize the Appwrite client
const client = new Client();
const databases = new Databases(client);

// Set client configurations
client
  .setEndpoint(import.meta.env.VITE_APPWRITE_ENDPOINT)  // Appwrite endpoint
  .setProject(import.meta.env.VITE_APPWRITE_PROJECT_ID);          // Your Appwrite Project ID

// Set the API key in headers correctly
client.headers['X-Appwrite-Key'] = import.meta.env.VITE_APPWRITE_API_KEY

// Function to bulk delete documents with pagination
const bulkDeleteDocuments = async (databaseId, collectionId) => {
  try {
    let offset = 0;
    let limit = 50; // Adjust the limit as needed (Appwrite allows up to 100 by default)
    let documents;

    // Loop through all pages of documents
    do {
      // Fetch documents with pagination
      documents = await databases.listDocuments(databaseId, collectionId, [], limit, offset);
      console.log(`Fetched ${documents.documents.length} documents`);

      for (const document of documents.documents) {
        // Delete each document by its ID
        await databases.deleteDocument(databaseId, collectionId, document.$id);
        console.log(`Deleted document: ${document.$id}`);
      }

      // Update the offset for the next batch
      offset += limit;

    } while (documents.documents.length > 0); // Continue until no more documents are fetched

    console.log('All documents deleted successfully.');
  } catch (error) {
    console.error('Error deleting documents:', error.message);
  }
};

// Replace these placeholders with your database and collection IDs
const DATABASE_ID = import.meta.env.VITE_DATABASE_ID;  // Your Database ID
const COLLECTION_ID = import.meta.env.VITE_MOUSE_COLLECTION_ID; // Your Collection ID

// Call the function to delete all documents
bulkDeleteDocuments(DATABASE_ID, COLLECTION_ID);
