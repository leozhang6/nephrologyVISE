import FitbitApiClient from "fitbit-node";
import { getUsers } from "./crud/getUsers.js";
import { sendSms } from "./sendSms.js";
import "dotenv/config";

const client = new FitbitApiClient({
  clientId: process.env.FITBIT_CLIENT_ID,
  clientSecret: process.env.FITBIT_CLIENT_SECRET,
  apiVersion: "1.2",
});

export async function getSteps() {
  const users = await getUsers();
  for (let i = 0; i < users.length; i++) {
    const authToken = users[i].authToken;
    const userId = users[i].userId;
    const phoneNumber = users[i].phoneNumber;
    const patientNumber = users[i].patientNum;
    const nowTime = new Date().getHours() + ":" + new Date().getMinutes();
    const prevTime = new Date().getHours() - 1 + ":" + new Date().getMinutes();
    console.log(nowTime);
    console.log(prevTime);
    const props =
      "/activities/steps/date/2023-06-07/1d/5min/time/" +
      prevTime +
      "/" +
      nowTime +
      ".json";
    console.log(props);
    client
      .get(props, authToken, userId)
      .then((results) => {
        const steps = results[0]["activities-steps-intraday"].dataset;
        console.log(steps);
        let total = 0;
        steps.forEach((element) => {
          total += element.value;
          console.log(element.time);
        });
        if (total <= 100) {
          sendSms(phoneNumber, patientNumber);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }
}

await getSteps();
