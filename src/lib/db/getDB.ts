import clientPromise from "./mongodb";

export const getDb = async () => {
  const client = await clientPromise;
  return client.db(); // Optionally add db name here if needed, e.g. client.db('myDbName')
};
