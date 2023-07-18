import React from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth, db } from '@/config/firebaseconfig';
import { doc, getDoc, onSnapshot } from 'firebase/firestore';
import { useRouter } from 'next/router';

export const AuthContext = React.createContext({});

export const useAuthContext = () => React.useContext(AuthContext);

export async function getUserProfile(uid) {
  const user = await getDoc(doc(db, 'allusers', uid));

  if (!user.exists()) return null;

  return user.data();
}

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = React.useState();
  const [userProfile, setUserProfile] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const router = useRouter();

  React.useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
        // router.push('/alpha/login');
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

    onSnapshot(doc(db, 'allusers', user.uid), (doc) => {
      if (doc.exists()) {
        setUserProfile(doc.data());
        setLoading(false);
      } else {
        setUserProfile(null);
        setLoading(false);
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return (
    <AuthContext.Provider value={{ user, loading, userProfile }}>
      {loading ? <div>Loading...</div> : children}
    </AuthContext.Provider>
  );
};

export const getUserName = (user) => {
  if (!user) return "Guest";

  console.log("user", user)
  const name = `${user.name?.first} ${user.name?.last || ""}`;
  return name;
};
