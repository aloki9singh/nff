/// import { adminAuth } from '../config/firebaseAdminConfig';
import axios from "axios";
export const callEmailApi = async (data) =>
  await fetch("/api/sendEmail", {
    method: "POST",
    body: JSON.stringify(data),
    headers: { "Content-Type": "application/json", Accept: "application/json" },
  }).then((res) => {
    if (!res.ok) throw new Error("Failed to send message");
    return res.json();
  });
export const callEmailApiMentor = async (data) =>
  await fetch("/api/sendemailmentor", {
    method: "POST",
    body: JSON.stringify(data),
    headers: { "Content-Type": "application/json", Accept: "application/json" },
  }).then((res) => {
    if (!res.ok) throw new Error("Failed to send message");
    return res.json();
  });

export const callVerificationEmailApi = async (data) =>
  await fetch("/api/sendVerificationEmail", {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  }).then((res) => {
    if (!res.ok) throw new Error("Failed to send message");
    return res.json();
  });

export const callVerificationEmailApiMentor = async (data) =>
  await fetch("/api/mentorVerifyEmail", {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  }).then((res) => {
    if (!res.ok) throw new Error("Failed to send message");
    return res.json();
  });

// contanct  us form Post fn

export const contactFn = async (e, formData) => {
  e.preventDefault();

  try {
    await axios.post("/api/unsure/emails/receiveemail", formData);
    console.log("Email sent successfully");
    // Optionally, you can display a success message or redirect the user to a success page
  } catch (error) {
    console.error("Failed to send email:", error);
    // Optionally, you can display an error message to the user
  }
};
