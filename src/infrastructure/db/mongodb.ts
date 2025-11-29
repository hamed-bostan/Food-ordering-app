// infrastructure/db/mongodb.ts
import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;

declare global {
  // eslint-disable-next-line no-var
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

let clientPromise: Promise<MongoClient>;

if (!uri) {
  console.warn("MONGODB_URI not set. Using mock client for build/production.");

  // Mock client that resolves without throwing
  clientPromise = Promise.resolve({
    db: (dbName: string) => ({
      collection: (colName: string) => ({
        findOne: async () => null,
        insertOne: async () => ({ insertedId: "mock-id" }),
        updateOne: async () => ({}),
        deleteMany: async () => ({}),
      }),
    }),
  } as unknown as MongoClient);
} else {
  const client = new MongoClient(uri);

  if (process.env.NODE_ENV === "development") {
    // In dev: cache connection across hot reloads
    if (!global._mongoClientPromise) {
      global._mongoClientPromise = client.connect();
    }
    clientPromise = global._mongoClientPromise;
  } else {
    // In production & build: lazy connection
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
