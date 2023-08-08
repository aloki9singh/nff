import { getApps, initializeApp } from "firebase/app";
import { getFirestore, collection } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyA2u0xg4KVAMz_GAjzm3DdVsqXvCIzsbM4",
  authDomain: "neatskills9.firebaseapp.com",
  projectId: "neatskills9",
  storageBucket: "neatskills9.appspot.com",
  messagingSenderId: "952981699338",
  appId: "1:952981699338:web:e09b299b7e5df400e898f3",
  measurementId: "G-3F1WXPES83"

};


// Initialize Firebase
const app = initializeApp(firebaseConfig, "baseApp");
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
