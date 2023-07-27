import { v4 as uuidv4 } from 'uuid'; // Import uuid library
// import { collection, addDoc } from 'firebase/firestore';
import { collection, setDoc, doc, getDoc } from 'firebase/firestore';
import { transporter } from '@/config/nodemailer';
import { db } from '@/config/firebaseconfig';
export default async function sendEmail(req, res) {
  const data = req.body;

  const verificationKey = uuidv4();
  // await addDoc(collection(db, 'users'), { email: data.email, verificationKey });
  // Check if document with email as document ID already exists
  const docRef = doc(db, 'allusers', data.email);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    // If document already exists, update verification key
    await setDoc(
      docRef,
      { email: data.email, verificationKey },
      { merge: true }
    );
  } else {
    // If document does not exist, create new document with email as document ID
    await setDoc(docRef, { email: data.email, verificationKey });
  }

  try {
    await transporter.sendMail({
      from: process.env.EMAIL,
      to: data.email,
      subject: 'Verify your email',
      text: `<p>Welcome, ${data.displayName}! Thank you for signing up to NeatSkills.</p>`,
      html: `<p>Please click the following button to verify your email:</p>
      <a href="${process.env.NEXT_PUBLIC_BASEURL}/beta/profilecontinue?email=${data.email}&key=${verificationKey}" style="display: inline-block; padding: 12px 24px; background-color: #007bff; color: #fff; text-decoration: none;">Verify Email</a>`,
    });
    console.log('verification email sent successfully!', data);
    res.status(200).json({ success: true });
  } catch (error) {
    console.error('Failed to send verification email:', error);
    res.status(500).json({ success: false });
  }
}
