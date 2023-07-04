import React from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "@/config/firebaseconfig";
import { doc, getDoc } from "firebase/firestore";
import { useRouter } from "next/router";

export const AuthContext = React.createContext({});

export const useAuthContext = () => React.useContext(AuthContext);

export async function getUserProfile(uid) {
  const user = await getDoc(doc(db, "allusers", uid));

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

    getUserProfile(user.uid).then((profile) => {
      if (profile === null) {
        setUserProfile(null);
        setLoading(false);
        router.push("/beta/profiledetails");
        return;
      }

      setUserProfile(profile);
      setLoading(false);
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
  if (!user) return null;

  return user.name?.first + user.name?.middle
    ? " " + user.name?.middle
    : "" + user.name?.last
    ? " " + user.name?.last
    : "";
};
