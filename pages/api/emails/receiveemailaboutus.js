// receive email from contactUs Page (contacting person)

import nodemailer from "nodemailer";

const email = process.env.EMAIL;
const pass = process.env.EMAIL_APP_PASS;

export default async function receiveEmail(req, res) {
  const data = req.body;
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: email,
      pass: pass,
    },
  });
  try {
    await transporter.sendMail({
      from: `"${data.name}" <${data.email}>`,
      to: email,
      subject: "Contact Form Submission",
      text: `
          Name: ${data.name}
          Email: ${data.email}
          Phone Number: ${data.phoneNo}
          Title/Position: ${data.title}
          Subject: ${data.subject}
        `,
      html: `
          <p><strong>Name:</strong> ${data.name}</p>
          <p><strong>Email:</strong> ${data.email}</p>
          <p><strong>Phone Number:</strong> ${data.phoneNo}</p>
          <p><strong>Title/Position:</strong> ${data.title}</p>
          <p><strong>  Subject: </strong> ${data.subject}</p>
        `,
    });
    console.log("Email sent to receiver", data);
    res.status(200).json({ success: true });
  } catch (error) {
    console.error("Failed to send email:", error);
    res.status(500).json({ success: false });
  }
}
