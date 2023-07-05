// needs rechecking and checked by Satyabrat Ojha
// can't find the file its used and can't verify images used
// import db fixed

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
// import { db } from '../../config/firebaseConfig';
import { db } from "../../../config/firebaseconfig";
import { collection, getDocs, query } from "firebase/firestore";

export default function StudyMaterialCard() {
  const [material, setMaterial] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const q = query(collection(db, "studyMaterial"));
      const materialSnapshot = await getDocs(q);
      const materialData = materialSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setMaterial(materialData);
    };
    fetchData();
  }, []);
  const menuItems = [...new Set(material.map((Val) => Val.title))];

  console.log(menuItems);
  const filteredMaterial = selectedOption
    ? material.filter((item) => item.title === selectedOption)
    : material;

  return (
    <div className="h-[98%] w-full">
      <div className="w-fit mx-auto p-8">
        <select onChange={(e) => setSelectedOption(e.target.value)}>
          <option disabled selected hidden>
            Select an option
          </option>
          {menuItems.map((item) => (
            <option className="p-4" key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
      </div>

      <div className="flex justify-center md:grid md:grid-cols-3 flex-wrap flex-col-3 gap-10 m-5 ">
        {filteredMaterial.map((study) => (
          <Link key={study.id} href="studyMaterial">
            <div className="rounded-2xl border-2 border-white shadow-lg bg-[#37393D] w-[400px] max-[420px]:w-fit md:gap-6">
              <div className="flex justify-between items-center">
                <div className="m-3 w-[200px] mx-auto rounded-2xl p-3 bg-gradient-to-r from-[#673CAF] to-[#DA2E8B]">
                  <Image
                    src="/pagesgraphics/student/coursedescription/laptop.svg"
                    width={90}
                    height={90}
                    alt="course"
                    className="mx-auto"
                  />
                  <h1 className="text-white w-full text-sm font-medium text-center">
                    {study.title}
                  </h1>
                </div>
                <div className="text-sm text-white mr-8 space-y-6">
                  <p className="mr-2 text-xs flex items-center gap-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-3 h-3"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
                      />
                    </svg>
                    {`${study.pdf} pdf`}
                  </p>
                  <p className="mr-2 text-xs flex items-center gap-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-3 h-3"
                    >
                      <path
                        strokeLinecap="round"
                        d="M15.75 10.5l4.72-4.72a.75.75 0 011.28.53v11.38a.75.75 0 01-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25h-9A2.25 2.25 0 002.25 7.5v9a2.25 2.25 0 002.25 2.25z"
                      />
                    </svg>
                    {`${study.video} videos`}
                  </p>
                  <p className="mr-2 text-xs flex items-center gap-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-5 h-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244"
                      />
                    </svg>
                    {`${study.link} shared links`}
                  </p>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
