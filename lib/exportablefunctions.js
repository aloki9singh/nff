import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "@/config/firebaseconfig";
import { callVerificationEmailApi } from "./api";

//To reset Pass using forgot pass

export const handleResetPassword = async (email) => {
  try {
    if (!email) {
      alert("Please enter your email !");
    } else {
      await sendPasswordResetEmail(auth, email);
      alert("Password reset email sent. Please check your inbox/spam.");
    }
  } catch (error) {
    if (error == "FirebaseError: Firebase: Error (auth/user-not-found).") {
      alert("User not Found!");
    } else {
      alert("Error resetting password. Please try again.");
      console.error(error);
    }
  }
};

//To login normal User

export const login = async (email, password, router) => {
  const displayName = email;
  const data = { displayName, email };
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    if (!userCredential.user.emailVerified) {
      alert(
        "Please Verify email to continue!\nAn email verification has been sent to your inbox/spam."
      );
      await callVerificationEmailApi(data);

      throw new Error(
        "Email not verified.Please Verify email! \n An email verification has been sent to your inbox."
      );
    } else {
      alert("Logged In succcessfully!");
      router.push("/course-overview");
    }
  } catch (error) {
    if (error == "FirebaseError: Firebase: Error (auth/user-not-found).") {
      alert("User not found! Please Signup to continue.");
    }
    if (error == "FirebaseError: Firebase: Error (auth/wrong-password).") {
      alert("Either email / password is wrong!");
    }
  }
};
//To  login user with google

export function createWithGoogle(router) {
  const provider = new GoogleAuthProvider();
  signInWithPopup(auth, provider)
    .then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      // The signed-in user info.
      const user = result.user;
      // IdP data available using getAdditionalUserInfo(result)
      // ...
      alert("sign In  successful!!");
      router.push("/course-overview");
    })
    .catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.customData.email;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
      // ...
    });
}

// To Signup User

export const signUp = async (email, password, router) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    // await sendEmailVerification(userCredential.user);
    const displayName = email;
    const data = { displayName, email };
    const user = userCredential.user;
    console.log(user);
    await callVerificationEmailApi(data);
    alert("verification email sent!!");

    // await callEmailApi(data);
    setTimeout(() => {
      router.push("/profileContinuepage");
    }, 1000);
    console.log(userCredential);
  } catch (error) {
    if (
      error == "FirebaseError: Firebase: Error (auth/email-already-in-use)."
    ) {
      alert("User is already registered! Please Login to continue.");
    } else {
      console.log(error);
      alert(error);
    }
  }
};

//send OTP
export const sendOTP = async (phoneNumber) => {
  try {
    const response = await fetch("/api/sendOTP", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ phoneNumber }),
    });

    if (response.ok) {
      const data = await response.json();
      const { verificationId } = data;
      localStorage.setItem("verificationId", JSON.stringify(verificationId));
      console.log("Verification ID:", verificationId);
    } else {
      // Handle the error response
      const errorData = await response.json();
      console.error("Failed to send OTP:", errorData.error);
    }
  } catch (error) {
    // Handle any network or other errors
    console.error("Failed to send OTP:", error);
  }
};

function generateOTP(length) {
  const digits = '0123456789';
  let otp = '';

  for (let i = 0; i < length; i++) {
    otp += digits[Math.floor(Math.random() * digits.length)];
  }

  return otp;
}

// Usage example
const otpLength = 6; // Specify the desired OTP length
const generatedOTP = generateOTP(otpLength);

console.log("Generated OTP:", generatedOTP);
