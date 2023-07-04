import { auth } from "@/config/firebaseconfig";
import { onAuthStateChanged } from "firebase/auth";
import { Router, useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const profile = () => {
    const[user,setUser]=useState({})
  
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      console.log(currentUser);
      setUser(currentUser);
    });
    return () => {
      unsubscribe();
    };
  }, []);
  if (!user) {
    return null;
  }
  return <div>profile</div>;
};

export default profile;
