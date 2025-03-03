import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI || "mongodb://localhost:27017/";
let client: MongoClient;

export async function connectToDatabase() {
  if (!client) {
    client = new MongoClient(uri);
    await client.connect();
  }
  const db = client.db("face-recognition");
  return { db, client };
}

// Cleanup function to close the MongoDB connection
export async function closeDatabaseConnection() {
  if (client) {
    await client.close();
    client = null as unknown as MongoClient;
  }
}

process.on("SIGINT", async () => {
  await closeDatabaseConnection();
  process.exit(0);
});

process.on("SIGTERM", async () => {
  await closeDatabaseConnection();
  process.exit(0);
});
