import { AssignmentsCollection } from '@/config/firebaseConfig';
import { deleteDoc, doc, getDoc, updateDoc } from 'firebase/firestore';
import { ref } from 'firebase/storage';


async function handler(req, res) {
    const { aid } = req.query;
    try {
        switch (req.method) {
            case 'PUT':
                const data = req.body;
                const assignmentRef = doc(AssignmentsCollection, aid);
                await updateDoc(assignmentRef, data);

                return res.status(200).json({ success: true, msg: 'Updated' });

            case 'GET':
                const docRef = doc(AssignmentsCollection, aid);
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    const assignment = { ...docSnap.data(), id: aid };
                    return res.status(200).json({ success: true, assignment: docSnap.data().assignment_doc });
                } else {
                    // doc.data() will be undefined in this case
                    return res.status(404).json({ success: false, msg: 'Data not found' });
                }
            case 'DELETE':
                await deleteDoc(doc(AssignmentsCollection, aid));
                return res.status(200).json({ success: true, msg: 'Deleted' });

            default:
                return res.status(405).json({ success: false, msg: 'Method not allowed' });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, msg: 'Internal Server Error' });
    }
}

export default handler;
