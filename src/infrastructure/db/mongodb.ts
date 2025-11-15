import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;

if (!uri) {
  throw new Error("Please add your Mongo URI to .env.local");
}

const options = {};

declare global {
  // eslint-disable-next-line no-var
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

let clientPromise: Promise<MongoClient>;

if (process.env.NODE_ENV === "development") {
  // In development, cache with global to survive HMR reloads
  if (!global._mongoClientPromise) {
    const client = new MongoClient(uri, options);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  // In production / build → lazy connection (connect ONLY when awaited at runtime)
  const client = new MongoClient(uri, options);

  clientPromise = {
    then(onFulfilled?: (value: MongoClient) => any, onRejected?: (reason: any) => any) {
      return client.connect().then(onFulfilled, onRejected);
    },
    catch(onRejected?: (reason: any) => any) {
      return client.connect().catch(onRejected);
    },
    finally(onFinally?: () => any) {
      return client.connect().finally(onFinally);
    },
  } as Promise<MongoClient>;
}

export const connectToDatabase = async (dbName = "test") => {
  const connectedClient = await clientPromise;
  return connectedClient.db(dbName);
};

// Needed for NextAuth MongoDBAdapter
export default clientPromise;
