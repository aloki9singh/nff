import IDdraganddrop from "@/components/student/assignments/iddraganddrop";
import React, { useEffect } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { useRouter } from "next/router";
import { Controller, useForm } from "react-hook-form";
import { auth, db, storage } from "../../config/firebaseconfig";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { updateProfile } from "firebase/auth";
import { useAuthContext } from "@/lib/context/AuthContext";
import Layout from "@/components/common/Layout/Layout";


//class options
const options = ["8", "9", "10", "11", "12","N/A"];

export default function ProfileDetails() {
  const router = useRouter();

  // context for userData 
  const { user } = useAuthContext();


  // default form template and values /
  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
    reset,
    watch
  } = useForm({
    defaultValues: {},
  });

  //var for profile phot and aadhar card
  const profilePhoto = watch("profilePhoto");
  const aadhaarCard = watch("aadhaarCard");


  // checks wheateher the use is already registered if  then gets the data and preview in form 

  useEffect(() => {
    const getInitialProfile = async () => {
      // searching if user exists or not
      const userRef = doc(db, "allusers", user?.uid);
      const docSnap = await getDoc(userRef);
      if (docSnap.exists()) {
        const data = docSnap.data();
        const initialProfile = {
          ...data,
          studentFirstName: data.name?.first,
          studentMiddleName: data.name?.middle,
          studentLastName: data.name?.last,
          fatherFirstName: data.fatherName?.first,
          fatherMiddleName: data.fatherName?.middle,
          fatherLastName: data.fatherName?.last,
          motherFirstName: data.motherName?.first,
          motherMiddleName: data.motherName?.middle,
          motherLastName: data.motherName?.last,
          ReactDatepicker: data?.dob,
          profilePhoto: data?.photoURL,
          aadhaarCard: data?.aadhaarCard,
        }
        reset(initialProfile)
      }
    };

    getInitialProfile();
  }, [user?.uid, reset]);


  //submting is handled
  const onSubmit = async (data) => {
    if (!user) {
      return;
    }
    const username =
      data.studentFirstName[0] +
      (data.studentLastName[0] || "") +
      data.schoolId +
      "#" +
      data.rollNo;
    const profile = {
      name: {
        first: data.studentFirstName,
        middle: data.studentMiddleName,
        last: data.studentLastName,
      },
      schoolId: data.schoolId,
      schoolName: data.schoolName,
      username: username,
      class: data.class,
      rollNo: data.rollNo,
      dob: data.ReactDatepicker,
      studentPhoneNo: data.studentPhoneNo,
      studentAltPhoneNo: data.studentAltPhoneNo,
      fatherName: {
        first: data.fatherFirstName,
        middle: data.fatherMiddleName,
        last: data.fatherLastName,
      },
      motherName: {
        first: data.motherFirstName,
        middle: data.motherMiddleName,
        last: data.motherLastName,
      },
      parentPhoneNo: data.parentPhoneNo,
      parentAltPhoneNo: data.parentAltPhoneNo,
      photoURL: data.profilePhoto,
      aadhaarCard: data.aadhaarCard,
      uid: user.uid,
      trialValid: true,
      courseAccess: false,
    };
    const userRef = doc(db, "allusers", user.uid); // searching if user exists or not
    const docSnap = await getDoc(userRef);

    if (docSnap.exists()) {
      // exist condition update the doc
      await updateDoc(userRef, profile); 
    } else {
      // taking same user reference trying to add user
      await setDoc(userRef, {
        ...profile,
      });
    }


    const fullName = data.studentFirstName + " " + (data.studentLastName ?? "");
    updateProfile(auth.currentUser, {
      displayName: fullName,
      photoURL: data.profilePhoto,
    });

    router.push("/beta/profilecongrats");
  };

  
  return (
    <Layout pageTitle="Profile Details">
    <div className="w-full text-white flex flex-col space-y-8 overflow-x-hidden">
      {/* text */}
      <div className="w-[92%] mx-auto pt-16">
        <h1 className="w-full font-semibold text-4xl text-[#A145CD]">
          Profile Details
        </h1>
      </div>

      <div className="w-[92%] h-max mx-auto px-4 py-8 bg-[#222222] rounded-3xl">
        {/* form */}
        <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
          {/* student name */}
          <div className="w-full flex-wrap flex flex-col items-stretch md:flex-row justify-start  gap-y-2 md:gap-x-6 px-4 mb-8">
            <label htmlFor="">Student Name *</label>
            <div className="flex flex-col">
              <input
                type="text"
                placeholder="First"
                className="w-full md:w-52 h-10 rounded-lg px-2 placeholder:pl-2 focus:outline-none  cursor-pointer"
                style={{ background: "#333333" }}
                {...register("studentFirstName", { required: true })}
              />
              {errors.studentFirstName?.type === "required" && (
                <p className="text-red-400 text-xs" role="alert">
                  First name is required
                </p>
              )}
            </div>
            <div className="flex flex-col">
              <input
                type="text"
                placeholder="Middle"
                className="w-full md:w-52 h-10 rounded-lg px-2 placeholder:pl-2 focus:outline-none"
                style={{ background: "#333333" }}
                {...register("studentMiddleName")}
              />
            </div>
            <div className="flex flex-col">
              <input
                type="text"
                placeholder="Last"
                className="w-full md:w-52 h-10 rounded-lg px-2 placeholder:pl-2 focus:outline-none"
                style={{ background: "#333333" }}
                {...register("studentLastName")}
              />
              {errors.studentLastName?.type === "required" && (
                <p className="text-red-400 text-xs" role="alert">
                  Last name is required
                </p>
              )}
            </div>
          </div>

          {/* unique id */}
          <div className="w-full md:w-screen flex flex-col md:flex-row justify-start items-start md:items-center gap-y-2 md:gap-x-6 px-4 mb-8">
            <label className=" whitespace-nowrap " htmlFor="">School Unique Id *</label>
            <div className="flex flex-col items-stretch w-full">
              <input
                type="text"
                placeholder="Type Here"
                className="w-full md:w-[319px] h-10 rounded-lg px-2 placeholder:pl-2 focus:outline-none"
                style={{ background: "#333333" }}
                {...register("schoolId")}
              />
            </div>
          </div>

          {/* school Name */}
          <div className="w-full md:w-screen flex flex-col md:flex-row justify-start items-start md:items-center gap-y-2 md:gap-x-6 px-4 mb-8">
            <label className="whitespace-nowrap" htmlFor="">School Name</label>
            <div className="flex flex-col items-stretch w-full">
              <input
                type="text"
                placeholder="Type Here"
                className="w-full md:w-[319px] h-10 rounded-lg px-2 placeholder:pl-2 focus:outline-none"
                style={{ background: "#333333" }}
                {...register("schoolName", { required: true })}
              />
              {errors.schoolName?.type === "required" && (
                <p className="text-red-400 text-xs" role="alert">
                  School name is required
                </p>
              )}
            </div>
          </div>

          {/* class */}
          <div className="w-full md:w-screen flex flex-col md:flex-row justify-start items-start md:items-center gap-y-2 md:gap-x-6 px-4 mb-8">
            <label htmlFor="">Class</label>
            <select
              className="border pl-5 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-1 bg-[#333333] border-gray-600 placeholder-gray-400 text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 md:w-[100px] w-full py-2"
              {...register("class")}
            >
              {options.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>

          {/* roll no */}
          <div className="w-full md:w-screen flex flex-col md:flex-row justify-start items-start md:items-center gap-y-2 md:gap-x-6 px-4 mb-8">
            <label className="whitespace-nowrap" htmlFor="">Roll no</label>
            <div className="flex flex-col items-stretch w-full">
              <input
                type="text"
                placeholder="Your School RollNo"
                className="w-full md:w-[200px] h-10 rounded-lg px-2 focus:outline-none placeholder:pl-2"
                style={{ background: "#333333" }}
                {...register("rollNo", { required: true })}
              />
              {errors.rollNo?.type === "required" && (
                <p className="text-red-400 text-xs" role="alert">
                  Roll no is required
                </p>
              )}
            </div>
          </div>

          {/* dob */}
          <div className="w-full md:w-screen flex flex-col md:flex-row justify-start items-start md:items-center gap-y-2 md:gap-x-6 px-4 mb-8">
            <label htmlFor="">DOB</label>
            <input
              type="date"
              placeholder="DD/MM/YYYY"
              className="w-full md:w-40 h-10 rounded-lg px-2 bg-[#333333] focus:outline-none placeholder:pl-2"
              {...register("ReactDatepicker", {
                required: {
                  value: true,
                  message: "DOB is required",
                },
                validate: (value) => {
                  const date = new Date(value);
                  const currentDate = new Date();
                  const age = currentDate.getFullYear() - date.getFullYear();
                  if (age < 10) {
                    return "You must be 10 years old or above";
                  } else
                    return true;
                },
              }

              )}
            />
            {errors.ReactDatepicker && (
              <p className="text-red-400 text-xs" role="alert">
                {errors.ReactDatepicker.message}
              </p>
            )}
          </div>

          {/* contact number */}
          <div className="w-full  flex flex-col md:flex-row justify-start items-start gap-y-4 md:gap-x-6 px-4 mb-8">
            <div className="flex md:items-center gap-x-4 flex-col md:flex-row md:items-s items-stretch w-full">
              <label htmlFor="">Student mobile number:</label>
              <div className="flex flex-col ">
                <input
                  type="tel"
                  // pattern="[0-9]*"
                  maxLength={10}
                  placeholder="Type Here"
                  className="w-full md:w-[319px] h-10 rounded-lg px-2 focus:outline-none placeholder:pl-2"
                  style={{ background: "#333333" }}
                  {...register("studentPhoneNo", {
                    required: true,
                    minLength: 10,
                    maxLength: 10,
                    pattern: {
                      value: /^[0-9]*$/,
                      message: "Only numbers are allowed",
                    },
                  })}
                />
                {errors.studentPhoneNo?.type === "required" && (
                  <p className="text-red-400 text-xs" role="alert">
                    Phone no is required
                  </p>
                )}
                {errors.studentPhoneNo?.type === "minLength" && (
                  <p className="text-red-400 text-xs" role="alert">
                    Phone no must be 10 digits
                  </p>
                )}
              </div>
            </div>
            <div className="flex md:items-center gap-x-4 md:gap-x-2 flex-col md:flex-row items-stretch w-full">
              <label className="block text-white">
                Alternate Phone Number:
              </label>
              <div className="flex flex-col">
                <input
                  type="tel"
                  maxLength={10}
                  placeholder="Type Here"
                  className="w-full md:w-[319px] h-10 rounded-lg px-2 focus:outline-none placeholder:pl-2"
                  style={{ background: "#333333" }}
                  {...register("studentAltPhoneNo", {
                    minLength: 10,
                    maxLength: 10,
                    pattern: {
                      value: /^[0-9]*$/,
                      message: "Only numbers are allowed",
                    },
                  })}
                />
                {errors.studentAltPhoneNo?.type === "minLength" && (
                  <p className="text-red-400 text-xs" role="alert">
                    Phone no must be 10 digits
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* father's details */}
          <div className=" flex-wrap flex flex-col md:flex-row justify-start  gap-y-2 md:gap-x-6 px-4 mb-8 items-stretch w-full" >
            <label htmlFor="">{`Father's`} Name</label>
            <div className="flex flex-col">
              <input
                type="text"
                placeholder="First"
                className="w-full md:w-52 h-10 rounded-lg px-2 focus:outline-none placeholder:pl-2"
                style={{ background: "#333333" }}
                {...register("fatherFirstName", { required: true })}
              />
              {errors.fatherFirstName?.type === "required" && (
                <p className="text-red-400 text-xs" role="alert">
                  First name is required
                </p>
              )}
            </div>
            <div className="flex flex-col">
              <input
                type="text"
                placeholder="Middle"
                className="w-full md:w-52 h-10 rounded-lg px-2 focus:outline-none placeholder:pl-2"
                style={{ background: "#333333" }}
                {...register("fatherMiddleName")}
              />
            </div>
            <div className="flex flex-col">
              <input
                type="text"
                placeholder="Last"
                className="w-full md:w-52 h-10 rounded-lg px-2 focus:outline-none placeholder:pl-2"
                style={{ background: "#333333" }}
                {...register("fatherLastName")}
              />
              {errors.fatherLastName?.type === "required" && (
                <p className="text-red-400 text-xs" role="alert">
                  Last name is required
                </p>
              )}
            </div>
          </div>

          {/* mother's details */}
          <div className="w-full flex-wrap flex flex-col md:flex-row justify-start items-stretch   gap-y-2 md:gap-x-6 px-4 mb-8 ">
            <label htmlFor="">{`Mother's`} Name</label>
            <div className="flex flex-col">
              <input
                type="text"
                placeholder="First"
                className="w-full md:w-52 h-10 rounded-lg px-2 focus:outline-none placeholder:pl-2"
                style={{ background: "#333333" }}
                {...register("motherFirstName", { required: true })}
              />
              {errors.motherFirstName?.type === "required" && (
                <p className="text-red-400 text-xs" role="alert">
                  First name is required
                </p>
              )}
            </div>
            <div className="flex flex-col">
              <input
                type="text"
                placeholder="Middle"
                className="w-full md:w-52 h-10 rounded-lg px-2 focus:outline-none placeholder:pl-2"
                style={{ background: "#333333" }}
                {...register("motherMiddleName")}
              />
            </div>
            <div className="flex flex-col">
              <input
                type="text"
                placeholder="Last"
                className="w-full md:w-52 h-10 rounded-lg px-2 focus:outline-none placeholder:pl-2"
                style={{ background: "#333333" }}
                {...register("motherLastName")}
              />
              {errors.motherLastName?.type === "required" && (
                <p className="text-red-400 text-xs" role="alert">
                  Last name is required
                </p>
              )}
            </div>
          </div>

          {/* parent's contact number */}
          <div className="w-full flex-wrap flex flex-col md:flex-row justify-start items-stretch gap-y-2 md:gap-x-6 px-4 mb-8 ">
            <div className="flex md:items-center gap-x-4 flex-col md:flex-row">
              <label htmlFor="">{`Parent's`} mobile number:</label>
              <div className="flex flex-col">
                <input
                  type="tel"
                  maxLength={10}
                  placeholder="Type Here"
                  className="w-full md:w-[319px] h-10 rounded-lg px-2 my-2 md:my-0 focus:outline-none placeholder:pl-2"
                  style={{ background: "#333333" }}
                  {...register("parentPhoneNo", {
                    required: true,
                    minLength: 10,
                    maxLength: 10,
                    pattern: {
                      value: /^[0-9]*$/,
                      message: "Only numbers are allowed",
                    },
                  })}
                />
                {errors.parentPhoneNo?.type === "required" && (
                  <p className="text-red-400 text-xs" role="alert">
                    Phone no is required
                  </p>
                )}
                {errors.parentPhoneNo?.type === "minLength" && (
                  <p className="text-red-400 text-xs" role="alert">
                    Phone no must be 10 digits
                  </p>
                )}
              </div>
            </div>
            <div className="flex md:items-center gap-x-4 md:gap-x-2 flex-col md:flex-row">
              <label className="block  text-white">
                Alternate Phone Number:
              </label>
              <div className="flex flex-col">
                <input
                  type="tel"
                  maxLength={10}
                  placeholder="Type Here"
                  className="w-full md:w-[319px] h-10 rounded-lg px-2 focus:outline-none placeholder:pl-2"
                  style={{ background: "#333333" }}
                  {...register("parentAltPhoneNo", {
                    minLength: 10,
                    maxLength: 10,
                    pattern: {
                      value: /^[0-9]*$/,
                      message: "Only numbers are allowed",
                    },
                  })}
                />
                {errors.parentAltPhoneNo?.type === "minLength" && (
                  <p className="text-red-400 text-xs" role="alert">
                    Phone no must be 10 digits
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* photo and identity proof */}
          <div className="w-full flex flex-col  gap-y-2  px-4 mb-8">
            <label htmlFor="" className="self-start">
              Profile Photo
            </label>

            <Controller
              control={control}
              name="profilePhoto"
              render={({ field: { onChange, onBlur, value } }) => (
                <IDdraganddrop
                  setValue={setValue}
                  name="profilePhoto"
                  onChange={onChange}
                  onBlur={onBlur}
                  value={profilePhoto}
                />
              )}
            />
            {errors.profilePhoto?.type === "required" && (
              <p className="text-red-400 text-xs" role="alert">
                Profile photo is required
              </p>
            )}

            <label htmlFor="" className="self-start my-2">
              Aadhaar Card
            </label>
            <Controller
              control={control}
              name="aadhaarCard"
              rules={{ required: true }}
              render={({ field: { onChange, onBlur, value } }) => (
                <IDdraganddrop
                  setValue={setValue}
                  name="aadhaarCard"
                  onChange={onChange}
                  onBlur={onBlur}
                  value={aadhaarCard}
                />
              )}
            />

            {errors.aadhaarCard?.type === "required" && (
              <p className="text-red-400 text-xs" role="alert">
                Aadhaar card is required
              </p>
            )}

          </div>

          {/* submit button */}
          <div className="flex justify-center md:justify-end ">
            <button
              type="submit"
              className="text-white  bg-[#AA2769] focus:ring-4 focus:outline-none font-medium rounded-lg text-sm w-[80px] md:w-[100px]  px-2 py-2 text-center  hover:bg-[#93225a] my-8"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
    </Layout>
  );
}
