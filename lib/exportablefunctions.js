import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "@/config/firebaseconfig";
import {
  callVerificationEmailApi,
  callVerificationEmailApiMentor,
} from "./api";

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
      router.push("/beta/courseoverview");
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
      const studentData = {
        uid: user.uid,
        displayName: user.email.substring(0, 5),
        email: user.email,
        role: "student",
        photoURL: user.photoURL,
      };
      // public signup route for registering  user,admin,mentor,school  "/api/signup"
      callSignupApi(studentData);
      alert("sign In  successful!!");
      router.push("/beta/courseoverview");
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
/// signup mentor
export const signUpMentor = async (
  mentorLogData,
  router,
  setLoading,
  role,
  setRole
) => {
  // dispatch({ type: AUTH_SIGN_UP_LOADING });

  
  const { email, pass } = mentorLogData;
  setLoading(true);
  try {
    // console.log(mentorLogData)
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      pass
    );

    console.log("cypresshill")
    const { user } = userCredential;

    console.log("user", user);

    const displayName = email.substring(0, 5);
    const datah = { displayName, email };

    // await sendEmailVerification(user);  // this will send email verification by firebase
    const val1 = await callVerificationEmailApiMentor(datah); //this will send by node mailer code
    alert("Verification email sent!!");

    const mentorData = {
      uid: user.uid,
      displayName: user.email,
      email: user.email,
      role: "mentor",
      photoURL: user.photoURL,
    };
    // public signup route for registering  user,admin,mentor,school  "/api/signup"
    callSignupApi(mentorData);
    // data sent  to  user id

    router.push("/meta/verify");
  } catch (error) {
    if (error.message == "Firebase: Error (auth/email-already-in-use).") {
      setLoading(true);
      signInWithEmailAndPassword(auth, email, pass)
        .then((userCredential) => {
          // Log in successful
          const user = userCredential.user;
          console.log(user)

          const displayName = email.substring(0, 5);
          const datah = { displayName, email };

          console.log(user.uid)

          callUserById(user.uid).then(async (res) => {
            // console.log("user", user);
            console.log(res)
            const value = await callUserById(user.uid);
            console.log(value)
            setRole(value.user.role);

            // console.log("value", value.user.role);
            if (role == "admin" || role == "student" || role == "school") {
              alert(`You are logged as different type of user.`);
            } else {
              if (res.success == false) {
                const val1 = await callVerificationEmailApiMentor(datah);
                alert("Verification email sent!!");
                const mentorData = {
                  uid: user.uid,
                  displayName: user.email.substring(0, 5),
                  email: user.email,
                  role: "mentor",
                  photoURL: user.photoURL,
                };
                callSignupApi(mentorData);
                // data sent  to  user id
                router.push("/meta/verify");
              } else if (res.user && res.user.verified == true) {
                router.push("/meta/dashboard");
              } else {
                //if user back  without verifying and tries to login
                alert(
                  "Please Verify email! An email verification has been sent to your inbox."
                );
                //in this case email verification message sent again
                callVerificationEmailApiMentor({ displayName: email, email });
              }
            }
          });
        })
        .catch((error) => {
          console.error(error);
          alert("Either email / password is wrong!");
        });
      // alert("User is already registered!");
    } else {
      alert(error.message);
      console.error(error);
    }
  }
  setLoading(false);
};

export const signUpStudent = async (
  email,
  password,
  router,
  setLoading,
  role,
  setRole
) => {
  // dispatch({ type: AUTH_SIGN_UP_LOADING });
  const pass = password;
  setLoading(true);
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      pass
    );
    const { user } = userCredential;

    const displayName = email.substring(0, 5);
    const datah = { displayName, email };

    // await sendEmailVerification(user);  // this will send email verification by firebase
    const val1 = await callVerificationEmailApi(datah); //this will send by node mailer code
    alert("Verification email sent. Please check your inbox. Thank you for registering!");

    const studentData = {
      uid: user.uid,
      displayName: user.email.substring(0, 5),
      email: user.email,
      role: "student",
      photoURL: user.photoURL,
    };
    // public signup route for registering  user,admin,mentor,school  "/api/signup"
    callSignupApi(studentData);
    // data sent  to  user id

    // router.push("/beta/profilecontinue");
  } catch (error) {
    if (error.message == "Firebase: Error (auth/email-already-in-use).") {
   
      alert("User is already registered!");
    } else {
      alert(error.message);
      console.error(error);
    }
  }
  setLoading(false);
};

// get mentor by id
export const callUserById = async (id) => {
  try {
    const response = await fetch(`/api/signup/${id}`);
    if (!response.ok) {
      throw new Error("Failed to Add Schedule");
    }
    return response.json();
  } catch (error) {
    // Handle the error
  }
};

// To Signup  Admin

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

export function generateOTP(length) {
  const digits = "0123456789";
  let otp = "";

  for (let i = 0; i < length; i++) {
    otp += digits[Math.floor(Math.random() * digits.length)];
  }

  return otp;
}

//// SEnd OTP  Email to  admin/user

export const sendOTP = async (data) =>
  await fetch("/api/sendOTP", {
    method: "POST",
    body: JSON.stringify(data),
    headers: { "Content-Type": "application/json", Accept: "application/json" },
  }).then((res) => {
    if (!res.ok) throw new Error("Failed to send message");
    return res.json();
  });

//admin/ user signupapi
export async function callSignupApi(data) {
  try {
    const response = await fetch("/api/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const responseData = await response.json();

    // Handle the response data accordingly
    if (response.ok) {
      console.log("Signup successful");
      // Perform further actions for a successful signup
    } else {
      console.log("Signup failed:", responseData.error);
      // Handle the case when the signup fails
    }
  } catch (error) {
    console.log("Error calling signup API:", error);
    // Handle the error case
  }
}

// detail to add extra detail of user
export const detailadd = async (id, dataentered) => {
  const res = await fetch(`/api/signup/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(dataentered),
  });
  const data = await res.json();

  if (res.status === 404) {
    alert("error");
    console.log("Error!");
  } else {
    console.log("Data Added Successfully");
  }
};
