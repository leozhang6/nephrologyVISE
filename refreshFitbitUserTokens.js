import { getUsers } from "./crud/getUsers.js";
import FitbitApiClient from "fitbit-node";
import { updateTokens } from "./crud/updateTokens.js";
import "dotenv/config";

const client = new FitbitApiClient({
  clientId: "23QXT3",
  clientSecret: process.env.FITBIT_CLIENT_SECRET,
  apiVersion: "1.2",
});

export async function refreshUserTokens() {
  const users = await getUsers();
  for (let i = 0; i < users.length; i++) {
    const prevAuth = users[i].authToken;
    const prevRefresh = users[i].refreshToken;
    console.log(i + " prevAuth: " + prevAuth);
    client.refreshAccessToken(prevAuth, prevRefresh).then((result) => {
      let newAuth = result.access_token;
      let newRefresh = result.refresh_token;
      updateTokens(prevAuth, newAuth, newRefresh);
    });
  }
}
