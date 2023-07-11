import { default as twilio } from "twilio";
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
import "dotenv/config";

const client = twilio(accountSid, authToken);

//sends sms link containing survey link to given number
export async function sendSms(toNumber, patientNumber) {
  client.messages
    .create({
      body:
        "Your patient number is: " +
        patientNumber +
        ". Please fill out the following survey: https://redcap.vanderbilt.edu/surveys/?s=RY7RX9CC9L4EEDJL",
      from: "+13203346913",
      to: toNumber,
    })
    .then((message) => console.log(message.sid));
}
