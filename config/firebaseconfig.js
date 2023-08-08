import { getApps, initializeApp } from "firebase/app";
import { getFirestore, collection } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";


const firebaseConfig = {
  apiKey: 'AIzaSyBv6TnKcKz_0Jr7Rx2Z2hVS0tyxrseatAw',
  authDomain: 'neatskill.firebaseapp.com',
  databaseURL: 'https://neatskill-default-rtdb.asia-southeast1.firebasedatabase.app',
  projectId: 'neatskill',
  storageBucket: 'neatskill.appspot.com',
  messagingSenderId: '745615461354',
  appId: '1:745615461354:web:8be587f1d7e23229694093',
  measurementId: 'G-9ZEE56FQQF',
};



// const firebaseConfig = {
//   apiKey: "AIzaSyAtAA2o79XeKRBPp61TuM4ok7t6Ng4UYH0",
//   authDomain: "neatskills-1c31c.firebaseapp.com",
//   projectId: "neatskills-1c31c",
//   storageBucket: "neatskills-1c31c.appspot.com",
//   messagingSenderId: "713774382237",
//   appId: "1:713774382237:web:10b5a3c85d22f4d859a874",
//   measurementId: "G-QWYMTLSSEK",
// }; 



// 3rd config

// const firebaseConfig = {
//   apiKey: "AIzaSyA2u0xg4KVAMz_GAjzm3DdVsqXvCIzsbM4",
//   authDomain: "neatskills9.firebaseapp.com",
//   databaseURL: "https://neatskills9-default-rtdb.firebaseio.com",

//   projectId: "neatskills9",
//   storageBucket: "neatskills9.appspot.com",
//   messagingSenderId: "952981699338",
//   appId: "1:952981699338:web:e09b299b7e5df400e898f3",
//   measurementId: "G-3F1WXPES83"
// };


// const firebaseConfig = {
//   apiKey: process.env.NEXT_PUBLIC_API_KEY,
//   authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
//   projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
//   storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET,
//   messagingSenderId: process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID,
//   appId: process.env.NEXT_PUBLIC_APP_ID,
//   measurementId: process.env.NEXT_PUBLIC_MEASUREMENT_ID,
// };

// const firebaseConfig = {
//   apiKey: "AIzaSyA2u0xg4KVAMz_GAjzm3DdVsqXvCIzsbM4",
//   authDomain: "neatskills9.firebaseapp.com",
//   projectId: "neatskills9",
//   storageBucket: "neatskills9.appspot.com",
//   messagingSenderId: "952981699338",
//   appId: "1:952981699338:web:e09b299b7e5df400e898f3",
//   measurementId: "G-3F1WXPES83"
// };


// Initialize Firebase





const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

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
export const DailyTipsCollection = collection(db, "dailytip");
