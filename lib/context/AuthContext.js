import React from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "@/config/firebaseconfig";
import { collection, doc, getDoc, onSnapshot } from "firebase/firestore";
import { useRouter } from "next/router";
import { HashLoader } from "react-spinners";

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
  const [joinedCourses, setJoinedCourses] = React.useState([]);

  const router = useRouter();

  React.useEffect(() => {
    const unsubscribeAuthState = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });

    return () => {
      unsubscribeAuthState();
    };
  }, []);

  React.useEffect(() => {
    if (user === null) {
      setUserProfile(null);
      setLoading(false);
      return;
    }

    if (!user) return;

    const unsubscribeUserProfile = onSnapshot(
      doc(db, "allusers", user.uid),
      (doc) => {
        if (doc.exists()) {
          setUserProfile(doc.data());
          setLoading(false);
        } else {
          setUserProfile(null);
          setLoading(false);

          // router.push('/beta/profiledetails');
        }
      }
    );

    return () => {
      unsubscribeUserProfile();
    };
  }, [user]);

  React.useEffect(() => {
    if (!user) return;
    const unsubscribeJoinedCourses = onSnapshot(
      collection(db, "allusers", user.uid, "joinedCourses"),
      (querySnapshot) => {
        let arr = [];
        querySnapshot.forEach((doc) => {
          arr.push(doc.data());
        });
        setJoinedCourses(arr);
      }
    );

    return () => {
      unsubscribeJoinedCourses();
    };
  }, [user]);

  return (
    <AuthContext.Provider value={{ user, loading, userProfile, joinedCourses }}>
      {loading ? (
        <div style={{ pointerEvents: "none", zIndex: 1 }}>
          <div className="absolute top-[50%] left-[50%] transform -translate-x-1/2 -translate-y-1/2">
            <HashLoader color="#E1348B" size={80} />
          </div>
        </div>
      ) : (
        children
      )}
    </AuthContext.Provider>
  );
};

export const getUserName = (user) => {
  if (!user) return "Guest";

  const name = `${user.name?.first} ${user.name?.last || ""}`;
  return name;
};

// import React from "react";
// import { onAuthStateChanged } from "firebase/auth";
// import { auth, db } from "@/config/firebaseconfig";
// import { collection, doc, getDoc, onSnapshot } from "firebase/firestore";
// import { useRouter } from "next/router";

// export const AuthContext = React.createContext({});

// export const useAuthContext = () => React.useContext(AuthContext);

// export async function getUserProfile(uid) {
//   const user = await getDoc(doc(db, "allusers", uid));

//   if (!user.exists()) return null;

//   return user.data();
// }

// export const AuthContextProvider = ({ children }) => {
//   const [user, setUser] = React.useState();
//   const [userProfile, setUserProfile] = React.useState(null);
//   const [loading, setLoading] = React.useState(true);
//   const [joinedCourses, setJoinedCourses] = React.useState([]);

//   const router = useRouter();

//   React.useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, (user) => {
//       if (user) {
//         setUser(user);
//       } else {
//         setUser(null);
//         // router.push('/alpha/login');
//       }
//     });

//     return () => unsubscribe();
//   }, []);

//   React.useEffect(() => {
//     if (user === null) {
//       setUserProfile(null);
//       setLoading(false);
//       return;
//     }

//     if (!user) return;

//     onSnapshot(doc(db, "allusers", user.uid), (doc) => {
//       if (doc.exists()) {
//         setUserProfile(doc.data());
//         setLoading(false);
//       } else {
//         setUserProfile(null);
//         setLoading(false);

//           router.push('/beta/profiledetails')
//       }
//     });
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [user]);

//   React.useEffect(() => {
//     if (!user) return;
//     onSnapshot(
//       collection(db, "allusers", user.uid, "joinedCourses"),
//       (querySnapshot) => {
//         let arr = [];
//         querySnapshot.forEach((doc) => {
//           arr.push(doc.data());
//         });
//         setJoinedCourses(arr);
//       }
//     );
//   }, [user]);

//   return (
//     <AuthContext.Provider value={{ user, loading, userProfile, joinedCourses }}>
//       {loading ? <div>Loading...</div> : children}
//     </AuthContext.Provider>
//   );
// };

// export const getUserName = (user) => {
//   if (!user) return "Guest";

//   console.log("user", user);
//   const name = `${user.name?.first} ${user.name?.last || ""}`;
//   return name;
// };
