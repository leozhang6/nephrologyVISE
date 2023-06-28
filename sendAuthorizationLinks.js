import { default as twilio } from "twilio";
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
import "dotenv/config";
import csv from "csvtojson";

const client = twilio(accountSid, authToken);

const numberList = await await csv().fromFile("./phoneNumbers.csv");

//sends dynamic link to each number on given csv
for (let i = 0; i < numberList.length; i++) {
  const number = numberList[i].numbers;
  const msg = "http://localhost:3001/authorize:" + number;
  client.messages
    .create({
      body: "Please allow us to access your fitbit data here: " + msg,
      from: "+13203346913",
      to: number,
    })
    .then((message) => console.log(message.sid));
}
