import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { db } from "../components/config/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import { callEmailApi } from "../lib/api";

const Verify = () => {
  const router = useRouter();

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        const { email, key } = router.query;
        const displayName = email;
        const data = { displayName, email };
        const decodedEmail = decodeURIComponent(email);
        const userRef = doc(db, "users", decodedEmail);
        const userDoc = await getDoc(userRef);

        if (userDoc.exists()) {
          const user = userDoc.data();
          console.log(user);
          const verificationKey = user.verificationKey;
          if (verificationKey === key) {
            // Update email verification status
            await fetch("/api/verifyApi", {
              method: "POST",
              body: JSON.stringify({ email: user.email }),
              headers: { "Content-Type": "application/json" },
            });
            await callEmailApi(data);
            console.log("Success");
            router.push("/profileContinuepage");
          } else {
            console.log("Error: Invalid verification key");
          }
        } else {
          console.log("Error: User not found");
        }
      } catch (error) {
        console.error("Error verifying email:", error);
      }
    };

    verifyEmail();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.query.email, router.query.key]);

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          background: "black",
        }}
      >
        <p style={{ color: "white", fontSize: "48px", textAlign: "center" }}>
          Verifying email...
        </p>
        <p style={{ color: "white", fontSize: "24px", textAlign: "center" }}>
          after verification, please login.
        </p>
        {/* You can customize the UI here, e.g. show a loading spinner */}
      </div>
      {/* You can customize the UI here, e.g. show a loading spinner */}
    </div>
  );
};

export default Verify;
