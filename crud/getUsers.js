import { MongoClient } from "mongodb";
import "dotenv/config";
const uri = process.env.MONGO_URI;
const client = new MongoClient(uri);

export async function getUsers() {
  var usersData = {};
  try {
    // Connect to the MongoDB cluster
    await client.connect();

    const users = await client
      .db("nephrologyDB")
      .collection("users")
      .find({})
      .toArray();
    usersData = users;
  } finally {
    // Close the connection to the MongoDB cluster
    await client.close();
    return usersData;
  }
}

// await getUsers().catch(console.error);
