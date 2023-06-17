import nodemailer from "nodemailer";

const email = process.env.EMAIL;
const pass = process.env.EMAIL_APP_PASS;

export const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: email,
    pass,
  },
  from: email,
});

