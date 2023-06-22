const sdk = require('node-appwrite');

const client = new sdk.Client();
export const users = new sdk.Users(client);

client
  .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID)
  .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID)
  .setKey(process.env.NEXT_PUBLIC_APPWRITE_KEY); // Your secret API key

