import { Client, Account, Databases, Storage, ID } from "appwrite";

const client = new Client();
client
  .setEndpoint("https://fra.cloud.appwrite.io/v1") // Appwrite endpoint
  .setProject("68565fb4002fd0944a5d"); // Replace with your Project ID

export const account = new Account(client);
export const databases = new Databases(client);
export const storage = new Storage(client);
export const ID_ = ID;
