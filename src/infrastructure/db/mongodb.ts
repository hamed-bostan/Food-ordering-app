import { MongoClient } from "mongodb";

const options = {};

declare global {
  // eslint-disable-next-line no-var
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

if (process.env.NODE_ENV === "development") {
  // ────────────────────── DEVELOPMENT ONLY ──────────────────────
  if (!process.env.MONGODB_URI) {
    throw new Error("Please add your Mongo URI to .env.local");
  }

  const uri = process.env.MONGODB_URI;

  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, options);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  // ────────────────────── PRODUCTION / BUILD ──────────────────────
  // During GitHub Actions build → NODE_ENV=production and MONGODB_URI is not set
  // → we MUST NOT throw and MUST NOT try to connect, or the build fails
  if (!process.env.MONGODB_URI) {
    // Create a promise that instantly rejects → build passes, runtime will 500 if used
    clientPromise = Promise.reject(new Error("MONGODB_URI is not set in production environment"));
  } else {
    // Real production (Docker on VPS) → env var is injected via docker-compose → works normally
    client = new MongoClient(process.env.MONGODB_URI, options);
    clientPromise = client.connect();
  }
}

export const connectToDatabase = async (dbName = "test") => {
  const connectedClient = await clientPromise;
  return connectedClient.db(dbName);
};

// Needed for NextAuth adapter
export default clientPromise;
