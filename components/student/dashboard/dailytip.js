import { useState, useEffect } from "react";
import { db } from "../../config/firebaseConfig";
import { collection, getDocs, query } from "firebase/firestore";

export default function DailyTip() {
  const [tip, setTip] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const q = query(collection(db, "dailyTip"));
      const tipSnapshot = await getDocs(q);
      const tipData = tipSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setTip(tipData);
    };
    fetchData();
  }, []);

  return (
    <div className=" md:block absolute right-[35px] top-[550px] w-[371px] h-[148px] min-w-72  mt-389 rounded-2xl bg-[#FFB8DC]">
      {tip.map((item) => (
        <div key={item.id}>
          <div className="text-white font-semibold border border-black w-20 text-center mt-4 mx-6 bg-[#A145CD] py-1 mb-1">
            {item.head}
          </div>
          <p className="mx-6 mb-2 text-lg font-semibold">
            You can omit the data type of a variable by using the auto keyword
            in C++ 11 and later.
          </p>
        </div>
      ))}
    </div>
  );
}
