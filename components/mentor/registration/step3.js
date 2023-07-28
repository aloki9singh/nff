// Verified by Pradhumn
import { db } from "@/config/firebaseconfig";
import { collection, getDocs } from "firebase/firestore";
import React, { useState, useEffect } from "react";

const MentorStep3 = ({ setRegStepCount, regStepCount }) => {
  const [input, setInput] = useState({
    interest: "",
    others: "",
    reason: "",
    aspiring: "",
  });
  const [user, setUser] = useState([]);
  const [dataFetched, setDataFetched] = useState([]);
  const [skill, setskill] = useState("");
  const [skillsArr, setskillsArr] = useState([]);
  const [id, setId] = useState("");
  const setData = (e) => {
    const { name, value } = e.target;
    setInput((preval) => {
      return {
        ...preval,
        [name]: value,
      };
    });
  };

  const skillsArrwithoutBlank2 = skillsArr.filter((e) => e !== "");
  const skillsArrwithoutBlank = skillsArrwithoutBlank2.filter(
    (e, i) => i !== id
  );

  const addInputData = async (e) => {
    e.preventDefault();
    if (input.reason == "") {
      alert("Field Empty!");
    } else if (skillsArr.length < 5) {
      alert("Min 5-6 skills are required");
    } else {
      // const user = JSON.parse(localStorage.getItem("userdata"));

      (user.interest = input.interest),
        (user.others = input.others),
        (user.skills = skillsArrwithoutBlank),
        (user.reason = input.reason),
        (user.aspiring = input.aspiring);
      localStorage.setItem("userdata", JSON.stringify(user));
      setRegStepCount(4);
    }
  };
  const getData = async () => {
    // if (!dataFetched) {
    const courseCollection = collection(db, "courses");
    const courseInfo = await getDocs(courseCollection);
    const courseData = courseInfo.docs.map((doc) => doc.data());
    // setAssignCourse(courseData.filter((ele) => ele?.mentorid === user.uid));
    setDataFetched(courseData);
    // }
  };
  // console.log(dataFetched);
  const deleteItem = (itemToDelete) => {
    // Create a new array excluding the item to delete
    const updatedArray = skillsArr.filter((item) => item !== itemToDelete);

    // Update the state with the new array
    setskillsArr(updatedArray);
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      setUser(JSON.parse(localStorage.getItem("userdata")));
    }
    getData();
  }, []);

  return (
    <>
      <div className="flex h-screen">
        <div className="w-full h-full flex flex-col  ">
          <div className="  text-white grow flex p-4 items-center justify-center">
            <div className="w-[100%] flex rounded-[30px] h-fit">
              <div className="flex-[2_2_0%]  px-9 space-y-10  bg-[#222222] rounded-[30px] ml-[-15px] mr-[-13px] md:ml-[20px] md:mr-[20px]  ">
                <div className=" flex justify-between text-xl mt-10 mb-[-20px] ">
                  <div>
                    <button
                      onClick={() => setRegStepCount(2)}
                      className=" rounded text-xs p-2 px-4 bg-[#505057]"
                    >
                      {"<- "}Back
                    </button>
                  </div>
                  <div className="flex gap-20">
                    <div
                      onClick={() => setRegStepCount(1)}
                      className={`${
                        regStepCount == 1 ? `text-[#E1348B]` : "text-[#6E294C]"
                      }  mt-3 hidden md:block`}
                    >
                      Step1
                    </div>
                    <div
                      onClick={() => setRegStepCount(2)}
                      className={`${
                        regStepCount == 2 ? `text-[#E1348B]` : "text-[#6E294C]"
                      }  mt-3 hidden md:block`}
                    >
                      Step2
                    </div>
                    <div
                      onClick={() => setRegStepCount(3)}
                      className={`${
                        regStepCount == 3 ? `text-[#E1348B]` : "text-[#6E294C]"
                      }  mt-3 hidden md:block`}
                    >
                      Step3
                    </div>
                  </div>
                  <div></div>
                </div>
                <hr className="mt-6 border-b-1 border-blueGray-300 mb-5" />

                <div className=" md:mx-20 ">
                  <h1 className="text-2xl my-10    font-Inter text-[#E1348B]">
                    Area of Expertise
                  </h1>

                  {/* skills */}
                  <div className="md:flex">
                    <div className="mb-10 md:flex items-center space-y-4    w-full ">
                      <label className="block text-sm font-medium text-white mt-4 mr-5">
                        Feild of Interest:
                      </label>
                      {/* <select
                        name="interest"
                        onChange={setData}
                        value={input.interest}
                        className="focus:outline-none text-white text-sm rounded-lg block w-full p-4  bg-[#333333] border border-[#5F6065] placeholder-[#5F6065] focus:ring-blue-500 focus:border-blue-500"
                      >
                        <option value="" className="text-xs">
                          Select from this List
                        </option>

                        <option
                          className="text-xs cursor-pointer"
                          value="Web Developer"
                        >
                          Web Developer
                        </option>
                        <option
                          className="text-xs cursor-pointer"
                          value="C++ & DSA"
                        >
                          C++ & DSA
                        </option>
                        <option
                          className="text-xs cursor-pointer"
                          value="UI/UX Designing"
                        >
                          UI/UX Designing
                        </option>
                        <option
                          className="text-xs cursor-pointer"
                          value="Yoga & Wellness"
                        >
                          Yoga & Wellness
                        </option>
                        <option
                          className="text-xs cursor-pointer"
                          value="Painting"
                        >
                          Painting
                        </option>
                        <option
                          className="text-xs cursor-pointer"
                          value="Graphic Designing"
                        >
                          Graphic Designing
                        </option>
                        <option
                          className="text-xs cursor-pointer"
                          value="Video Shooting"
                        >
                          Video Shooting
                        </option>
                        <option
                          className="text-xs cursor-pointer"
                          value="Content Writing"
                        >
                          Content Writing
                        </option>
                        <option
                          className="text-xs cursor-pointer"
                          value="Marketing"
                        >
                          Marketing
                        </option>
                        <option
                          className="text-xs cursor-pointer"
                          value="Basic Medical Science"
                        >
                          {" "}
                          Basic Medical Science{" "}
                        </option>
                        <option
                          className="text-xs cursor-pointer"
                          value="Yoga & Wellness"
                        >
                          Yoga & Wellness
                        </option>
                        <option
                          className="text-xs cursor-pointer"
                          value="Sketching"
                        >
                          Sketching
                        </option>
                        <option
                          className="text-xs cursor-pointer"
                          value="Financial Literacy of Planning"
                        >
                          Financial Literacy of Planning
                        </option>
                        <option
                          className="text-xs cursor-pointer"
                          value=" Sound / Audio Engineering"
                        >
                          Sound / Audio Engineering
                        </option>
                        <option className="text-xs cursor-pointer" value="IOT">
                          IOT
                        </option>
                        <option
                          className="text-xs cursor-pointer"
                          value="3D Video Editing"
                        >
                          3D Video Editing
                        </option>
                        <option
                          className="text-xs cursor-pointer"
                          value="AI/ML"
                        >
                          AI/ML
                        </option>
                        <option
                          className="text-xs cursor-pointer"
                          value="Gaming"
                        >
                          Gaming
                        </option>
                        <option
                          className="text-xs cursor-pointer"
                          value="Poetry"
                        >
                          Poetry
                        </option>
                        <option
                          className="text-xs cursor-pointer"
                          value="Thesis of Book Writing"
                        >
                          Thesis of Book Writing
                        </option>
                        <option
                          className="text-xs cursor-pointer"
                          value="Productivity of Basic Software"
                        >
                          Productivity of Basic Software
                        </option>
                      </select> */}
                      <select
                        name="interest"
                        onChange={setData}
                        value={input.interest}
                        className="focus:outline-none text-white text-sm rounded-lg block w-full p-4 bg-[#333333] border border-[#5F6065] placeholder-[#5F6065] focus:ring-blue-500 focus:border-blue-500"
                      >
                        <option value="" className="text-xs">
                          Select from this List
                        </option>
                        {dataFetched?.map((e) => (
                          <option
                            key={e.id} // Use a unique key for each option
                            className="text-xs cursor-pointer"
                            value={e.title}
                          >
                            {console.log(e.id)}
                            {e.title}
                          </option>
                        ))}
                      </select>
                    </div>
                    {/* <div className="mb-10 md:flex items-center space-y-4    w-full">
                      <label className="block text-sm font-medium text-white mt-4 mr-12 md:ml-5">
                        Others:
                      </label>
                      <input
                        type="text"
                        className="focus:outline-none text-white text-sm rounded-lg block w-full p-4  bg-[#333333] border border-[#5F6065] placeholder-[#5F6065] focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Type if not mention in the list"
                        name="others"
                        onChange={setData}
                        value={input.others}
                      />
                    </div> */}
                  </div>
                  <div className="mb-10 md:flex items-center space-y-4    w-full">
                    <label className="block text-sm font-medium text-white mt-4 mr-12">
                      Skills:
                    </label>
                    <div className="text-white text-sm rounded-lg block w-full p-4  bg-[#333333] border border-[#5F6065] placeholder-[#5F6065] focus:ring-blue-500 focus:border-blue-500">
                      <div className="flex flex-wrap    justify-around align-middle mb-4 gap-2">
                        {skillsArrwithoutBlank.map((e, i) => (
                          <div
                            key={i}
                            className="border  border-[#823DA2] rounded-[10px] px-2 py-2 text-sm "
                          >
                            {e}{" "}
                            <span
                              className="text-l ml-5 "
                              onClick={() => deleteItem(e)}
                            >
                              x
                            </span>
                          </div>
                        ))}
                      </div>
                      <input
                        type="text"
                        className="text-white text-center text-sm rounded-lg block w-[50%] m-auto p-4  bg-[#333333]  placeholder-[#5F6065] focus:outline-none"
                        onChange={(e) => {
                          setskill(e.target.value);
                        }}
                        placeholder="Type here "
                        onKeyPress={(e) => {
                          if (
                            e.key === "Enter" ||
                            e.key === "Go" ||
                            e.key === "Up Next" ||
                            e.type === "click" ||
                            e.type == " "
                          ) {
                            setskillsArr([...skillsArr, skill]);
                            setskill("");
                          }
                        }}
                        value={skill}
                        id=""
                      />
                      <div className="text-center">
                        <button
                          className="md:hidden  text-white text-center text-sm rounded-lg px-2 py-1 bg-[#A145CD]"
                          onClick={() => {
                            if (skill.trim() !== "") {
                              setskillsArr([...skillsArr, skill.trim()]);
                              setskill("");
                            }
                          }}
                        >
                          Add Skill
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* ques 1 */}
                  <div className="mb-10">
                    <label
                      htmlFor="universityName"
                      className="block text-sm font-medium text-white mb-1"
                    >
                      What is the reason you choose your field of Interest?
                    </label>
                    <input
                      type="text"
                      className="focus:outline-none text-white text-sm rounded-lg block w-full p-8 bg-[#333333] border border-[#5F6065] placeholder-[#5F6065] focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Write Answer between 30 - 50 words"
                      name="reason"
                      onChange={setData}
                      value={input.reason}
                    />
                  </div>

                  {/* ques 2 */}

                  <div className="mb-10">
                    <label
                      htmlFor="universityName"
                      className="block text-sm font-medium text-white mb-1"
                    >
                      What Aspires you to be a teacher?
                    </label>
                    <input
                      type="text"
                      className="text-white focus:outline-none text-sm rounded-lg block w-full p-8 bg-[#333333] border border-[#5F6065] placeholder-[#5F6065] focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Write Answer between 30 - 50 words"
                      name="aspiring"
                      onChange={setData}
                      value={input.aspiring}
                    />
                  </div>
                </div>

                {/* submit button */}
                <div className="flex justify-end">
                  <button
                    onClick={addInputData}
                    type="submit"
                    className="text-white  bg-[#A145CD] focus:ring-4 focus:outline-none font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center hover:bg-[#93225a] focus:ring-blue-800 my-8"
                  >
                    Preview & Submit
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MentorStep3;
