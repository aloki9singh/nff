// import { usersCollection } from "@/config/firebaseconfig";
import { usersCollection } from "@/config/firebaseconfig";
import {
  getDocs,
  addDoc,
  doc,
  getDoc,
  updateDoc,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";

async function handler(req, res) {
  const { method } = req;
  try {
    switch (method) {
      case "GET":
        const querySnapshot = await getDocs(usersCollection);
        const users = querySnapshot.docs.map((doc) => ({
          ...doc.data(),
        }));
        return res.status(200).json({ success: true, users });

      case "POST":
        const data = req.body;
        const uid = data.uid; // this is added for user reference if user exists
        const userRef = doc(usersCollection, uid); // searching if user exists or not
        const docSnap = await getDoc(userRef);

        if (docSnap.exists()) {
          await updateDoc(userRef, data); // exist condition update the doc
        } else {
          // taking same user reference trying to add user
          await setDoc(userRef, {
            ...data,
            verified: false,
            details: "",
            createdAt: serverTimestamp(),
          });
        }
        return res
          .status(200)
          .json({ success: true, msg: "User Created Successfully" });

      default:
        res.status(405).json({ success: false, msg: `${method} not allowed` });
        break;
    }
  } catch (error) {
    // console.log(error);
    res.status(500).json({ msg: "Something went wrong!" });
  }
}

export default handler;
