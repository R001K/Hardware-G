import { Client, Account } from 'appwrite';

const client = new Client();
client
  .setEndpoint('https://cloud.appwrite.io/v1') 
  .setProject('6746052c001ebc1e13ec');

export const account = new Account(client);
