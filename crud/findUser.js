import { MongoClient } from "mongodb";
import "dotenv/config";
const uri = process.env.MONGO_URI;
const client = new MongoClient(uri);

export async function findUser(userId) {
  var exists = false;
  try {
    // Connect to the MongoDB cluster

    await client.connect();
    const result = await client
      .db("nephrologyDB")
      .collection("users")
      .findOne({ _id: userId });
    (async () => {
      if (result) {
        exists = true;
      } else {
        exists = false;
      }
    })();
  } finally {
    // Close the connection to the MongoDB cluster
    await client.close();
    return exists;
  }
}
