import { profileDetailscollection } from "@/config/firebaseconfig";
import { addDoc, doc, getDoc, getDocs, serverTimestamp, setDoc, updateDoc } from "firebase/firestore";

async function handler(req, res) {
    const { method } = req;
    res.setHeader('Access-Control-Allow-Origin', `${process.env.NEXT_PUBLIC_BASEURL}`);
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
    
    try {
        switch (method) {
        case "GET":
            const querySnapshot = await getDocs(profileDetailscollection);
            const profileDetails = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
            }));
            return res.status(200).json({ success: true, profileDetails });
    
        case "POST":
            const data = req.body;
            const uid = data.uid; // this is added for user reference if user exists
            const userRef = doc(profileDetailscollection, uid); // searching if user exists or not
            const docSnap = await getDoc(userRef);
            if (docSnap.exists()) {
              await updateDoc(userRef, data); // exist condition update the doc
            } else {
              // taking same user reference trying to add user
              await setDoc(userRef, {
                ...data,
                createdAt: serverTimestamp(),
              });
            }
            // const data = req.body;
            // const docRef = await addDoc(profileDetailscollection, {
            // ...data,
            // createdAt: serverTimestamp(),
            // });
            return res
            .status(200)
            .json({ success: true, profileDetails: { ...data, id: docRef.id } });
    
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