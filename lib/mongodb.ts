import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI!;
let client: MongoClient | null = null;
let clientPromise: Promise<MongoClient> | null = null;

export async function connectToDatabase() {
  try {
    if (!clientPromise) {
      client = new MongoClient(uri);
      clientPromise = client.connect();
    }

    const connectedClient = await clientPromise;
    console.log("Connected to MongoDB");
    return { client: connectedClient };
  } catch (error) {
    console.error("MongoDB connection error:", error);
    throw new Error("Database connection failed");
  }
}

// Cleanup function to close the MongoDB connection
export async function closeDatabaseConnection() {
  if (client) {
    await client.close();
    client = null;
    clientPromise = null;
    console.log("MongoDB connection closed.");
  }
}

// Handle process termination to close the connection
process.on("SIGINT", async () => {
  await closeDatabaseConnection();
  process.exit(0);
});

process.on("SIGTERM", async () => {
  await closeDatabaseConnection();
  process.exit(0);
});
