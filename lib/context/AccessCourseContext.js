// withAuth.js
import React, { useEffect, useState } from "react";
import {
    getDoc,
    updateDoc,
    doc,
  } from "firebase/firestore";
import { db } from "@/config/firebaseconfig";


const CourseAccess = (uid) => {
    const [userSubsribed, setUserSubsribed] = useState(false);
    const [isTrialValid, setIsTrialValid] = useState(false);

    useEffect(() => {
        // Check if the user is authenticated on Firebase
        const fetchUserData = async () => {
            try {

                const userRef = doc(db, "allusers", uid); // searching if user exists or not
                const docSnap = await getDoc(userRef).then((docsnap) => {
                    if (docsnap.exists()) {
                        const userd = docsnap.data();
                        setUserSubsribed(userd.courseAccess);
                        setIsTrialValid(userd.trialValid);
                        const endDate = new Date(userd.trial.trialEndDate.seconds * 1000);
                        const today = new Date();
                        // console.log(endDate > today);
                        if (userd.trialValid == false) {
                            if (endDate < today) {
                                // console.log("Trial Ended");
                                updateDoc(userRef, { courseAccess: false });
                            }
                            else {
                                 console.log(userd.trial.trialEndDate, today);
                                // console.log("Trial is running ");
                            }
                        }
                    }
                    else {
                        console.log("user not found");
                    }
                });

            } catch (error) {
                console.error("Error fetching User data:", error);
                setUserSubsribed(null);
            }
        };

      fetchUserData();
    }, [uid]);
    
    return {userSubsribed, isTrialValid};
};

export default CourseAccess;
