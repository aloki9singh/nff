// Page not found in given figma , CSS needed to be rechecked.
// This page ui is different from the figma design.

import { IoClose } from "react-icons/io5";
import { useState } from "react";
import {
  collection,
  addDoc,
  serverTimestamp,
  setDoc,
  doc,
} from "firebase/firestore";
import { db } from "@/config/firebaseconfig";
import Link from "next/link";
import Image from "next/image";
import NeatS from "/public/componentsgraphics/schools/login/neatskillslogosample.svg";
import { useAuthContext } from "@/lib/context/AuthContext";
import { useStep } from "@/hooks/useStep";
import IDdraganddrop from "@/components/student/assignments/iddraganddrop";

const numOfMentors = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const mentorLists = ["Dinesh Saini", "Rahul", "Raj", "Ravi"];
const numOfModules = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const categories = ["Web Development", "App Development", "UI/UX", "Others"];

const PlanCourseForm = () => {
  return (
    <>
      {/* course name */}
      <div className="w-full flex flex-col md:flex-row justify-start items-start md:items-center gap-y-2 md:gap-x-2 px-4 mb-8">
        <label className="w-40" htmlFor="">
          Course Title
        </label>
        <input
          type="text"
          placeholder="Enter coures title"
          className="AddMentorInput flex-1  h-10 rounded-lg px-2"
          style={{ background: "#333333" }}
        />
      </div>
      <div className="w-full  flex flex-col md:flex-row justify-start items-start  gap-y-2 md:gap-x-2 px-4 mb-8">
        <label className="w-40" htmlFor="">
          Course Description
        </label>
        <textarea
          type="text"
          placeholder="Enter course description"
          className="AddMentorInput flex-1 h-28 rounded-lg px-2"
          style={{ background: "#333333" }}
        />
      </div>

      {/* duration, session and language */}
      <div className="flex flex-col md:flex-row justify-start items-start  gap-x-10 px-4 mb-8">
        <div className="flex flex-1 flex-row items-center gap-x-2">
          <label className="w-40" htmlFor="">
            Duration
          </label>
          <input
            type="number"
            className="AddMentorInput h-10 rounded-lg px-2 flex-1"
            style={{ background: "#333333" }}
            placeholder="Enter duration in weeks"
          />
        </div>
        <div className="flex flex-1 items-center gap-x-2 px-4">
          <label className="w-40" htmlFor="">
            Lectures
          </label>
          <input
            type="number"
            placeholder="Enter total lectures"
            className="AddMentorInput h-10 rounded-lg px-2 flex-1"
            style={{ background: "#333333" }}
          />
        </div>
      </div>

      {/* level */}
      <div className="w-full hidden md:w-3/4 md:flex flex-col md:flex-row justify-start items-start md:items-center gap-x-2 px-4 mb-8">
        <legend className="w-40" htmlFor="">
          Level :
        </legend>
        <div className="border-2 border-gray-600 px-3 py-1 rounded-lg">
          <input type="radio" name="level" value="Beginner" className="mr-2" />
          <label>Beginner</label>
        </div>
        <div className="border-2 border-gray-600 px-3 py-1 rounded-lg">
          <input
            type="radio"
            name="level"
            value="Intermediate"
            className="mr-2"
          />
          <label>Intermediate</label>
        </div>
        <div className="border-2 border-gray-600 px-3 py-1 rounded-lg">
          <input type="radio" name="level" value="Advanced" className="mr-2" />
          <label>Advanced</label>
        </div>
      </div>

      <div className="flex flex-col md:flex-row justify-start items-start  gap-x-10 px-4 mb-8">
        <div className="flex-1 flex items-center gap-x-4">
          <label className="w-40" htmlFor="">
            Category:
          </label>
          <div className="bg-[#313131] rounded-lg h-10 px-2 flex-1">
            <select
              className="AddMentorInput w-full h-10 bg-[#313131] "
              style={{ background: "#333333" }}
            >
              <option className="text-white/50" disabled selected value="">
                Select a Category
              </option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex-1 flex items-center gap-x-2 px-4">
          <label className="w-40" htmlFor="">
            Language :
          </label>
          <div className="bg-[#313131] rounded-lg h-10 px-2 flex-1">
            <select
              className="AddMentorInput w-full h-10 rounded-lg"
              style={{ background: "#313131" }}
            >
              <option value="English">English</option>
              <option value="Hindi">Hindi</option>
              <option value="Spanish">Spanish</option>
              <option value="french">french</option>
            </select>
          </div>
        </div>
      </div>

      <div className="w-full flex flex-col md:flex-row justify-start items-start md:items-center gap-y-2 md:gap-x-2 px-4 mb-8">
        <label className="w-40" htmlFor="">
          Upload Banner Image
        </label>
        <IDdraganddrop />
      </div>

      {/* number of mentor and lead mentor */}
      {/* <div className="w-full md:w-3/4 flex flex-col md:flex-row justify-start items-start md:items-center gap-y-3 md:gap-x-28 px-4 mb-4 md:mb-8">
    <div className="flex items-center gap-x-4">
      <label htmlFor="" className="text-xs md:text-base">
        Num of Mentor:
      </label>
      <div className="bg-[#313131] rounded-lg h-10 px-2">
        <select
          className="AddMentorInput w-36 md:w-32 h-10 rounded-lg"
          style={{ background: "#313131" }}
          value={numMentor}
          onChange={(e) => setNumMentor(parseInt(e.target.value))}
        >
          <option value="0">0</option>
          {numOfMentors.map((mentorNum) => (
            <option key={mentorNum} value={mentorNum}>
              {mentorNum}
            </option>
          ))}
        </select>
      </div>
    </div>

    <div className="flex gap-x-4 items-center">
      <label htmlFor="" className="text-xs md:text-base">
        Lead Mentor:
      </label>
      <div className="bg-[#313131] rounded-lg h-10 px-2">
        <select
          className="AddMentorInput w-48 md:w-60 h-10 rounded-lg"
          style={{ background: "#313131" }}
          value={leadMentor}
          onChange={(e) => setLeadMentor(e.target.value)}
        >
          <option value="null">Dinesh Saini</option>
          {mentorLists.map((mentor) => (
            <option key={mentor} value={mentor}>
              {mentor}
            </option>
          ))}
        </select>
      </div>
    </div>
  </div> */}

      {/* assistance mentor */}
      {/* <div className="border-2 border-gray-500 px-4 py-2 h-30">
    <div className="flex items-center gap-x-4 mb-4">
      <label htmlFor="" className="text-xs md:text-base">
        Assistant Mentor :
      </label>
      {renderMentorInputs()}
    </div>
    <div className="w-fit md:w-max flex flex-wrap md:flex-nowrap md:flex-row items-center gap-y-2 gap-x-2">
      {assistMentor.map((mentor) => (
        <div
          key={mentor.id}
          className="w-fit px-2 py-1 border-2 flex items-center gap-x-2 border-gray-500 rounded-lg"
        >
          <p>{mentor.name}</p>
          <IoClose onClick={() => removeMentorInput(mentor.id)} />
        </div>
      ))}
    </div>
  </div> */}
    </>
  );
};

const TargetStudentsForm = () => {
  return (
    <>
      <div className="w-full flex flex-col mt-12  gap-y-2 md:gap-x-2 px-4 mb-8">
        <label className="" htmlFor="">
          What will the students learn from your course ?
        </label>
        <textarea
          type="text"
          placeholder="Example, Will learn basics of UI/UX "
          className="AddMentorInput h-28 max-w-4xl rounded-lg px-2"
          style={{ background: "#333333" }}
        />
      </div>
      <div className="w-full flex flex-col mt-12  gap-y-2 md:gap-x-2 px-4 mb-8">
        <label className="" htmlFor="">
          Are there any course requirements or prerequisites ?
        </label>
        <textarea
          type="text"
          placeholder="Example, Have a laptop"
          className="AddMentorInput h-28 max-w-4xl rounded-lg px-2"
          style={{ background: "#333333" }}
        />
      </div>
      <div className="w-full flex flex-col mt-12  gap-y-2 md:gap-x-2 px-4 mb-8">
        <label className="" htmlFor="">
          Who are your target students ?
        </label>
        <textarea
          type="text"
          placeholder="Example, people who are curious about design or beginners"
          className="AddMentorInput h-28 max-w-4xl rounded-lg px-2"
          style={{ background: "#333333" }}
        />
      </div>
    </>
  );
};

const headingContent = [
  {
    title: "Course Details",
    desc: "Fill out this form with correct information to proceed forward. After submission it takes 1-2 weeks to review your application. If you have any query reach out to us at (add email).",
  },
  {
    title: "Target Students",
    desc: "The description you write here will help decide the students decide if your course is the one for them.",
  },
  {
    title: "Create class module",
    desc: "Fill out this form with correct information to proceed forward. After submission it takes 1-2 weeks to review your application.",
  },
];

const Header = ({ currentStep }) => {
  return (
    <div className="w-full flex flex-row items-center justify-between p-2 mb-2">
      <div className="flex-[4]">
        <h3 className="text-3xl font-medium tracking-wide pb-2">
          {headingContent[currentStep - 1].title}
        </h3>
        <p className="text-sm text-white/60">
          {headingContent[currentStep - 1].desc}
        </p>
      </div>
      <div className="flex-1 text-right">
        <button className="px-12 py-3 bg-[#A145CD] rounded-md hover:scale-105 duration-100 transition-all">
          Next
        </button>
      </div>
    </div>
  );
};

const Accordian = ({ title, desc }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="bg-[#333333] p-2 px-3 rounded-md">
      <h2 id="accordion-flush-heading-1">
        <button
          type="button"
          className="flex items-center justify-between w-full py-2 font-medium text-left "
          data-accordion-target="#accordion-flush-body-1"
          aria-expanded="true"
          aria-controls="accordion-flush-body-1"
          onClick={() => setOpen(!open)}
        >
          <span>{title}</span>
          <svg
            data-accordion-icon=""
            className={`w-3 h-3 ${open ? "rotate-180" : ""}  shrink-0`}
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 10 6"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5 5 1 1 5"
            />
          </svg>
        </button>
      </h2>
      <div
        id="accordion-flush-body-1"
        className={`${open ? "" : "hidden"}`}
        aria-labelledby="accordion-flush-heading-1"
      >
        <div className="py-3">
          <p className="text-white/80">{desc}</p>
        </div>
      </div>
    </div>
  );
};

const CourseContentForm = () => {
  const [modules, setModules] = useState([]);
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");

  const addModuleHandler = (e) => {
    e.preventDefault();
    setModules([...modules, { name, desc }]);
    setName("");
    setDesc("");
  };

  return (
    <div className="w-full flex flex-row itesm-start gap-5">
      <form
        onSubmit={addModuleHandler}
        className="flex-1 px-10 py-6  border border-[#5F6065] rounded-xl"
      >
        <div className="w-full flex flex-col gap-y-4 mb-7">
          <label className="" htmlFor="">
            Module Name
          </label>
          <input
            type="text"
            placeholder="Enter module name"
            className="AddMentorInput  rounded-lg px-2"
            style={{ background: "#333333" }}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="w-full flex flex-col gap-y-4 mb-7">
          <label className="" htmlFor="">
            Module Description
          </label>
          <textarea
            type="text"
            placeholder="Enter module description"
            className="AddMentorInput h-60 max-w-4xl rounded-lg px-2"
            style={{ background: "#333333" }}
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
          />
        </div>
        <button className="bg-pink text-white px-10 py-2 rounded-md ">
          Add
        </button>
      </form>
      <div className="flex-1 flex flex-col ">
        <h5>Class module list</h5>
        <div className="flex-1">
          {modules.length === 0 ? (
            <div className="flex h-full items-center justify-center">
              <p className="text-center text-white/60 text-lg">
                No added module
              </p>
            </div>
          ) : (
            <div className="flex flex-col mt-4 gap-y-3">
              {modules.map((module, index) => (
                <div key={index}>
                  <p className="text-xs text-white/70">Module {index + 1}</p>
                  <Accordian title={module.name} desc={module.desc} />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const Sidebar = ({ currentStep = 1, setStep }) => {
  const steps = ["Plan Course", "Target Students", "Create course content"];

  return (
    <div className="mt-8 flex flex-col items-stretch gap-5">
      {steps.map((step, index) => (
        <buttton
          onClick={() => setStep(index + 1)}
          className="py-4 group cursor-pointer transition-colors duration-150"
          key={index}
        >
          <h4
            className={`text-xl ${currentStep === index + 1
                ? "text-primary"
                : "text-primary/60 group-hover:text-primary/90"
              }  font-semibold`}
          >
            Step {index + 1}
          </h4>
          <p
            className={`${currentStep === index + 1
                ? "text-white"
                : "text-white/60 group-hover:text-white/90"
              }`}
          >
            {step}
          </p>
        </buttton>
      ))}
    </div>
  );
};

const CreateCourse = () => {

  // const [numMentor, setNumMentor] = useState(0);
  // const [leadMentor, setLeadMentor] = useState("");
  // const [assistMentor, setAssistMentor] = useState([
  //   { id: 1, name: "Dinesh Saini" },
  //   { id: 2, name: "Rahul" },
  //   { id: 3, name: "Raj" },
  //   { id: 4, name: "Ravi" },
  // ]);

  // const handleAssistanceMentorChange = (index, field, value) => {
  //   const updatedAssistanceMentors = [...assistMentor];
  //   updatedAssistanceMentors[index] = {
  //     ...updatedAssistanceMentors[index],
  //     [field]: value,
  //   };
  //   updatedAssistanceMentors[index] = {
  //     ...updatedAssistanceMentors[index],
  //     id: index + 1,
  //   };
  //   setAssistMentor(updatedAssistanceMentors);
  // };


  // const renderMentorInputs = () => {
  //   const assistanceMentorInputs = Array.from(
  //     { length: numMentor - 1 },
  //     (_, i) => {
  //       const assistanceMentor = assistMentor[i] || {
  //         id: i + 1,
  //         name: "",
  //       };

  //       return (
  //         <div key={i}>
  //           <input
  //             type="text"
  //             value={assistanceMentor.name}
  //             placeholder="Assistant Mentor"
  //             className="AddMentorInput w-1/2 md:w-3/4 h-10 rounded-xl px-2"
  //             onChange={(e) =>
  //               handleAssistanceMentorChange(i, "name", e.target.value)
  //             }
  //             style={{ background: "#333333" }}
  //           />
  //         </div>
  //       );
  //     }
  //   );
  //   return assistanceMentorInputs;
  // };

  // function removeMentorInput(id) {
  //   console.log("removed");
  //   setAssistMentor(assistMentor.filter((m) => m.id !== id));
  // }

  const [currentStep, helpers] = useStep(3);

  const {
    canGoToPrevStep,
    canGoToNextStep,
    goToNextStep,
    goToPrevStep,
    reset,
    setStep,
  } = helpers;

  return (
    <div className="text-white flex flex-col justify-center items-center px-5">
      {/* nav bar */}
      <div className="w-screen border-b-2 border-grey text-center">
        <div className=" flex justify-center gap-x-96 items-center">
          <Link href="/">
            <ul>
              <li className="ml-2  text-2xl uppercase hover:border-b text-white text-center h-[50px] md:h-[60px]">
                <Image
                  src={NeatS}
                  alt="logo"
                  className=" h-full"
                  width={200}
                  height={200}
                />
              </li>
            </ul>
          </Link>
          <div className="justify-start flex gap-2  sm:text-xs  md:text-md">
            <ul className="hidden sm:flex justify-center items-center  text-white sm:gap-0 lg:gap-12 pr-5 ">
              <Link href="/create-category">
                <li className="ml-10 text-md uppercase hover:border-b ">
                  Create Category
                </li>
              </Link>
              <Link href="/create-course">
                <li className="ml-10 text-md uppercase hover:border-b ">
                  Create Course
                </li>
              </Link>
              <Link href="/upload-video">
                <li className="ml-10 text-md uppercase hover:border-b ">
                  Upload video
                </li>
              </Link>
            </ul>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-10 w-full">
        <div className="col-span-2 h-full pl-12 ">
          <Sidebar currentStep={currentStep} setStep={setStep} />
        </div>
        <div className="col-span-8 h-max  p-8 bg-[#222222] rounded-lg mt-4 mb-4">
          <Header currentStep={currentStep} />
          <hr className="border-x-2 border-gray-500 mb-4" />

          {currentStep === 1 && <PlanCourseForm />}

          {currentStep === 3 && <CourseContentForm />}

          {currentStep === 2 && (
            <TargetStudentsForm />
          )}
        </div>
      </div>
    </div>
  );
};

export default CreateCourse;
