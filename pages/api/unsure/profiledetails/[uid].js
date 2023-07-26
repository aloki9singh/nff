
import { deleteDoc, doc, getDoc, updateDoc } from 'firebase/firestore';
import { profileDetailscollection } from '@/config/firebaseconfig';

export default async function handler(req, res) {
    const { uid } = req.query;

    try {
        switch (req.method) {
            case 'PATCH':
                const data = req.body;
                const userRef = doc(profileDetailscollection, uid);
                await updateDoc(userRef, data);
                return res.status(200).json({ success: true, msg: 'Updated' });

            case 'GET':
                const docRef = doc(profileDetailscollection, uid);
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    return res.status(200).json({ success: true, user: { ...docSnap.data() } });
                } else {
                    // doc.data() will be undefined in this case
                    return res.status(200).json({ success: false, msg: 'Data not found' });
                }

            case 'DELETE':
                await deleteDoc(doc(profileDetailscollection, uid));

                return res.status(200).json({ success: true, msg: 'Deleted' });

            default:
                return res.status(401).json({ success: false, msg: 'Method not allowed' });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, msg: 'Internal Server Error' });
    }
}
