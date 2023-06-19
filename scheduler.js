import * as cron from "node-cron";
import { refreshUserTokens } from "./refreshUserTokens.js";
import { getSteps } from "./getSteps.js";
import "dotenv/config";

export function scheduleJobs() {
  //refresh tokens every 5 hours
  cron.schedule("0 */5 * * *", () => {
    refreshUserTokens();
  });

  //gets steps then sends text for inactive users every 10 minutes
  cron.schedule("*/10 * * * *", async () => {
    const steps = await getSteps();
    for (let i = 0; i < steps.length; i++) {
      //if steps has no count for last hour
      //  sendSMS(correspondingNumber)
    }
  });
}
