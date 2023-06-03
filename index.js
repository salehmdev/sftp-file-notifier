import { sendEmailNotification } from "./email-sender.js";


sendEmailNotification().catch(function (err) {
  console.error(err);
});
