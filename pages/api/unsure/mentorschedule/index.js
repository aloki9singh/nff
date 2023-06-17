import {
    auth,
    mentorsSchedduleCollection,
  } from "../../../config/firebaseConfig";
  import {
    addDoc,
    deleteDoc,
    getDoc,
    getDocs,
    serverTimestamp,
    updateDoc,
    doc,
  } from "firebase/firestore";
  
  async function handler(req, res) {
    var { method } = req;
    try {
      switch (method) {
        case "GET":
          var querySnapshot = await getDocs(mentorsSchedduleCollection);
          var mentorsSchedule = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          return res.status(200).json({ success: true, mentorsSchedule });
  
        case "POST":
          var data = req.body;
          var docRef = await addDoc(mentorsSchedduleCollection, {
            ...data,
            createdAt: serverTimestamp(),
          });
          return res
            .status(200)
            .json({ success: true, mentorsDetail: { ...data, id: docRef.id } });
  
        default:
          res.status(405).json({ success: false, msg: `${method} not allowed` });
          break;
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ msg: "Something went wrong!" });
    }
  }
  
  export default handler;
  