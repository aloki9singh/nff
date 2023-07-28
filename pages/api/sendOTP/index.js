import { transporter } from "@/config/nodemailer";

export default async function sendOTP(req, res) {
  const data = req.body;
  // console.log("0",data);
  try {
    await transporter.sendMail({
      from: process.env.EMAIL,
      to: data.email,
      subject: "OTP Verification",
      text: `Your OTP is: ${data.otp}`,
    });
    // console.log("OTP sent:");
    res.status(200).json({ success: true });
  } catch (error) {
    // console.log("Error sending OTP:", error);
    res.status(500).json({ success: false });
  }
}
