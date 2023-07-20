
import { IoClose } from "react-icons/io5";
import { useEffect, useState } from "react";
import {
  collection,
  addDoc,
  serverTimestamp,
  setDoc,
  doc,
  getDoc,
} from "firebase/firestore";
import { auth, db, storage } from "@/config/firebaseconfig";
import Link from "next/link";
import Image from "next/image";
import NeatS from "/public/componentsgraphics/schools/login/neatskillslogosample.svg";
import { useAuthContext } from "@/lib/context/AuthContext";
import { useStep } from "@/hooks/useStep";
import IDdraganddrop from "@/components/student/assignments/iddraganddrop";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { uploadToFirebase } from "@/lib/exportablefunctions";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { AiOutlinePlus } from "react-icons/ai";
import { MdDelete } from "react-icons/md";
import { generate } from "shortid";

const numOfMentors = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const mentorLists = ["Dinesh Saini", "Rahul", "Raj", "Ravi"];
const categories = [
  "Web Development",
  "App Development",
  "UI/UX",
  "Programming Language",
  "Others",
];

const planCourseSchema = yup
  .object({
    title: yup.string().required(),
    desc: yup.string().required("Description cannot be empty"),
    duration: yup.number().typeError("Duration must be a number").required(),
    lectures: yup
      .number()
      .required()
      .typeError("Lectures must be greater than 0"),
    category: yup.string().required(),
    language: yup.string().required(),
    level: yup.string().required(),
    // banner can by any
    banner: yup.mixed().required(),
  })
  .required();

const PlanCourseForm = ({ state, onSubmit }) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
    control,
  } = useForm({
    defaultValues: state,
    resolver: yupResolver(planCourseSchema),
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Header currentStep={1} />
      <hr className="border-x-2 border-gray-500 mb-4" />
      {/* course name */}
      <div className="w-full flex flex-col md:flex-row justify-start items-start md:items-center gap-y-2 md:gap-x-2 px-4 mb-8">
        <label className="w-40" htmlFor="">
          Course Title
        </label>
        <div className="flex flex-col flex-1">
          <input
            type="text"
            placeholder="Enter coures title"
            className={`   h-10 rounded-lg px-2 ${errors.title ? "border border-red-500" : "border-none"
              }`}
            style={{ background: "#333333" }}
            {...register("title", { required: true })}
          />
          <p className="text-red-500 text-sm">{errors.title?.message}</p>
        </div>
      </div>
      <div className="w-full  flex flex-col md:flex-row justify-start items-start  gap-y-2 md:gap-x-2 px-4 mb-8">
        <label className="w-40" htmlFor="">
          Course Description
        </label>
        <div className="flex flex-col flex-1">
          <textarea
            type="text"
            placeholder="Enter course description"
            className={`  h-28 rounded-lg px-2 ${errors.desc?.message ? "border-red-500 border border-solid" : ""
              } `}
            style={{ background: "#333333" }}
            {...register("desc", { required: true })}
          />
          <p className="text-red-500 text-sm">{errors.desc?.message}</p>
        </div>
      </div>

      {/* duration, session and language */}
      <div className="flex flex-col md:flex-row justify-start items-start  gap-x-10 px-4 mb-8">
        <div className="flex flex-1 flex-row items-center gap-x-2">
          <label className="w-40" htmlFor="">
            Duration
          </label>
          <div className="flex flex-col flex-1">
            <input
              type="number"
              className={`   h-10 rounded-lg px-2 ${errors.title ? "border border-red-500" : "border-none"
                }`}
              style={{ background: "#333333" }}
              placeholder="Enter duration in weeks"
              {...register("duration", { required: true, valueAsNumber: true })}
            />
            <p className="text-red-500 text-sm">{errors.duration?.message}</p>
          </div>
        </div>
        <div className="flex flex-1 items-center gap-x-2 px-4">
          <label className="w-40" htmlFor="">
            Lectures
          </label>
          <div className="flex flex-col flex-1">
            <input
              type="number"
              placeholder="Enter total lectures"
              className={`   h-10 rounded-lg px-2 ${errors.title ? "border border-red-500" : "border-none"
                }`}
              style={{ background: "#333333" }}
              {...register("lectures", { required: true, valueAsNumber: true })}
            />
            <p className="text-red-500 text-sm">{errors.lectures?.message}</p>
          </div>
        </div>
      </div>

      {/* level */}
      <div className="w-full hidden relative  md:flex flex-col md:flex-row justify-start items-start md:items-center gap-x-2 px-4 pb-8">
        <p className="text-red-500 text-sm absolute left-48 bottom-2">
          {errors.level?.message}
        </p>
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
        <div className="flex flex-col flex-1">
          <Controller
            control={control}
            name="banner"
            rules={{ required: true }}
            render={({ field: { onChange, onBlur } }) => (
              <IDdraganddrop
                setValue={setValue}
                name="banner"
                onChange={onChange}
                onBlur={onBlur}
              />
            )}
          />
          <p className="text-red-500 text-sm mt-5">{errors.banner?.message}</p>
        </div>
      </div>
    </form>
  );
};

const targetStudentsSchema = yup.object().shape({
  // learn: yup.string().required("This field is required"),
  learn: yup.array().of(
    yup.object({
      value: yup.string().required("This field is required"),
    })
  ),
  requirements: yup.string().required("This field is required"),
  target: yup.string().required("This field is required"),
});

const TargetStudentsForm = ({ state, onSubmit }) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    control,
  } = useForm({
    defaultValues: {
      ...state,
      learn: state?.learn?.map((l) => ({ value: l })) || [{ value: "" }],
    },
    resolver: yupResolver(targetStudentsSchema),
  });

  const { fields, append, remove } = useFieldArray({
    name: "learn",
    control,
  });

  console.log("errors", errors);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Header currentStep={2} />
      <hr className="border-x-2 border-gray-500 mb-4" />
      <div className="w-full flex flex-col mt-12  gap-y-2 md:gap-x-2 px-4 mb-8">
        <label className="" htmlFor="">
          What will the students learn from your course ?
        </label>
        <div className="flex flex-col">
          <ul className="flex flex-col gap-3">
            {fields.map((field, index) => (
              <li
                className="flex flex-row items-center max-w-4xl gap-3"
                key={field.id}
              >
                <input
                  type="text"
                  className="text-white text-sm rounded-lg block p-4  bg-[#333333]  placeholder-[#5F6065] focus:outline-none flex-[2]"
                  placeholder="Type here "
                  {...register(`learn.${index}.value`)}
                />
                <button
                  className="self-stretch px-3 rounded-md bg-gray-500 "
                  onClick={() => {
                    remove(index);
                  }}
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
          <button
            type="button"
            onClick={() => {
              append({ value: "" });
            }}
            className="bg-primary text-white text-center mt-3 w-24 rounded-md py-2 "
          >
            Add
          </button>

          <p className="text-red-500 text-sm">{errors.learn?.message}</p>
        </div>
      </div>
      <div className="w-full flex flex-col mt-12  gap-y-2 md:gap-x-2 px-4 mb-8">
        <label className="" htmlFor="">
          Are there any course requirements or prerequisites ?
        </label>
        <div className="flex flex-col">
          <textarea
            type="text"
            placeholder="Example, Have a laptop"
            className="AddMentorInput h-28 max-w-4xl rounded-lg px-2"
            style={{ background: "#333333" }}
            {...register("requirements", { required: true })}
          />
          <p className="text-red-500 text-sm">{errors.requirements?.message}</p>
        </div>
      </div>
      <div className="w-full flex flex-col mt-12  gap-y-2 md:gap-x-2 px-4 mb-8">
        <label className="" htmlFor="">
          Who are your target students ?
        </label>
        <div className="flex flex-col">
          <textarea
            type="text"
            placeholder="Example, people who are curious about design or beginners"
            className="AddMentorInput h-28 max-w-4xl rounded-lg px-2"
            style={{ background: "#333333" }}
            {...register("target", { required: true })}
          />
          <p className="text-red-500 text-sm">{errors.target?.message}</p>
        </div>
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

const Accordian = ({ title, children }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="bg-[#333333] p-2 px-3 rounded-md md:w-[28rem] max-w-md overflow-hidden">
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
        <div className="py-3">{children}</div>
      </div>
    </div>
  );
};

const moduleSchema = yup.object().shape({
  name: yup.string().required("This field is required"),
  desc: yup.string().required("This field is required"),
  video: yup.array().of(
    yup.object({
      value: yup
        .string()
        .required("This field is required")
        .url()
        .typeError("Must be a valid url"),
    })
  ),
});

const ModuleForm = ({ onSubmit }) => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(moduleSchema),
    defaultValues: {
      video: [{ value: "" }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "video",
  });

  return (
    <form
      onSubmit={handleSubmit((data) => {
        console.log(data);
        const moduleData = {
          ...data,
          video: data.video.map((v) => v.value),
        };
        onSubmit?.(moduleData);
        reset();
      })}
      className="flex-[3] px-10 py-6  border border-[#5F6065] rounded-xl"
    >
      <div className="w-full flex flex-col gap-y-4 mb-7">
        <label className="" htmlFor="name">
          Module Name
        </label>
        <input
          name="name"
          type="text"
          placeholder="Enter module name"
          className="AddMentorInput  rounded-lg px-2"
          style={{ background: "#333333" }}
          {...register("name")}
        />
      </div>
      <div className="w-full flex flex-col gap-y-4 mb-7">
        <label className="" htmlFor="desc">
          Module Description
        </label>
        <textarea
          name="desc"
          type="text"
          placeholder="Enter module description"
          className="AddMentorInput h-60 max-w-4xl rounded-lg px-2"
          style={{ background: "#333333" }}
          {...register("desc")}
        />
      </div>
      {/* <div className="w-full flex flex-col gap-y-4 mb-7">
        <label className="" htmlFor="">
          Upload Module Video{" "}
          {isUploading && (
            <span className="text-white/60">
              Uploading {uploadProgress.toFixed(2)}%
            </span>
          )}
        </label>
        <div>
          <label htmlFor="file-input" className="sr-only">
            Choose file
          </label>
          <input
            type="file"
            name="file-input"
            onChange={(e) => uploadVideo(e.target.files[0])}
            accept="video/*"
            id="file-input"
            className="block w-full border border-gray-200 shadow-sm rounded-md text-sm focus:z-10 focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400
file:bg-transparent file:border-0
file:bg-gray-100 file:mr-4
file:py-3 file:px-4
dark:file:bg-gray-700 dark:file:text-gray-400"
          />
          {video && <p className="text-white/60">{video}</p>}
        </div>
      </div> */}
      <div className="w-full flex flex-col gap-y-4 mb-7">
        <label className="" htmlFor="">
          Add Video Drive Link
        </label>
        <div className="flex flex-col">
          <ul className="flex flex-col gap-3">
            {fields.map((field, index) => (
              <li
                className="flex flex-row items-center max-w-4xl gap-3"
                key={field.id}
              >
                <div className="flex flex-col flex-1">
                  <input
                    type="text"
                    className="text-white text-sm rounded-lg block p-4  bg-[#333333]  placeholder-[#5F6065] focus:outline-none flex-[2]"
                    placeholder="Enter link"
                    {...register(`video.${index}.value`)}
                  />
                  <p className="text-red-500 text-sm">
                    {errors.video?.[index]?.value?.type === "url"
                      ? "Must be a valid url"
                      : errors.video?.[index]?.value?.message || ""}
                  </p>
                </div>
                <button
                  className=" self-stretch  rounded-md px-3 transition-colors duration-150 hover:bg-gray-800 "
                  onClick={() => {
                    remove(index);
                  }}
                >
                  <MdDelete className="text-lg" />
                </button>
              </li>
            ))}
          </ul>
          <button
            type="button"
            onClick={() => {
              append({ value: "" });
            }}
            className=" text-white flex items-center text-center mt-3 rounded-md py-2 self-end hover:bg-gray-800 px-4 transition-colors duration-150 "
          >
            <AiOutlinePlus className="mr-2" />
            Add another video
          </button>

          <p className="text-red-500 text-sm">{errors.learn?.message}</p>
        </div>
      </div>

      <button
        // disabled={isUploading}
        className="bg-pink text-white px-10 py-2 rounded-md disabled:cursor-not-allowed mt-2 "
      >
        Add
      </button>
    </form>
  );
};

const CourseContentForm = ({ initialModules = [], onSubmit }) => {
  const [modules, setModules] = useState(initialModules || []);

  // const [uploadProgress, setUploadProgress] = useState(0);
  // const [isUploading, setIsUploading] = useState(false);

  // const uploadVideo = (file) => {
  //   // Upload file and metadata to the object 'images/mountains.jpg'
  //   const storageRef = ref(storage, "course-videos/" + file.name);
  //   const uploadTask = uploadBytesResumable(storageRef, file);
  //   setIsUploading(true);
  //   // Listen for state changes, errors, and completion of the upload.
  //   uploadTask.on(
  //     "state_changed",
  //     (snapshot) => {
  //       // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
  //       const progress =
  //         (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

  //       setUploadProgress(progress);
  //       console.log("Upload is " + progress + "% done");
  //       switch (snapshot.state) {
  //         case "paused":
  //           console.log("Upload is paused");
  //           break;
  //         case "running":
  //           console.log("Upload is running");
  //           break;
  //       }
  //     },
  //     (error) => {
  //       // A full list of error codes is available at
  //       // https://firebase.google.com/docs/storage/web/handle-errors
  //       switch (error.code) {
  //         case "storage/unauthorized":
  //           // User doesn't have permission to access the object
  //           break;
  //         case "storage/canceled":
  //           // User canceled the upload
  //           break;

  //         // ...

  //         case "storage/unknown":
  //           // Unknown error occurred, inspect error.serverResponse
  //           break;
  //       }
  //       setIsUploading(false);
  //     },
  //     () => {
  //       // Upload completed successfully, now we can get the download URL
  //       getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
  //         console.log("File available at", downloadURL);
  //         setVideo(downloadURL);
  //         setIsUploading(false);
  //       });
  //     }
  //   );
  // };

  const onModuleSubmit = (data) => {
    console.log("data", data);
    setModules([...modules, data]);
  };

  return (
    <>
      <Header currentStep={3} onSubmit={() => onSubmit(modules)} />
      <hr className="border-x-2 border-gray-500 mb-4" />
      <div className="w-full flex flex-row gap-5">
        <ModuleForm onSubmit={onModuleSubmit} />
        <div className="flex-[2] flex flex-col ">
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
                    <Accordian title={module.name}>
                      <div className="flex flex-col gap-2">
                        <p className="text-white/80">{module.desc}</p>
                        <div className="flex flex-col gap-2">
                          {Array.isArray(module.video) ? (
                            module.video.map((video, index) => (
                              <div key={index}>
                                <p className="text-white/80">{video}</p>
                              </div>
                            ))
                          ) : (
                            <p className="text-white/80 truncate">
                              {module.video}
                            </p>
                          )}
                        </div>
                      </div>
                    </Accordian>
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
  };

  console.log("data final", data);
  const courseId = courseDetails.id || generate();

  await setDoc(doc(db, "courses", courseId), data, {
    merge: true,
  });

  uploadToFirebase(courseDetails.banner, (url) => {
    setDoc(
      doc(db, "courses", courseId),
      {
        banner: url,
        id: courseId,
      },
      {
        merge: true,
      }
    );
    setDoc(doc(collection(db, "chatGroups"), courseId), {
      name: courseDetails.title,
      members: [auth.currentUser?.uid],
      photoURL: url,
      isGroup: true,
      groupId: courseId,
      lastMessage: "",
      lastMessageTimestamp: serverTimestamp(),
      createdAt: serverTimestamp(),
    });
  });
};

const CreateCourse = ({ course }) => {
  const [currentStep, helpers] = useStep(3);
  const [formData, setFormData] = useState(course || {});
  const router = useRouter();
  console.log("course", course);

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
      QA: {
        ...data,
        learn: data.learn.map((l) => l.value),
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

    router.push("addcourse/congrats");
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
            <PlanCourseForm
              state={formData}
              onSubmit={onPlanCourseFormSubmit}
            />
          )}

          {currentStep === 3 && (
            <CourseContentForm
              initialModules={course?.modules}
              onSubmit={onCourseContentFormSubmit}
            />
          )}

          {currentStep === 2 && (
            <TargetStudentsForm
              state={formData["QA"]}
              onSubmit={onTargetStudentFormSubmit}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default withAdminandMentorAuthorization(CreateCourse);

export const getServerSideProps = async (ctx) => {
  const id = ctx.query.id;

  if (!id || typeof id !== "string") {
    return {
      props: {
        course: null,
      },
    };
  }
  console.log("course id", id);

  const courseRef = doc(db, "courses", id);
  const courseSnap = await getDoc(courseRef);

  if (!courseSnap.exists()) {
    return {
      props: {
        course: null,
      },
    };
  }

  const course = courseSnap.data();
  return {
    props: {
      course: {
        ...course,
        createdAt: course.createdAt.toDate().toString(),
      },
    },
  };
};
