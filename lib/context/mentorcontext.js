// withAuth.js
import React, { useEffect } from 'react';
import { auth } from "@/config/firebaseconfig";
import { onAuthStateChanged } from "firebase/auth";
import { useRouter } from 'next/router';

const withAuth = (WrappedComponent, providedRoute) => {
  const AuthenticatedComponent = (props) => {
    const router = useRouter();
    useEffect(() => {
      // Check if the user is authenticated on Firebase
      const unsubscribe = onAuthStateChanged(auth, async (user) => {
        if (!user) {
          // Redirect to the login page if the user is not authenticated
          
          router.replace(providedRoute);
        }
      });

      // Clean up the listener when the component is unmounted
      return () => unsubscribe();
    }, []);

    // Render the wrapped component if the user is authenticated
    return <WrappedComponent {...props} />;
  };

  return AuthenticatedComponent;
};

export default withAuth;
