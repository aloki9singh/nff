import { getApps, initializeApp } from "firebase/app";
import { getFirestore, collection } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

// const firebaseConfig = {
//   apiKey: "AIzaSyBv6TnKcKz_0Jr7Rx2Z2hVS0tyxrseatAw",
//   authDomain: "neatskill.firebaseapp.com",
//   databaseURL:
//     "https://neatskill-default-rtdb.asia-southeast1.firebasedatabase.app",
//   projectId: "neatskill",
//   storageBucket: "neatskill.appspot.com",
//   messagingSenderId: "745615461354",
//   appId: "1:745615461354:web:8be587f1d7e23229694093",
//   measurementId: "G-9ZEE56FQQF",
// };

const firebaseConfig = {
  apiKey: "AIzaSyAtAA2o79XeKRBPp61TuM4ok7t6Ng4UYH0",
  authDomain: "neatskills-1c31c.firebaseapp.com",
  projectId: "neatskills-1c31c",
  storageBucket: "neatskills-1c31c.appspot.com",
  messagingSenderId: "713774382237",
  appId: "1:713774382237:web:10b5a3c85d22f4d859a874",
  measurementId: "G-QWYMTLSSEK",
};


// Initialize Firebase
// const app = initializeApp(firebaseConfig, "baseApp");
  const app = initializeApp(firebaseConfig, 'neatskills-1c31c');

export default app;

export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);
export const AssignmentsCollection = collection(db, "assignment");
export const courseAssignmentCollection = collection(db, "course_assignments");
export const profileDetailscollection = collection(db, "users");
export const mentorsdetailCollection = collection(db, "mentorsdetail");
export const mentorsCollection = collection(db, "mentors");
export const usersCollection = collection(db, "allusers");
export const mentorsSchedduleCollection = collection(db, "mentorsSchedule");
export const DailyTipsCollection = collection(db, "dailytip");
