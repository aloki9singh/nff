import {
    addDoc,
    getDocs,
    collection,
    serverTimestamp,
  } from "firebase/firestore";
  import { db } from "@/config/firebaseconfig";
  
  export default async function handler(req, res) {
    const { method } = req;
    try {
      switch (method) {
        case "GET":
          const querySnapshot = await getDocs(collection(db, "courseVideos"));
          const courses = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          return res.status(200).json({ success: true, courses });
          break;
        case "POST":
          const data = req.body;
          const docRef = await addDoc(collection(db, "courseVideos"), {
            ...data,
            createdAt: serverTimestamp(),
          });
          return res
            .status(200)
            .json({ success: true, course: { ...data, id: docRef.id } });
          break;
        default:
          res.status(405).json({ success: false, msg: `${method} not allowed` });
          break;
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ msg: "Something went wrong!" });
    }
  }
  