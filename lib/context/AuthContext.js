import React, { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "@/config/firebaseconfig";
import { collection, doc, getDoc, onSnapshot } from "firebase/firestore";
import { useRouter } from "next/router";
import { HashLoader } from "react-spinners";
import useOnlineStatus from "@/hooks/useOnlineStatus";
import { useErrorBoundary } from "react-error-boundary";
import { toast } from "react-hot-toast";

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
        console.log("email", user.email)
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


  useEffect(() => {

    if (router.pathname === '/beta') {
      if (user && userProfile) {
        if (userProfile?.role === "student") {
          router.push("/beta/dashboard");
        } else if (userProfile?.role === "mentor") {
          router.push("/meta/dashboard");
        }
        return;
      }
      if (user === null) {
        router.push("/beta/login");
      }
    }

  }, [user, userProfile, router]);

  const online = useOnlineStatus()
  const { showBoundary } = useErrorBoundary();

  useEffect(() => {

    if (!online) {

      // showBoundary(
      //   {
      //     message: "You are offline. Please check your internet connection and try again."
      //   }
      // );
      toast("You are offline. Please check your internet connection and try again.", {

        icon: "📡",
        style: {
          borderRadius: '10px',
          background: '#333',
          color: '#fff',
        },
        duration: 5000,
        position: 'top-right',
      })

    } else {
      // reset
    }


  }, [online, showBoundary]);


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
