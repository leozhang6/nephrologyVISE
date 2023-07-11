import FitbitApiClient from "fitbit-node";
import express from "express";
import { createUser } from "./crud/createUser.js";
import { scheduleJobs } from "./scheduler.js";
import { findUser } from "./crud/findUser.js";
import { countUsers } from "./crud/countUsers.js";
import * as url from "url";
import "dotenv/config";
const app = express();

const client = new FitbitApiClient({
  clientId: process.env.FITBIT_CLIENT_ID,
  clientSecret: process.env.FITBIT_CLIENT_SECRET,
  apiVersion: "1.2",
});

const __dirname = url.fileURLToPath(new URL(".", import.meta.url));

// await scheduleJobs();

// redirect the user to the Fitbit authorization page
app.get("/authorize::phoneNumber", (req, res) => {
  // request access to the user's activity, heartrate, location, nutrion, profile, settings, sleep, social, and weight scopes
  const phone = encodeURIComponent(req.params.phoneNumber);
  const redirect = client.getAuthorizeUrl(
    "activity heartrate location nutrition profile settings sleep social weight",
    "http://localhost:3001/callback",
    null,
    phone
  );
  res.redirect(redirect);
});

// handle the callback from the Fitbit authorization flow
app.get("/callback", (req, res) => {
  // exchange the authorization code we just received for an access token
  client
    .getAccessToken(req.query.code, "http://localhost:3001/callback")
    .then(async (result) => {
      var user = {};
      user.phoneNumber = decodeURIComponent(req.query.state);
      user._id = result.user_id;
      user.authToken = result.access_token;
      user.refreshToken = result.refresh_token;
      user.patientNum = (await countUsers()) + 1;
      if ((await findUser(user._id)) == false) {
        createUser(user);
      } else {
        console.log("user already authorized");
      }
      res.sendFile(__dirname + "/index.html");
    })
    .catch((err) => {
      res.status(err.status).send(err);
    });
});

// launch the server
app.listen(3001);
