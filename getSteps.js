import FitbitApiClient from "fitbit-node";
import { getUsers } from "./crud/getUsers.js";
import "dotenv/config";

const client = new FitbitApiClient({
  clientId: "23QXT3",
  clientSecret: process.env.FITBIT_CLIENT_SECRET,
  apiVersion: "1.2",
});

export async function getSteps() {
  const users = await getUsers();
  for (let i = 0; i < users.length; i++) {
    const authToken = users[i].authToken;
    const userId = users[i].userId;
    client
      .get("/activities/steps/date/2023-06-07/1d.json", authToken, userId)
      .then((results) => {
        console.log(results[0]);
      })
      .catch((err) => {
        console.log(err);
      });
  }
}
