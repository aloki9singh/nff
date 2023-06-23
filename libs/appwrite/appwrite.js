import { Client } from 'appwrite';

const appwriteClient = new Client();

appwriteClient
  .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT)
  .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID);

export default appwriteClient;

export const databaseId = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID;
export const chatGroupsCollectionId = process.env.NEXT_PUBLIC_CHATGROUPS_COLLECTION_ID;
export const schoolsCollectionId = process.env.NEXT_PUBLIC_SCHOOLS_COLLECTION_ID;
