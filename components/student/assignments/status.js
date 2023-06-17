import { useEffect, useState } from 'react';
import { auth } from '../config/firebaseConfig';
import { onAuthStateChanged } from 'firebase/auth';

export default function Progress({ percentage }) {
  const [user, setUser] = useState({});

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      console.log(currentUser);
      setUser(currentUser);
    });
    return () => {
      unsubscribe();
    };
  });

  return (
    <div className="w-[100%] mx-auto">
      <div className="text-white w-[90%] p-2">
        <div className="flex justify-between items-end m-1">
          {user?.displayName ? (
            <h1 className="lg:text-2xl font-semibold">
              Welcome, {user.displayName}👋
              
            </h1>
          ) : (
            <h1 className="text-2xl font-semibold">Welcome, Guest👋</h1>
            
          )
          }
          {user?.displayName ? (
            <h1 className="font-semibold">{`${percentage}`}</h1>
          ):(
          <h1 className="font-semibold">0%</h1>
          )}
          
        </div>
        <div className="h-2.5 w-full rounded-md my-2 bg-[#0d0e14] flex">
        {user?.displayName ? (
          <div
            className={`h-2.5 w-[${percentage}] rounded-md bg-[#E1348B]`}
          ></div>
        ):(
          <div
            className={`h-2.5 w-[0] rounded-md bg-[#E1348B]`}
          ></div>
        )}
        </div>
        <h1 className="text-xs pl-2">Work Progress</h1>
      </div>
    </div>
  );
}
