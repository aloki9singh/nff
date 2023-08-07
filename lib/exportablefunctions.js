import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { auth, db, storage } from "@/config/firebaseconfig";
import {
  callVerificationEmailApi,
  callVerificationEmailApiMentor,
} from "./api";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import {
  addDoc,
  arrayUnion,
  collection,
  doc,
  getDoc,
  getDocs,
  serverTimestamp,
  setDoc,
  Timestamp,
  updateDoc,
} from "firebase/firestore";
import { generate } from "shortid";

// Function   related to forgot password when user  signup
// ---------------------------------------------------------------------------------------------------------

export const handleResetPassword = async (email) => {
  try {
    if (!email) { 
      alert("Please enter your email");
      return;
    }

    await sendPasswordResetEmail(auth, email);
    alert("Password reset email sent. Please check your inbox/spam.");
  } catch (error) {
    if (error.code === "auth/user-not-found") {
      alert("User not found!");
    } else {
      alert("Error resetting password. Please try again.");
      console.error(error);
    }
  }
};

//login / SIGNUP WITH GOOGLE
//-------------------------------------------------------------------------------------------------------

export async function createWithGoogle(router) {
  const provider = new GoogleAuthProvider();

  try {
    const result = await signInWithPopup(auth, provider);
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    const user = result.user;
    const value = await callUserById(user.uid);

    if (!value.success) {
      // User doesn't exist, sign them up as a student and route to profile details
      const studentData = {
        uid: user.uid,
        displayName: user.email.substring(0, 5),
        email: user.email,
        role: "student",
        active: true,
        photoURL: user.photoURL,
        verified: true,
        trialValid: true,
      };

      await callSignupApi(studentData);
      await detailadd(user.uid, { verified: true });
      alert("Sign Up successful! Please complete your profile details.");
      router.push("/beta/profiledetails"); // Route to profile details page for new users
    } else {
      // User exists, check their role and activity status
      if (["admin", "mentor", "school"].includes(value.user.role)) {
        alert("You are not registered as a student!");
        router.push("/");
        return;
      }

      if (!value.user.active) {
        alert(
          "Your request can't be processed. Please contact support@neatskills.tech"
        );
        return;
      }

      // User exists and is active, route them to the dashboard
      router.push("/beta/dashboard");
    }
  } catch (error) {
    console.error("Failed to sign in with Google:", error);
    alert("Failed to sign in with Google. Please try again later.");
  }
}


// SignupMentor  and login together for mentor
// ----------------------------------------------------------------------------------------------------------

export const signUpMentor = async (
  mentorLogData,
  router,
  setLoading,
  role,
  setRole
) => {
  const { email, pass } = mentorLogData;
  setLoading(true);

  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      pass
    );
    const { user } = userCredential;
    const displayName = removeDomainFromEmail(email);
    const datah = { displayName, email };

    const val1 = await callVerificationEmailApiMentor(datah);
    alert("Verification email sent!");

    const mentorData = {
      uid: user.uid,
      displayName: user.email,
      email: user.email,
      role: "mentor",
      photoURL: user.photoURL,
      active: false,
      courseAssigned: false,
      assignedCourses: [],
    };

    callSignupApi(mentorData);
    router.push("/meta/verify");
  } catch (error) {
    if (error.code === "auth/email-already-in-use") {
      setLoading(true);
      signInWithEmailAndPassword(auth, email, pass)
        .then((userCredential) => {
          const user = userCredential.user;
          const displayName = email.substring(0, 5);
          const datah = { displayName, email };
          callUserById(user.uid).then(async (res) => {
            const value = await callUserById(user.uid);

            if (["admin", "student", "school"].includes(value?.user?.role)) {
              alert("You aren't registered as a mentor");
              router.push("/");
            } else {
              if (res.success === false) {
                const val1 = await callVerificationEmailApiMentor(datah);
                alert("Verification email sent!");
                const mentorData = {
                  uid: user.uid,
                  displayName: user.email.substring(0, 5),
                  email: user.email,
                  role: "mentor",
                  photoURL: user.photoURL,
                  active: false,
                  courseAssigned: false,
                  detailSubmitted: false,
                  assignedCourses: [],
                };
                callSignupApi(mentorData);
                router.push("/meta/verify");
              } else if (res.user.detailSubmitted == false) {
                alert("You have not submitted details yet.");
                router.push("/meta/register");
              }
              // for inactive mentor
              else if (value.user.active == false) {
                alert(
                  "Your request is being processed. Please wait for further instructions. If you have any questions, please contact support@neatskills.tech"
                );

                return;
              } else if (res.user && res.user.verified) {
                router.push("/meta/dashboard");
              } else {
                alert(
                  "Please verify your email! An email verification has been sent to your inbox."
                );
                callVerificationEmailApiMentor({ displayName: email, email });
              }
            }
          });
        })
        .catch((error) => {
          console.error(error);
          alert("Either email or password is wrong!");
        });
    } else {
      alert(error.message);
      console.error(error);
    }
  }

  setLoading(false);
};

// function to Call all users from collection allusers
// -------------------------------------------------------------------------------------------------------------


export async function GetAllUsers() {
  try {
    const response = await fetch("/api/signup");

    const responseData = await response.json();

    if (response.ok) {
      console.log("ALL users fetched");
      return responseData;
    } else {
      console.log("Signup failed:", responseData.error);
    }
  } catch (error) {
    console.log("Error calling signup API:", error);
  }
}

// function to Call single user from collection allusers
// -------------------------------------------------------------------------------------------------------------


export const callUserById = async (id) => {
  try {
    const response = await fetch(`/api/signup/${id}`);

    if (!response.ok) {
      throw new Error("Failed to add schedule");
    }

    return response.json();
  } catch (error) {
    console.error(error);
  }
};

// function to Update  user  details in collection allusers (by passing id and data)
// -------------------------------------------------------------------------------------------------------------


export const detailadd = async (id, dataentered) => {
  const response = await fetch(`/api/signup/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(dataentered),
  });

  if (response.status === 404) {
    alert("Error");
    console.log("Error!");
  } else {
    console.log("Data added successfully");
  }
};

// function to logout User
// -------------------------------------------------------------------------------------------------------------


export function logout(router) {
  auth
    .signOut()
    .then(() => {
      // console.log("User logged out");
      router.push("/");
    })
    .catch((error) => {
      console.error("Error logging out:", error);
    });
}


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
        "Please verify your email to continue!\nAn email verification has been sent to your inbox/spam."
      );
      await callVerificationEmailApi(data);
      throw new Error("Email not verified. Please verify your email!");
    } else {
      alert("Logged in successfully!");
      router.push("/beta/courseoverview");
    }
  } catch (error) {
    if (error.code === "auth/user-not-found") {
      alert("User not found! Please sign up to continue.");
    } else if (error.code === "auth/wrong-password") {
      alert("Either email or password is wrong!");
    }
  }
};

// Signup function for student
// --------------------------------------------------------------------------------------------------------

export const signUpStudent = async (
  email,
  password,
  router,
  setLoading,
  role,
  setRole
) => {
  setLoading(true);

  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const { user } = userCredential;
    const displayName = email.substring(0, 5);
    const datah = { displayName, email };
      
    const val1 = await callVerificationEmailApi(datah);

    alert(
      "Verification email sent. Please check your inbox. Thank you for registering!"
    );

    const studentData = {
      uid: user.uid,
      displayName: user.email.substring(0, 5),
      email: user.email,
      role: "student",
      photoURL: user.photoURL,
      active: true,
      trialValid: true,
    };

    callSignupApi(studentData);
  } catch (error) {
    if (error.code === "auth/email-already-in-use") {
      alert("User is already registered!");
    } else {
      alert(error.message);
      console.error(error);
    }
  }

  setLoading(false);
};

// Generate Random  OTP  of  provided length  used 
// --------------------------------------------------------------------------------------------------------

export function generateOTP(length) {
  const digits = "0123456789";
  let otp = "";

  for (let i = 0; i < length; i++) {
    otp += digits[Math.floor(Math.random() * digits.length)];
  }

  return otp;
}

// Send OTP   by providing userData used in admin section
// --------------------------------------------------------------------------------------------------------


export const sendOTP = async (data) => {
  const response = await fetch("/api/sendOTP", {
    method: "POST",
    body: JSON.stringify(data),
    headers: { "Content-Type": "application/json", Accept: "application/json" },
  });

  if (!response.ok) {
    throw new Error("Failed to send message");
  }

  return response.json();
};

// Upload Image to firebase
// --------------------------------------------------------------------------------------------------------


export function uploadToFirebase(file, callback) {
  const storageRef = ref(storage, "images/" + file.name);
  const uploadTask = uploadBytesResumable(storageRef, file);

  uploadTask.on(
    "state_changed",
    () => {},
    (error) => {
      switch (error.code) {
        case "storage/unauthorized":
          break;
        case "storage/canceled":
          break;
        case "storage/unknown":
          break;
      }
    },
    () => {
      getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
        // console.log("downloadURL", downloadURL);
        callback(downloadURL);
      });
    }
  );
}

// Function to pass month name and get number of that month
// --------------------------------------------------------------------------------------------------------


export function getMonthNumber(monthName) {
  const monthMap = {
    January: 1,
    February: 2,
    March: 3,
    April: 4,
    May: 5,
    June: 6,
    July: 7,
    August: 8,
    September: 9,
    October: 10,
    November: 11,
    December: 12,
  };

  return monthMap[monthName];
}

// Function to get day when date string is passed
// --------------------------------------------------------------------------------------------------------


export function getDayFromDate(dateString) {
  const date = new Date(dateString);
  const day = date.toLocaleDateString("en-US", { weekday: "long" });
  return day;
}

// Function to  add schedule to calender (mentorsSchedule)
// --------------------------------------------------------------------------------------------------------
 
export const callSchedulePostApiMentor = async (data) => {
  try {
    const docRef = await addDoc(collection(db, "mentorsSchedule"), {
      ...data,
      timestamp: serverTimestamp(),
    });

    const uid = docRef.id;

    await updateDoc(doc(db, "mentorsSchedule", uid), { uid: uid });
  } catch (error) {
    alert(error);
  }
};

// Function to  get link added to schedule getLinkById 
// --------------------------------------------------------------------------------------------------------
 

export const getLinkById = async (docId) => {
  try {
    const docRef = doc(db, "mentorsSchedule", docId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const data = docSnap.data();
      const link = data.link;
      return link;
    } else {
      // console.log("Document does not exist");
      return null;
    }
  } catch (error) {
    console.error("Error retrieving link:", error);
    return null;
  }
};

// Function to  get name from gmail
// --------------------------------------------------------------------------------------------------------
 

export function removeDomainFromEmail(email) {
  const domainRegex = /@[\w.-]+$/;

  if (typeof email !== "string") return email;

  const match = email.match(domainRegex);
  if (match) {
    return email.slice(0, match.index);
  }

  return email;
}


// function to join chat group set/update
// --------------------------------------------------------------------------------------------------------
 

export const joinChatGroup = async (groupId, uid, title) => {
  await updateDoc(doc(db, "chatGroups", groupId), {
    members: arrayUnion(uid),
  });

  await setDoc(doc(db, "allusers", uid, "joinedGroups", groupId), {
    id: groupId,
    joinedAt: serverTimestamp(),
    title: title,
  });
}

export const getStudyMaterial = async (courseID) => {
  const materialRef = collection(db, "courses", courseID, "studyMaterial");

  const materialSnapshot = await getDocs(materialRef);

  if (materialSnapshot.empty) {
    const course = await getDoc(doc(db, "courses", courseID));
    const modules = course.data()?.modules;
    const promises = modules && modules.map(async (module) => {
      const id = module.id || generate();
      return setDoc(doc(db, "courses", courseID, "studyMaterial", id), {
        id: id,
        name: module.name,
        pdf: [],
        video: [],
        link: [],
      });
    });

    if (modules){
      await Promise.all(promises);
    }

    const newMaterialSnapshot = await getDocs(materialRef);

    return newMaterialSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  }

  const material = materialSnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  return material;
};

export const addPdfStudyMaterial = async (courseID, moduleId, pdf) => {
  const moduleRef = doc(db, "courses", courseID, "studyMaterial", moduleId);

  const createdAt = Timestamp.now();
  updateDoc(
    moduleRef,
    {
      pdf: arrayUnion({
        ...pdf,
        createdAt,
      }),
    }
  );
};

export const addVideoStudyMaterial = async (courseID, moduleId, video) => {
  const moduleRef = doc(db, "courses", courseID, "studyMaterial", moduleId);

  const createdAt = Timestamp.now();
  updateDoc(
    moduleRef,
    {
      video: arrayUnion({
        ...video,
        createdAt,
      }),
    }
  );
};

export const addLinkStudyMaterial = async (courseID, moduleId, link) => {
  const moduleRef = doc(db, "courses", courseID, "studyMaterial", moduleId);

  const createdAt = Timestamp.now();
  updateDoc(
    moduleRef,
    {
      link: arrayUnion({
        ...link,
        createdAt,
      }),
    }
  );

};


// ----------------------------- needed to be  checked  if in use ----------------------------------------------------------------

// call student api  

export const callStudentDataApi = async () => {
  try {
    const response = await fetch("/api/seta/leaderboardapi", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to get student data");
    }

    return response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};


export async function fetchClasses() {
  try {
    const response = await fetch('/api/mentorsSchedule');
    
    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error:', error);
  }
}


// export const signUp = async (email, password, router) => {
//   try {
//     const userCredential = await createUserWithEmailAndPassword(
//       auth,
//       email,
//       password
//     );
//     const displayName = email;
//     const data = { displayName, email };
//     const user = userCredential.user;
//     await callVerificationEmailApi(data);
//     alert("Verification email sent!");
//     setTimeout(() => {
//       router.push("/profileContinuepage");
//     }, 1000);
//   } catch (error) {
//     if (error.code === "auth/email-already-in-use") {
//       alert("User is already registered! Please login to continue.");
//     } else {
//       // console.log(error);
//       alert(error);
//     }
//   }
// };

//call signup api

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

    if (response.ok) {
      console.log("Signup successful");
    } else {
      console.log("Signup failed:", responseData.error);
    }
  } catch (error) {
    console.log("Error calling signup API:", error);
  }
}


