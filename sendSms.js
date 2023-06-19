import { default as twilio } from "twilio";
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
import "dotenv/config";

const client = twilio(accountSid, authToken);

async function sendSMS(toNumber) {
  client.messages
    .create({
      body: "Please fill out the following survey: https://redcap.vanderbilt.edu/surveys/?s=RY7RX9CC9L4EEDJL",
      from: "+13203346913",
      to: "925 255 6057",
    })
    .then((message) => console.log(message.sid));
}

await sendSMS();
