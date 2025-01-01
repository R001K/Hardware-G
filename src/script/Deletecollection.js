import { Client, Databases } from 'appwrite';

// Initialize the Appwrite client
const client = new Client();
const databases = new Databases(client);

// Set client configurations
client
  .setEndpoint('https://cloud.appwrite.io/v1')  // Appwrite endpoint
  .setProject('6746052c001ebc1e13ec');          // Your Appwrite Project ID

// Set the API key in headers correctly
client.headers['X-Appwrite-Key'] = 'standard_5cea37ca3b59bf363c186eb5b8beca2977979e6cbf30efd9f8a92da460bd7f54c2710784aac5593e9e8da773824edd748b764d1706476c04ed93a7f6ee10cd4fb6dbcc1818eda8740180906dc85c5f1051f15be5f6167a565da31ea4784c43f27ab1ee8f9cebe6223141e68aad0a48857b6b2dac6b5648e6e3b35a3fabadfcc7'; // Your API Key

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
const DATABASE_ID = '675bcd71002a456f4295';  // Your Database ID
const COLLECTION_ID = '675bd372002cc4d01082'; // Your Collection ID

// Call the function to delete all documents
bulkDeleteDocuments(DATABASE_ID, COLLECTION_ID);
