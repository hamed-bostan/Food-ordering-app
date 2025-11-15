// infrastructure/db/mongodb.ts
import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;

declare global {
  // eslint-disable-next-line no-var
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

let clientPromise: Promise<MongoClient>;

if (!uri) {
  // Only throw in development — never in build or production
  if (process.env.NODE_ENV !== "production") {
    throw new Error("Please add your Mongo URI to .env.local");
  }

  // In build time: create a fake promise that never resolves
  clientPromise = new Promise((_, reject) => {
    reject(new Error("MONGODB_URI not set"));
  });
} else {
  const client = new MongoClient(uri);

  if (process.env.NODE_ENV === "development") {
    // In dev: cache connection across hot reloads
    if (!global._mongoClientPromise) {
      global._mongoClientPromise = client.connect();
    }
    clientPromise = global._mongoClientPromise;
  } else {
    // In production & build: **lazy connection** — only connect when awaited
    clientPromise = {
      then(onFulfilled: any, onRejected: any) {
        return client.connect().then(onFulfilled, onRejected);
      },
      catch(onRejected: any) {
        return client.connect().catch(onRejected);
      },
      finally(onFinally: any) {
        return client.connect().finally(onFinally);
      },
    } as Promise<MongoClient>;
  }
}

export const connectToDatabase = async (dbName = "test") => {
  const client = await clientPromise;
  return client.db(dbName);
};

export default clientPromise;
