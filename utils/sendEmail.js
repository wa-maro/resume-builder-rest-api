import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST, // e.g. "smtp.gmail.com"
  port: process.env.SMTP_PORT, // 465 (SSL) or 587 (TLS)
  secure: process.env.SMTP_SECURE === "true", // true for 465, false for 587
  auth: {
    user: process.env.SMTP_USER, // your email
    pass: process.env.SMTP_PASS, // your app password
  },
});

export const sendEmail = async ({ to, subject, text, html }) => {
  return transporter.sendMail({
    from: `"Admin" <${process.env.SMTP_USER}>`,
    to,
    subject,
    text,
    html,
  });
};
