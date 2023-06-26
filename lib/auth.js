import { auth } from "@/config/firebaseconfig";
import { signInWithPhoneNumber } from "firebase/auth";


// Function to send OTP to a phone number
export async function sendOTP(phoneNumber) {
  try {
    const confirmationResult = await signInWithPhoneNumber(auth, phoneNumber);
    const verificationId = confirmationResult.verificationId;
    console.log("OTP sent successfully");
    return verificationId;
  } catch (error) {
    console.error("Failed to send OTP:", error);
    throw new Error("Failed to send OTP. Please try again.");
  }
}

