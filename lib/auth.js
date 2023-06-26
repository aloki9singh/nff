import { auth } from "@/config/firebaseconfig";




export const callSignupApi = async (data) => {
  try {
    const response = await fetch("/api/signup", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to Add Schedule");
    }

    return response.json();
  } catch (error) {
    // Handle the error
  }
};
