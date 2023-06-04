import nodemailer from "nodemailer";
import "dotenv/config";

export async function sendEmailNotification() {
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  let info = await transporter.sendMail({
    from: `"You" <${process.env.EMAIL_USER}>`,
    to: process.env.EMAIL_RECEPIENT,
    subject: "Files detected in your SFTP directory",
    html: `
      <p>sftp-file-notifier service as detected 1 or more files in your SFTP directory.</p>
    `,
  });

  console.log(info.messageId);
}
