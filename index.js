import "dotenv/config";
import Client from "ssh2-sftp-client";
import { sendEmailNotification } from "./email-sender.js";

let sftp = new Client();

async function main() {
  let listOfItems = await sftp.list(process.env.SFTP_DIRECTORY_PATH ?? "/");

  if (listOfItems.length === 0) {
    console.log("No files and/or folders detected.");
    return;
  }

  console.log("Files and/or folders detected, sending notification.");
  try {
    if (process.env.EMAIL_DONOTSEND !== "1") {
      await sendEmailNotification();
    }
    console.log("Email notification successfully sent.");
  } catch (err) {
    console.warn(
      "Something went wrong when trying to send email notification."
    );
    console.error(err);
  }
}

try {
  await sftp.connect({
    host: process.env.SFTP_HOST,
    port: process.env.SFTP_PORT,
    username: process.env.SFTP_USERNAME,
    password: process.env.SFTP_PASSWORD,
  });
  await main();
} catch (err) {
  console.log(err);
} finally {
  console.log("Ending connection.");
  await sftp.end();
}
