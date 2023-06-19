import { MongoClient } from "mongodb";
import "dotenv/config";
const uri = process.env.MONGO_URI;
const client = new MongoClient(uri);

export async function updateTokens(prevAuth, newAuth, newRefresh) {
  try {
    // Connect to the MongoDB cluster
    await client.connect();
    const result = await client
      .db("nephrologyDB")
      .collection("users")
      .findOneAndUpdate(
        { authToken: prevAuth },
        { $set: { authToken: newAuth, refreshToken: newRefresh } },
        { returnDocument: "after" }
      );
    (async () => {
      console.log("new auth :" + result.authToken);
    })();
  } finally {
    // Close the connection to the MongoDB cluster
    await client.close();
  }
}

await updateTokens().catch(console.error);
