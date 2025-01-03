import { Client, Databases, ID } from "node-appwrite";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// ES Module-specific handling for __dirname and __filename
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Initialize Appwrite Client
const client = new Client();
client
  .setEndpoint(import.meta.env.VITE_APPWRITE_ENDPOINT) // Appwrite endpoint
  .setProject(import.meta.env.VITE_APPWRITE_PROJECT_ID) // Your project ID
  .setKey(import.meta.env.VITE_APPWRITE_API_KEY); // API key from environment variable

const databases = new Databases(client);

// IDs for database and collection
const databaseId = import.meta.env.VITE_DATABASE_ID; // Replace with your database ID
const collectionId = import.meta.env.VITE_CASE_COLLECTION_ID; // Replace with your collection ID

// Path to JSON file
const jsonFilePath = path.join(__dirname, "../assets/Database/case.json");
const products = JSON.parse(fs.readFileSync(jsonFilePath, "utf8")); // Parse JSON file

// Starting value for productId
let productIdCounter = 100;

// Async function to upload data
(async () => {
  const productsToUpload = products.slice(0, 30); // Only upload the first 30 products
  
  for (const product of productsToUpload) {
    try {
      // Add productId to product data
      product.productId = String(productIdCounter);
      product.price = String(product.price);
      // product.microphone = String(product.microphone);
      // product.wireless = String(product.wireless);


      // Remove unwanted fields (for example: `color`, `price`)
      delete product.psu; // Ignore price
       delete product.side_panel;
       delete product.external_volume;
       delete product.internal_35_bays;

      // Increment the productId counter for the next product
      productIdCounter++;

      const response = await databases.createDocument(
        databaseId,
        collectionId,
        ID.unique(), // Generate a unique ID for each document
        product
      );
      console.log(`Uploaded: ${response.name}`);
    } catch (error) {
      console.error(`Failed to upload ${product.name}:`, error.message);
    }
  }
})();
