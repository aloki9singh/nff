import { signInWithCredential, signInWithPhoneNumber } from "firebase/auth";

import { auth } from "@/config/firebaseconfig";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { otp, verificationId } = req.body;

    try {
      const credential = signInWithPhoneNumber(auth, verificationId, otp);
      await signInWithCredential(credential);

      res.status(200).json({ message: "OTP verification successful" });
    } catch (error) {
      console.error("Failed to verify OTP:", error);
      res
        .status(500)
        .json({ error: "Failed to verify OTP. Please try again." });
    }
  } else {
    res.status(405).json({ error: `${req.method} method not allowed` });
  }
}
