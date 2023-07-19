import { auth, db } from "@/config/firebaseconfig";
import { signInWithEmailAndPassword } from "firebase/auth";
import { getDoc, doc } from "firebase/firestore";

async function handleLogin(req, res) {
  const { email, password, authCode } = req.body;

  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const { user } = userCredential;

    // Retrieve user document from the database
    const userDoc = await getDoc(doc(db, "allusers", user.uid));
    const userData = userDoc.data();

    if (userData.authCode !== authCode) {
      return res.status(400).json({ error: "Invalid authentication code" });
    }

    // Check if the user has the required role
    if (userData.role !== "admin") {
      return res.status(400).json({ error: "Unauthorized User" });
    }

    // Successful login
    return res.status(200).json({ success: true, user: userData });
  } catch (error) {
    if (error.code === "auth/invalid-email") {
      return res.status(400).json({ error: "Invalid user" });
    } else {
      console.log("Error logging in:", error.message);
      return res.status(500).json({ error: "Internal server error" });
    }
  }
}

export default handleLogin;
