import { Client, Account } from 'appwrite';

const client = new Client();
client
  .setEndpoint('https://cloud.appwrite.io/v1') // Your Appwrite endpoint
  .setProject('6746052c001ebc1e13ec'); // Your Appwrite project ID

export const account = new Account(client);
