import { useEffect, useState } from "react";

import { auth } from "@/config/firebaseconfig";

import { useAuthContext } from "@/lib/context/AuthContext";
import { removeDomainFromEmail } from "@/lib/exportablefunctions";

export default function Progress({ percentage }) {
  const { userProfile, user } = useAuthContext();
  // console.log(user);
  return (
    <div className="w-full mx-auto py-3">
      <div className="text-white  p-2">
        <div className="flex justify-between items-end m-1">
          {user?.displayName ? (
            <h1 className="lg:text-2xl font-semibold">
              Welcome, {user && user.displayName}👋
            </h1>
          ) : (
            <h1 className="text-2xl font-semibold">Welcome, {user && removeDomainFromEmail(user.email)}👋</h1>
          )}
          {user?.displayName ? (
            <h1 className="font-semibold">{`${percentage}`}</h1>
          ) : (
            <h1 className="font-semibold">0%</h1>
          )}
        </div>
        <div className="h-2.5 w-full rounded-md my-2 bg-[#0d0e14] flex">
          {user?.displayName ? (
            <div
              style={{
                width: `${percentage}`,
              }}
              className={`h-2.5  rounded-md bg-[#E1348B]`}
            ></div>
          ) : (
            <div className={`h-2.5 w-[0] rounded-md bg-[#E1348B]`}></div>
          )}
        </div>
        <h1 className="text-xs pl-2">Work Progress</h1>
      </div>
    </div>
  );
}
