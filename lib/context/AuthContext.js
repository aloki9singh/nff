import React from 'react';
import {
  onAuthStateChanged,
} from 'firebase/auth';
import { auth, db } from '@/config/firebaseconfig';
import { doc, getDoc } from 'firebase/firestore';

export const AuthContext = React.createContext({});

export const useAuthContext = () => React.useContext(AuthContext);

async function getUserProfile(uid) {
  const user = await getDoc(doc(db, "profileDetails", uid));
  return user.data();
}


export const AuthContextProvider = ({
  children,
}) => {
  const [user, setUser] = React.useState();
  const [userProfile, setUserProfile] = React.useState(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }

    });

    return () => unsubscribe();
  }, []);

  React.useEffect(() => {
    if (user === null) {
      setUserProfile(null);
      setLoading(false);
      return;
    }

    if (!user) return;

    getUserProfile(user.uid).then((profile) => {
      setUserProfile(profile);
      setLoading(false);
    });
  }, [user]);


  return (
    <AuthContext.Provider value={{ user, loading, userProfile }}>
      {loading ? <div>Loading...</div> : children}
    </AuthContext.Provider>
  );
};