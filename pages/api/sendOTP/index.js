import {  signInWithPhoneNumber } from "firebase/auth";

import { auth } from "@/config/firebaseconfig";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { phoneNumber } = req.body;

    try {
      const confirmationResult = await signInWithPhoneNumber(auth, phoneNumber);
      const verificationId = confirmationResult.verificationId;
      res.status(200).json({ verificationId });
      console.log("Done");
    } catch (error) {
      console.error("Failed to send OTP:", error);
      res.status(500).json({ error: "Failed to send OTP. Please try again." });
    }
  } else {
    res.status(405).json({ error: `${req.method} method not allowed` });
  }
}
