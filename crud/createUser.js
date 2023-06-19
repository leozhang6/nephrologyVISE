import { MongoClient } from "mongodb";
import "dotenv/config";
const uri = process.env.MONGO_URI;
const client = new MongoClient(uri);

export async function createUser(newUser) {
  try {
    // Connect to the MongoDB cluster
    await client.connect();
    const result = await client
      .db("nephrologyDB")
      .collection("users")
      .insertOne(newUser);
    console.log("resulting id :" + result.insertedId);
  } finally {
    // Close the connection to the MongoDB cluster
    await client.close();
  }
}

await createUser().catch(console.error);
