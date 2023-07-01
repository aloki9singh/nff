import IDdraganddrop from "../../components/student/assignments/iddraganddrop";
import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useRouter } from "next/router";
import { Controller, useForm } from "react-hook-form";
import { auth, db, storage } from "../../config/firebaseconfig";
import { doc, setDoc, updateDoc } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";

const options = ["8", "9", "10", "11", "12"];

function uploadToFirebase(file, callback) {
  const storageRef = ref(storage, "images/" + file.name);
  const uploadTask = uploadBytesResumable(storageRef, file);

  // Listen for state changes, errors, and completion of the upload.
  uploadTask.on(
    "state_changed",
    () => { },
    (error) => {
      // A full list of error codes is available at
      // https://firebase.google.com/docs/storage/web/handle-errors
      switch (error.code) {
        case "storage/unauthorized":
          // User doesn't have permission to access the object
          break;
        case "storage/canceled":
          // User canceled the upload
          break;

        // ...

        case "storage/unknown":
          // Unknown error occurred, inspect error.serverResponse
          break;
      }
    },
    () => {
      // Upload completed successfully, now we can get the download URL
      getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
        // console.log('File available at', downloadURL);
        callback(downloadURL);
      });
    }
  );
}

export default function ProfileDetails() {
  const router = useRouter();

  const [user, setUser] = useState(null);
  useEffect(() => {

    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        // User is signed out
        // ...
        setUser(null);
      }
    });
  }, []);

  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    console.log(data);

    if (!user) {
      return;
    }

    const username = data.studentFirstName[0] + data.studentLastName[0] + data.schoolId + '#' + data.rollNo;
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
      photoURL: user.photoURL,
      aadhaarCard: "",
      uid: user.uid,
    };

    await setDoc(doc(db, "profileDetails", user.uid), profile);

    if (data.profilePhoto)
      uploadToFirebase(data.profilePhoto, (url) => {
        updateDoc(doc(db, "profileDetails", user.uid), {
          photoURL: url,
        });
      });

    if (data.aadhaarCard)
      uploadToFirebase(data.aadhaarCard, (url) => {
        updateDoc(doc(db, "profileDetails", user.uid), {
          aadhaarCard: url,
        });
      });

    router.push("/profileCongratulation");
  };

  console.log("errors", errors);
  return (
    <div className="w-full text-white flex flex-col space-y-8 overflow-x-hidden">
      {/* text */}
      <div className="w-[92%] mx-auto pt-16">
        <h1 className="w-full font-semibold text-4xl text-[#A145CD]">
          Profile Details
        </h1>
      </div>

      <div className="w-[92%] h-max mx-auto px-4 py-8 bg-[#222222] rounded-3xl">
        {/* form */}
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* student name */}
          <div className="w-full flex-wrap flex flex-col md:flex-row justify-start items-start gap-y-2 md:gap-x-6 px-4 mb-8">
            <label htmlFor="">Student Name *</label>
            <div className="flex flex-col">
              <input
                type="text"
                placeholder="First"
                className="w-full md:w-52 h-10 rounded-lg px-2 placeholder:pl-2 focus:outline-none "
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
                {...register("studentLastName", { required: true })}
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
            <label htmlFor="">School Unique Id *</label>
            <div className="flex flex-col" >
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
            <label htmlFor="">School Name</label>
            <div className="flex flex-col">
              <input
                type="text"
                placeholder="Type Here"
                className="w-full md:w-[319px] h-10 rounded-lg px-2 placeholder:pl-2 focus:outline-none"
                style={{ background: "#333333" }}
                {...register("schoolName", { required: true })}
              />
              {errors.schoolName?.type === "required" && (
                <p className="text-red-400 text-xs" role="alert">School name is required</p>
              )}
            </div>
          </div>

          {/* class */}
          <div className="w-full md:w-screen flex flex-col md:flex-row justify-start items-start md:items-center gap-y-2 md:gap-x-6 px-4 mb-8">
            <label htmlFor="">Class</label>
            <select
              className="border text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-1 bg-[#333333] border-gray-600 placeholder-gray-400 text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
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
            <label htmlFor="">Roll no</label>
            <div className="flex flex-col">
              <input
                type="text"
                placeholder="Type Here"
                className="w-full md:w-36 h-10 rounded-lg px-2 focus:outline-none placeholder:pl-2"
                style={{ background: "#333333" }}
                {...register("rollNo", { required: true })}
              />
              {errors.rollNo?.type === "required" && (
                <p className="text-red-400 text-xs" role="alert">Roll no is required</p>
              )}
            </div>
          </div>

          {/* dob */}
          <div className="w-full md:w-screen flex flex-col md:flex-row justify-start items-start md:items-center gap-y-2 md:gap-x-6 px-4 mb-8">
            <label htmlFor="">DOB</label>
            <Controller
              control={control}
              name="ReactDatepicker"
              rules={{
                required: true,
              }}
              render={({ field }) => (
                <DatePicker
                  dateFormat="dd/MM/yyyy"
                  placeholderText="DD/MM/YYYY"
                  className="w-full md:w-40 h-10 rounded-lg px-2 bg-[#333333] focus:outline-none placeholder:pl-2"
                  onChange={(e) => field.onChange(e)}
                  selected={field.value}
                  onBlur={field.onBlur}
                />
              )}
            />
            {errors.ReactDatepicker?.type === "required" && (
              <p className="text-red-400 text-xs" role="alert">DOB is required</p>
            )}
          </div>

          {/* contact number */}
          <div className="w-full flex-wrap flex flex-col md:flex-row justify-start items-start gap-y-2 md:gap-x-6 px-4 mb-8">
            <div className="flex md:items-center gap-x-4 flex-col md:flex-row">
              <label htmlFor="">Student mobile number:</label>
              <div className="flex flex-col">
                <input
                  type="tel"
                  // pattern="[0-9]*"
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
                  <p className="text-red-400 text-xs" role="alert">Phone no is required</p>
                )}
                {errors.studentPhoneNo?.type === "minLength" && (
                  <p className="text-red-400 text-xs" role="alert">Phone no must be 10 digits</p>
                )}
              </div>
            </div>
            <div className="flex md:items-center gap-x-4 md:gap-x-2 flex-col md:flex-row">
              <label className="block text-white">
                Alternate Phone Number:
              </label>
              <div className="flex flex-col">
                <input
                  type="text"
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
                  <p className="text-red-400 text-xs" role="alert">Phone no must be 10 digits</p>
                )}
              </div>
            </div>
          </div>

          {/* father's details */}
          <div className="w-full flex-wrap flex flex-col md:flex-row justify-start items-start gap-y-2 md:gap-x-6 px-4 mb-8">
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
                <p className="text-red-400 text-xs" role="alert">First name is required</p>
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
                {...register("fatherLastName", { required: true })}
              />
              {errors.fatherLastName?.type === "required" && (
                <p className="text-red-400 text-xs" role="alert">Last name is required</p>
              )}
            </div>
          </div>

          {/* mother's details */}
          <div className="w-full flex-wrap flex flex-col md:flex-row justify-start items-start  gap-y-2 md:gap-x-6 px-4 mb-8">
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
                <p className="text-red-400 text-xs" role="alert">First name is required</p>
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
                {...register("motherLastName", { required: true })}
              />
              {errors.motherLastName?.type === "required" && (
                <p className="text-red-400 text-xs" role="alert">Last name is required</p>
              )}
            </div>
          </div>
        
          {/* parent's contact number */}
          <div className="w-full flex-wrap flex flex-col md:flex-row justify-start items-start gap-y-2 md:gap-x-6 px-4 mb-8">
          <div className="flex md:items-center gap-x-4 flex-col md:flex-row">
            <label htmlFor="">{`Parent's`} mobile number:</label>
            <div className="flex flex-col">
              <input
                type="tel"
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
                <p className="text-red-400 text-xs" role="alert">Phone no is required</p>
              )}
              {errors.parentPhoneNo?.type === "minLength" && (
                <p className="text-red-400 text-xs" role="alert">Phone no must be 10 digits</p>
              )}
            </div>
            </div>
            <div className="flex md:items-center gap-x-4 md:gap-x-2 flex-col md:flex-row">
            <label className="block  text-white">Alternate Phone Number:</label>
            <div className="flex flex-col">
              <input
                type="text"
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
                <p className="text-red-400 text-xs" role="alert">Phone no must be 10 digits</p>
              )}
            </div>
            </div>
          </div>

          {/* photo and identity proof */}
          <div className="w-full flex flex-col justify-center items-center gap-y-2  px-4 mb-8">
            <label htmlFor="" className="self-start">
              Profile Photo
            </label>

            <Controller
              control={control}
              name="profilePhoto"
              rules={{
                required: { value: true, message: "This field is required" },
              }}
              render={({ field: { onChange, onBlur } }) => (
                <IDdraganddrop
                  setValue={setValue}
                  name="profilePhoto"
                  onChange={onChange}
                  onBlur={onBlur}
                />
              )}
            />

            <label htmlFor="" className="self-start my-2">
              Aadhaar Card
            </label>
            <Controller
              control={control}
              name="aadhaarCard"
              render={({ field: { onChange, onBlur } }) => (
                <IDdraganddrop
                  setValue={setValue}
                  name="aadhaarCard"
                  onChange={onChange}
                  onBlur={onBlur}
                />
              )}
            />
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
  );
}
