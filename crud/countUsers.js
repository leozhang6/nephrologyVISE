import { MongoClient } from "mongodb";
import "dotenv/config";
const uri = process.env.MONGO_URI;
const client = new MongoClient(uri);

export async function countUsers() {
  var count = 0;
  try {
    // Connect to the MongoDB cluster
    await client.connect();

    const users = await client
      .db("nephrologyDB")
      .collection("users")
      .countDocuments({});
    count = users;
  } finally {
    // Close the connection to the MongoDB cluster
    await client.close();
    return count;
  }
}
