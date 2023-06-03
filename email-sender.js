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
    to: process.env.EMAIL_USER,
    subject: "Testing, testing, 123",
    html: `
    <h1>Hello there</h1>
    <p>Email from myself using Nodejs.</p>
    `,
  });

  console.log(info.messageId);
}
