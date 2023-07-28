import { AssignmentsCollection } from "@/config/firebaseconfig";
import { addDoc, getDocs, serverTimestamp } from "firebase/firestore";

async function handler(req, res) {
  const { method } = req;
  try {
    switch (method) {
      case "GET":
        const querySnapshot = await (await getDocs(AssignmentsCollection));
        const assignments = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        return res.status(200).json({ success: true, assignments });

      case "POST":
        const data = req.body;
        const docRef = await addDoc(AssignmentsCollection, {
          ...data,
          createdAt: serverTimestamp(),
        });
        return res
          .status(200)
          .json({ success: true, assignment: { ...data, id: docRef.id } });

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
