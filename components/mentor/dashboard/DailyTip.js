import { DailyTipsCollection, db } from "@/config/firebaseconfig";
import { useAuthContext } from "@/lib/context/AuthContext";
import {
  addDoc,
  serverTimestamp,
  arrayUnion,
  updateDoc,
  FieldValue,
  getDocs,
  doc,
  collection,
  query,
  orderBy,
  limit,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { AiOutlineEdit } from "react-icons/ai";

function DailyTip() {
  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState("");
  const [lastTip, setLastTip] = useState(null);
  const { userProfile } = useAuthContext();
  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleTextChange = (event) => {
    setText(event.target.value);
  };

  const handleSaveClick = async () => {
    setIsEditing(false);
    const newTip = {
      text,
      createdAt: serverTimestamp(),
      mentorId: userProfile?.uid,
      mentorName: userProfile?.displayName,
    };

    await addDoc(DailyTipsCollection, newTip);
    setLastTip(newTip); // Update the lastTip state with the new tip
  };

  useEffect(() => {
    const fetchLastTip = async () => {
      const DailyTipsCollectionRef = collection(db, "dailytip");
      const tipsQuery = query(
        DailyTipsCollectionRef,
        orderBy("createdAt", "desc"),
        limit(1)
      );
      const querySnapshot = await getDocs(tipsQuery);

      querySnapshot.forEach((doc) => {
        setLastTip(doc.data());
      });
    };

    fetchLastTip();
  }, []);

  return (
    <div className="bg-[#373A41] rounded-[20px] mb-10 mt-[-20px] md:mt-0">
      <div className="md:h-80 h-full pb-5  rounded-2xl bg-[#373A41] text-white">
        <div className="mt-4 items-center">
          <h1 className="text-xl flex justify-between px-8 text-center pt-10 md:pb-10 pb-5">
            <p>Daily Tip</p>
            {isEditing ? (
              <button className="text-white" onClick={handleSaveClick}>
                Save
              </button>
            ) : (
              <button className="text-white" onClick={handleEditClick}>
                <AiOutlineEdit />
              </button>
            )}
          </h1>

          <div className="mx-5 ">
            {isEditing ? (
              <textarea
                className="text-l  w-full  font-semibold text-center  py-5 bg-[#2E3036] rounded-[10px]  px-2   overflow-y-hidden md:h-40"
                value={text}
                onChange={handleTextChange}
                placeholder="Write a short daily tip..."
              />
            ) : (
              <div>
                {lastTip ? (
                  <p className="text-l font-semibold text-center md:w-[250px]  m-auto px-2 overflow-scroll scrollbar-hide  py-5 bg-[#2E3036] rounded-[10px] md:h-40 h-auto  align-middle  scrollbar-hide ">
                    {lastTip.text}
                  </p>
                ) : (
                  <p className="text-l text-gray-500 font-semibold text-center md:w-[250px]  m-auto px-2 overflow-scroll scrollbar-hide  py-5 bg-[#2E3036] rounded-[10px] md:h-40 h-auto  align-middle  scrollbar-hide ">
                    No tips available
                  </p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default DailyTip;
