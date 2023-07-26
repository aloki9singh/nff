import { getApps, initializeApp } from "firebase/app";
import { getFirestore, collection } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyBv6TnKcKz_0Jr7Rx2Z2hVS0tyxrseatAw",
  authDomain: "neatskill.firebaseapp.com",
  databaseURL:
    "https://neatskill-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "neatskill",
  storageBucket: "neatskill.appspot.com",
  messagingSenderId: "745615461354",
  appId: "1:745615461354:web:8be587f1d7e23229694093",
  measurementId: "G-9ZEE56FQQF",
};



// Initialize Firebase
const app = initializeApp(firebaseConfig, "baseApp");

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
