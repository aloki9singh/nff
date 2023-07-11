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
import { Controller, useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { uploadToFirebase } from "@/lib/exportablefunctions";

const numOfMentors = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const mentorLists = ["Dinesh Saini", "Rahul", "Raj", "Ravi"];
const categories = ["Web Development", "App Development", "UI/UX", "Others"];

const PlanCourseForm = ({ goToNextStep, onSubmit }) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
    control,
  } = useForm();

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Header currentStep={1} />
      <hr className="border-x-2 border-gray-500 mb-4" />
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
          {...register("title", { required: true })}
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
          {...register("desc", { required: true })}
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
            {...register("duration", { required: true, valueAsNumber: true })}
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
            {...register("lectures", { required: true, valueAsNumber: true })}
          />
        </div>
      </div>

      {/* level */}
      <div className="w-full hidden md:w-3/4 md:flex flex-col md:flex-row justify-start items-start md:items-center gap-x-2 px-4 mb-8">
        <legend className="w-40" htmlFor="">
          Level :
        </legend>
        <div className="border-2 border-gray-600 px-3 py-1 rounded-lg">
          <input
            {...register("level")}
            type="radio"
            name="level"
            value="Beginner"
            className="mr-2"
          />
          <label>Beginner</label>
        </div>
        <div className="border-2 border-gray-600 px-3 py-1 rounded-lg">
          <input
            type="radio"
            name="level"
            value="Intermediate"
            className="mr-2"
            {...register("level")}
          />
          <label>Intermediate</label>
        </div>
        <div className="border-2 border-gray-600 px-3 py-1 rounded-lg">
          <input
            {...register("level")}
            type="radio"
            name="level"
            value="Advanced"
            className="mr-2"
          />
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
              {...register("category")}
            >
              <option className="text-white/50" disabled value="">
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
              {...register("language")}
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
        <Controller
          control={control}
          name="banner"
          render={({ field: { onChange, onBlur } }) => (
            <IDdraganddrop
              setValue={setValue}
              name="banner"
              onChange={onChange}
              onBlur={onBlur}
            />
          )}
        />
      </div>
    </form>
  );
};

const TargetStudentsForm = ({ onSubmit }) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Header currentStep={2} />
      <hr className="border-x-2 border-gray-500 mb-4" />
      <div className="w-full flex flex-col mt-12  gap-y-2 md:gap-x-2 px-4 mb-8">
        <label className="" htmlFor="">
          What will the students learn from your course ?
        </label>
        <textarea
          type="text"
          placeholder="Example, Will learn basics of UI/UX "
          className="AddMentorInput h-28 max-w-4xl rounded-lg px-2"
          style={{ background: "#333333" }}
          {...register("learn", { required: true })}
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
          {...register("requirements", { required: true })}
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
          {...register("target", { required: true })}
        />
      </div>
    </form>
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

const Header = ({ currentStep, onSubmit }) => {
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
        <button
          onClick={() => onSubmit?.()}
          type="submit"
          className="px-12 py-3 bg-[#A145CD] rounded-md hover:scale-105 duration-100 transition-all"
        >
          {currentStep === 3 ? "Submit" : "Next"}
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

const CourseContentForm = ({ onSubmit }) => {
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
    <>
      <Header currentStep={3} onSubmit={() => onSubmit(modules)} />
      <hr className="border-x-2 border-gray-500 mb-4" />
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
    </>
  );
};

const Sidebar = ({ currentStep = 1, setStep }) => {
  const steps = ["Plan Course", "Target Students", "Create course content"];

  return (
    <div className="mt-8 flex flex-col items-stretch gap-5">
      {steps.map((step, index) => (
        <button
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
        </button>
      ))}
    </div>
  );
};

const createCourse = async (courseDetails) => {

  const data = {
    ...courseDetails,
    createdAt: serverTimestamp(),
    banner: "",
  }

  console.log("data final", data)

  const courseRef = await addDoc(collection(db, "courses"),data);

  if (courseDetails.banner) {
    uploadToFirebase(courseDetails.banner, (url) => {
      setDoc(
        doc(db, "courses", courseRef.id),
        {
          banner: url,
          id: courseRef.id,
        },
        {
          merge: true,
        }
      );
    });
  }

  console.log("courseRef", courseRef.id);

  return courseRef.id;
};

const CreateCourse = () => {
  const [currentStep, helpers] = useStep(3);
  const [formData, setFormData] = useState({});
  const router = useRouter();

  const { goToNextStep, goToPrevStep, setStep } = helpers;

  console.log("formData", formData);

  const onPlanCourseFormSubmit = (data) => {
    setFormData({ ...formData, ...data });
    console.log("formData", data);
    goToNextStep();
  };

  const onTargetStudentFormSubmit = (data) => {
    setFormData({
      ...formData,
      "Q&A": {
        ...data,
      },
    });

    console.log("target students data", data);
    goToNextStep();
  };

  const onCourseContentFormSubmit = async (modules) => {
    const courseDetails = {
      ...formData,
      modules,
    };
    console.log("modules", modules);

    setFormData(courseDetails);

    await createCourse(courseDetails);

    router.push("beta/course-overview");
  };

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
          {currentStep === 1 && (
            <PlanCourseForm onSubmit={onPlanCourseFormSubmit} />
          )}

          {currentStep === 3 && (
            <CourseContentForm onSubmit={onCourseContentFormSubmit} />
          )}

          {currentStep === 2 && (
            <TargetStudentsForm onSubmit={onTargetStudentFormSubmit} />
          )}
        </div>
      </div>
    </div>
  );
};

export default CreateCourse;
