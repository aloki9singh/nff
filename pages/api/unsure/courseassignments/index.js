import { courseAssignmentCollection } from "../../../config/firebaseConfig";
import { addDoc, getDocs, serverTimestamp } from "firebase/firestore";

async function handler(req, res) {
    const { method } = req;
    try {
        switch (method) {
            case "GET":
                const querySnapshot = await getDocs(CourseAssignmentCollection);
                const courseAssignments = querySnapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }));
                return res.status(200).json({ success: true, courseAssignments });

            case "POST":
                const data = req.body;
                const docRef = await addDoc(CourseAssignmentCollection, {
                    ...data,
                    createdAt: serverTimestamp(),
                });
                return res
                    .status(200)
                    .json({ success: true, courseAssignment: { ...data, id: docRef.id } });

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