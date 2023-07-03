import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/config/firebaseconfig';

export default async function getStudentData(req, res) {
  try {
    // Fetch student data from Firebase
    const querySnapshot = await getDocs(collection(db, 'students'));
    const students = [];

    querySnapshot.forEach((doc) => {
      const student = doc.data();
      students.push(student);
    });

    res.status(200).json({ success: true, students });
  } catch (error) {
    console.error('Failed to fetch student data:', error);
    res.status(500).json({ success: false, error: error.message });
  }
}
