// Verified by Pradhumn
import React, { useContext, useEffect, useState } from "react";
import { HashLoader } from "react-spinners";
import { Loading } from "@/lib/context/contextprovider";
import { useAuthContext } from "@/lib/context/AuthContext";
import {
  detailadd,
  joinChatGroup,
  uploadToFirebase,
} from "@/lib/exportablefunctions";
import { useRouter } from "next/router";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "@/config/firebaseconfig";
import Image from "next/image";
import withAdminAuthorization from "@/lib/HOC/withAdminAuthorization";
import Layout from "@/components/common/Layout/Layout";

const MentorProfile = () => {
  const { loading, setLoading } = useContext(Loading);
  const router = useRouter();
  const { uid } = router.query;
  const [data, setData] = useState({});
  const [edit, setEdit] = useState(false);
  const [id, setId] = useState("");
  //   console.log(id)
  
  // ...

  const getCourse = async () => {
    try {
      const usersCollection = collection(db, "courses");
      const q = query(
        usersCollection,
        where("title", "==", data.details.interest)
      );
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        querySnapshot.forEach(async (docSnapshot) => {
          const documentData = docSnapshot.data();
          console.log(documentData);
          setId(documentData.uid);
          console.log(documentData.uid);

          // Update the MentorId field of the course document
          const courseDocRef = doc(usersCollection, docSnapshot.id);

          // Get the specific course document reference
          await updateDoc(courseDocRef, { MentorId: [uid], mentorid: uid });
          //   console.log("courese", courseDocRef.id);
          detailadd(uid, {
            courseAssigned: true,
            active: true,
            courseid: courseDocRef.id ? courseDocRef.id : "",
            assignedCourses: [courseDocRef.id],
          });

          await joinChatGroup(courseDocRef.id, uid, documentData.title);
        });
      } else {
        console.log("No matching course found.");
        alert("No such Course available to allot");
        return;
      }
    } catch (error) {
      console.error("Error fetching course data:", error);
    }
  };

  const handleClick2 = () => {
    try {
      // Call the detailadd function with relevant parameters

      // Check if the data has 'details' property and call the getCourse function
      if (data.details) {
        getCourse();
      }
      //   console.log("id",uid,data.details);

      // Navigate to the "/reta/addmentor" route or page
      router.replace("/reta/addmentor");
    } catch (err) {
      // If an error occurs during execution, it will be caught here
      // You can handle the error in an appropriate way if needed
    }
  };

  useEffect(() => {

    const getData = async () => {
      const usersCollection = collection(db, "allusers");
      const q = doc(usersCollection, uid);
      const querySnapshot = await getDoc(q);
      if (!querySnapshot.empty) {
        const documentData = querySnapshot.data();
        setData(documentData);
        console.log(documentData);
      }
    };
  

    const getCours = async () => {
      try {
        const usersCollection = collection(db, "courses");
        const q = query(
          usersCollection,
          where("title", "==", data.details.interest)
        );
        const querySnapshot = await getDocs(q);
  
        if (!querySnapshot.empty) {
          querySnapshot.forEach(async (docSnapshot) => {
            const documentData = docSnapshot.data();
            console.log(documentData);
            setId(documentData.uid);
            console.log(documentData.uid);
  
            // Update the MentorId field of the course document
            const courseDocRef = doc(usersCollection, docSnapshot.id);
  
            // Get the specific course document reference
            await updateDoc(courseDocRef, { MentorId: [uid], mentorid: uid });
            //   console.log("courese", courseDocRef.id);
            detailadd(uid, {
              courseAssigned: true,
              active: true,
              courseid: courseDocRef.id ? courseDocRef.id : "",
              assignedCourses: [courseDocRef.id],
            });
  
            await joinChatGroup(courseDocRef.id, uid, documentData.title);
          });
        } else {
          console.log("No matching course found.");
          alert("No such Course available to allot");
          return;
        }
      } catch (error) {
        console.error("Error fetching course data:", error);
      }
    };


    getData();
    if (data.details) {
      getCours();
    }
  }, [data?.details, uid]);

  const handleChange = (e) => {
    e.preventDefault();
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const updateData = async () => {
    const mentorData = {
      email: data?.email,
      pPhone: data?.details?.pPhone,
      dob: data?.details?.dob,
      sPhone: data?.details?.sPhone,
      address: data?.details?.address,
      city: data?.details?.city,
      postalcode: data?.details?.postalcode,
      country: data?.details?.country,
    };
    try {
      await updateDoc(doc(db, "allusers", uid), mentorData);
      alert("Profile Updated");
      setEdit(false);
    } catch (e) {
      console.log(e);
    }
  };

  const handleClick = (e) => {
    e.preventDefault();
    setEdit(!edit);
  };

  return (
    <Layout pageTitle="Mentor Details">
    <div
      className={`md:p-10 bg-[#1E1E1E] ${
        loading ? "pointer-events-none z-1" : ""
      }`}
    >
      {loading && (
        <div style={{ pointerEvents: "none", zIndex: 1 }}>
          <div className="absolute top-[50%] left-[50%] transform -translate-x-1/2 -translate-y-1/2">
            <HashLoader color="#E1348B" size={80} />
          </div>
        </div>
      )}
      <div className="text-white   rounded-[25px] p-10 bg-[#222222]  ">
        <div className="">
          <div className=" flex justify-between text-xl md:mx-20 ">
            <div>
              <h6 className=" font-bold mb-5 text-[#E1348B] text-3xl">
                Preview
                {/* - {uid} */}
              </h6>
            </div>{" "}
          </div>
          <hr className="mt-6 border-b-1 border-blueGray-300 mb-5 md:mx-20" />
        </div>
        {!edit ? (
          <div className="flex justify-end p-4  text-white mr-16">
            <button
              onClick={handleClick}
              className="w-fit bg-[#505057] p-4 rounded-[10px]"
            >
              Edit Profile
            </button>
          </div>
        ) : (
          <div className=" flex justify-end text-white mr-16">
            <button
              className="w-fit bg-[#E1348B] p-4 rounded-[10px] mr-2"
              onClick={handleClick}
            >
              Save
            </button>
            <button
              className="w-fit bg-[#505057] p-4 rounded-[10px]"
              onClick={handleClick}
            >
              Cancel
            </button>
          </div>
        )}

        {/* section form starts of preview */}
        <div className="md:mx-10 w-full">
          <form action=" " className="md:ml-10 w-full">
            <div className=" text-2xl text-pink-500 mt-3 mb-5 text-[#E1348B]">
              Personal Details
            </div>
            <div className=" grid max-w-fit mt-5 justify-between md:grid-cols-2 gap-5 ">
              <div className="md:flex ">
                <label htmlFor="" className=" text-sm font-md mr-10 md: mt-3">
                  First Name
                </label>
                <input
                  name="firstname"
                  value={data?.details?.firstname}
                  //  onChange={setData}
                  readOnly
                  type="text"
                  placeholder="First Name"
                  className="rounded focus:border-transparent focus:outline-none text-sm p-2 my-2 w-[100%] bg-[#333333] "
                />
              </div>
              <div className="md:flex ">
                <label htmlFor="" className=" text-sm font-md mr-10 md: mt-3">
                  Last Name
                </label>
                <input
                  name="lastname"
                  value={data?.details?.lastname}
                  //  onChange={setData}
                  readOnly
                  type="text"
                  placeholder="Last Name"
                  className="rounded focus:border-transparent focus:outline-none text-sm p-2 my-2 w-[100%]  bg-[#333333] "
                />
              </div>
            </div>

            <div className=" grid max-w-full md:max-w-4xl mt-5 justify-between md:grid-cols-2 gap-5">
              <div className="md:flex ">
                <label htmlFor="" className=" text-sm font-md mr-10 md: mt-3">
                  Email
                </label>
                <input
                  name="email"
                  value={data?.email}
                  readOnly={!edit}
                  onChange={handleChange}
                  type="text"
                  placeholder="Email"
                  className="rounded focus:border-transparent focus:outline-none text-sm p-2 my-2 w-[100%] bg-[#333333] "
                />
              </div>
              <div className="md:flex ">
                <label htmlFor="" className=" text-sm font-md mr-10 md: mt-3">
                  Primary Phone Number
                </label>
                <input
                  name="pPhone"
                  value={data?.details?.pPhone}
                  readOnly={!edit}
                  onChange={handleChange}
                  type="tel"
                  maxLength={10}
                  placeholder="Type here"
                  className="rounded focus:border-transparent focus:outline-none text-sm p-2 my-2 w-[100%]  bg-[#333333] "
                />
              </div>
            </div>

            <div className=" grid max-w-full md:max-w-4xl mt-5 justify-between md:grid-cols-2 gap-5">
              <div className="md:flex ">
                <label htmlFor="" className=" text-sm font-md mr-10 md: mt-3">
                  DOB
                </label>
                <input
                  name="dob"
                  value={data?.details?.dob}
                  readOnly={!edit}
                  onChange={handleChange}
                  type="date"
                  className="rounded focus:border-transparent focus:outline-none text-sm p-2 my-2 w-[100%] bg-[#333333] "
                />
              </div>
              <div className="md:flex ">
                <label htmlFor="" className=" text-sm font-md mr-10 md: mt-3">
                  Secondary Phone Number
                </label>
                <input
                  name="sPhone"
                  maxLength={10}
                  value={data?.details?.sPhone}
                  readOnly={!edit}
                  onChange={handleChange}
                  type="tel"
                  placeholder="Type here"
                  className="rounded focus:border-transparent focus:outline-none text-sm p-2 my-2 w-[100%]  bg-[#333333] "
                />
              </div>
            </div>
            <div>
              <div className=" text-2xl text-pink-500 mt-3 mb-5 text-[#E1348B]">
                Address
              </div>
              <div className=" grid max-w-full md:max-w-4xl mt-5 justify-between md:grid-cols-1 gap-5">
                <div className="md:flex ">
                  <label htmlFor="" className=" text-sm font-md mr-10 md: mt-3">
                    Apartment, Street Name
                  </label>
                  <input
                    name="address"
                    value={data?.details?.address}
                    readOnly={!edit}
                    onChange={handleChange}
                    type="text"
                    placeholder="Apartment,Street Name"
                    className="rounded focus:border-transparent focus:outline-none text-sm p-2 my-2 w-[100%] bg-[#333333] "
                  />
                </div>
              </div>
              <div className=" grid max-w-full md:max-w-4xl mt-5 justify-between md:grid-cols-2 gap-5">
                <div className="md:flex ">
                  <label htmlFor="" className=" text-sm font-md mr-10 md: mt-3">
                    City
                  </label>
                  <input
                    type="text"
                    name="city"
                    onChange={handleChange}
                    value={data?.details?.city}
                    readOnly={!edit}
                    className="rounded focus:border-transparent focus:outline-none text-sm p-2 my-2 w-[100%] bg-[#333333] "
                  ></input>
                </div>
                <div className="md:flex ">
                  <label htmlFor="" className=" text-sm font-md mr-10 md: mt-3">
                    Postal Code
                  </label>
                  <input
                    name="postalcode"
                    maxLength={8}
                    value={data?.details?.postalcode}
                    readOnly={!edit}
                    onChange={handleChange}
                    type="text"
                    placeholder="Enter Area code"
                    className="rounded focus:border-transparent focus:outline-none text-sm p-2 my-2 w-[100%]  bg-[#333333] "
                  />
                </div>
              </div>
              <div className=" grid max-w-full md:max-w-4xl mt-5 justify-between md:grid-cols-2 gap-5">
                <div className=" grid max-w-full md:max-w-4xl mt-5 justify-between md:grid-cols-2 gap-5">
                  <div className="">
                    <label
                      htmlFor=""
                      className=" text-sm font-md mr-10 md: mt-3"
                    >
                      Select Country
                    </label>
                    <input
                      name="country"
                      onChange={handleChange}
                      value={data?.details?.country}
                      readOnly={!edit}
                      type="text"
                      className="input rounded   focus:border-transparent focus:outline-none text-sm p-2 md:my-2 w-[100%] bg-[#333333] "
                    ></input>
                  </div>
                  <div className="block">
                    <label htmlFor="" className="text-sm font-md mr-10 mt-3">
                      Profile Photo
                    </label>
                    <Image
                      src={
                        data?.photoURL ||
                        "/componentsgraphics/common/Anonymousimage/anonymous.png"
                      }
                      width={100}
                      height={10000}
                      alt="Anonymous image"
                    ></Image>
                    {/* <input
                                            value={data?.photoURL || ""}
                                            name="profilephoto"
                                            //  onChange={setData}
                                            readOnly = {!edit}
                                            type="file"
                                            accept="image/*"
                                            className="input rounded focus:border-transparent focus:outline-none text-sm p-2 my-2 w-[100%] bg-[#333333]"
                                        /> */}
                  </div>
                </div>
              </div>
            </div>
          </form>
          {/* //step2 */}
          <div className="mb-8">
            <div className=" w-full h-full   ">
              <div className="  text-white grow flex items-center justify-center my-5  mx-[-15px]">
                <div className="w-[92%] m-auto flex  rounded-[30px] h-fit">
                  {/* {/* //start of model 2 which i put at this another place */}
                  {/* //End of model 2 which i put at this another place */}
                  {/* main div Top section */}
                  <div className="flex-[2_2_0%]  px-9 space-y-10  bg-[#222222] rounded-[30px] ml-[-18px] w-full ">
                    {/* main div main section starts  with educationa and eperience */}
                    <h1 className="text-2xl m focus:border-transparent focus:outline-noney-4    font-Inter text-[#E1348B]">
                      Education & Experience
                    </h1>
                    {/* Qualification Section with popup and respective data */}
                    <h2 className="">Qualification</h2>
                    <div className="mb-64 relative flex flex-col items-center justify-center w-full space-x-4 space-y-5  border border-[#5F6065] rounded p-10 ">
                      <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-4  text-center   overflow-hidden ">
                        {data?.details?.qualification &&
                          (data?.details?.qualification).map((e, i) => {
                            return (
                              <div
                                key={i}
                                className="border   border-[#823DA2] rounded-[15px] p-3 text-xs space-y-1 overflow-hidden"
                              >
                                <div>{e.universityname}</div>
                                <div>{e.fieldOfStudy}</div>
                                <div>
                                  {e.startdate.split("-")[0]}
                                  {" - "}
                                  {e.enddate.split("-")[0]}
                                </div>
                                <div>Grade: {e.grade}</div>
                              </div>
                            );
                          })}
                      </div>
                    </div>
                    {/* Work Experience Section with popup and respective data */}
                    <h2 className="">Work Experience</h2>
                    <div className="mb-64 relative flex flex-col items-center justify-center w-full space-x-4 space-y-4  border border-[#5F6065] rounded p-10 ">
                      <div className="flex space-x-4 items-center justify-center"></div>
                      <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-4 mt-[-30px] text-center  overflow-hidden ">
                        {data?.details?.experience !== undefined &&
                          data?.details?.experience.map((e, i) => (
                            <div
                              key={i}
                              className="border  border-[#823DA2] rounded-[15px] p-3 text-xs space-y-1 overflow-hidden"
                            >
                              <div>{e.jobtitle}</div>
                              <div>{e.employmenttype}</div>
                              <div>{e.companyname}</div>
                              <div>
                                {e.startdate.split("-")[0]}
                                {" - "}
                                {e.enddate.split("-")[0]}
                              </div>
                              <div>Working: {e.working}</div>
                            </div>
                          ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* step3 */}
          <div className=" md:mx-20 ">
            <h1 className="text-2xl font-Inter text-[#E1348B]">
              Area of Expertise
            </h1>
            {/* skills */}
            <div className="md:flex">
              <div className="mb-10 md:flex items-center space-y-4">
                <label className="block text-sm font-medium text-white mt-4 mr-5">
                  Feild of Interest:
                </label>
                <input
                  type="text"
                  className="focus:outline-none text-white text-sm rounded-lg block w-full p-4  bg-[#333333] border border-[#5F6065] placeholder-[#5F6065] focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Type if not mention in the list"
                  name="interest"
                  //  onChange={setData}
                  value={data?.details?.interest}
                  readOnly
                />
                {/* <select
                                    name="interest"
                                    //  onChange={setData}
                                    value={data?.details?.interest}
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
                                    <option className="text-xs cursor-pointer" value="C++ & DSA">
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
                                    <option className="text-xs cursor-pointer" value="Painting">
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
                                    <option className="text-xs cursor-pointer" value="Marketing">
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
                                    <option className="text-xs cursor-pointer" value="Sketching">
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
                                    <option className="text-xs cursor-pointer" value="AI/ML">
                                        AI/ML
                                    </option>
                                    <option className="text-xs cursor-pointer" value="Gaming">
                                        Gaming
                                    </option>
                                    <option className="text-xs cursor-pointer" value="Poetry">
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
                {/* <select
                                    name="interest"
                                    //  onChange={setData}
                                    value={data?.details?.interest}
                                    className="focus:outline-none text-white text-sm rounded-lg block w-full p-4  bg-[#333333] border border-[#5F6065] placeholder-[#5F6065] focus:ring-blue-500 focus:border-blue-500"
                                >
                                    <option value="" className="text-xs">
                                                             Select from this List
                                                           </option>
                                                           <option value="Python" className="text-xs">
                                                             Python
                                                           </option>
                                                           <option value="Java" className="text-xs">
                                                             Java
                                                           </option>
                                                           <option value="MERN" className="text-xs">
                                                             MERN
                                                           </option>
                                </select> */}
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
                                    //  onChange={setData}
                                    value={data?.details?.interest}
                                    readOnly
                                />
                            </div> */}
            </div>
            <div className="mb-10 md:flex items-center space-y-4 w-full">
              <label className="block text-sm font-medium text-white mt-4 mr-12">
                Skills:
              </label>
              <div className="text-white text-sm rounded-lg block w-full p-4  bg-[#333333] border border-[#5F6065] placeholder-[#5F6065] focus:ring-blue-500 focus:border-blue-500">
                <div className="flex flex-wrap  gap-2  justify-around align-middle mb-4 ">
                  {data?.details?.skills !== undefined &&
                    data?.details?.skills?.map((e, i) => (
                      <div
                        key={i}
                        className="border  border-[#823DA2] rounded-[10px] px-2 py-2 text-sm "
                      >
                        {e}{" "}
                      </div>
                    ))}
                </div>
              </div>
            </div>
            {/* ques 1 */}
            <div className="mb-10">
              <label
                htmlFor="universityName"
                className="block text-sm font-medium text-white mb-1"
              >
                What is the reason you choose your feild of Interest?
              </label>
              <input
                type="text"
                className="focus:outline-none text-white text-sm rounded-lg block w-full p-8 bg-[#333333] border border-[#5F6065] placeholder-[#5F6065] focus:ring-blue-500 focus:border-blue-500"
                placeholder="Write Answer between 30 - 50 words"
                name="reason"
                //  onChange={setData}
                readOnly
                value={data?.details?.reason}
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
                readOnly
                //  onChange={setData}
                value={data?.details?.aspiring}
              />
            </div>

            <div className="flex  justify-end">
              <div className="max-w-full text-right">
                <button
                  // onClick={detailadd}
                  onClick={() => router.push("/reta/mentors")}
                  className="p-2 mt-5 m-3 border rounded-lg pr-5 pl-5 bg-[#A145CD] "
                >
                  Back
                </button>
              </div>
              <div className="max-w-full text-right">
                <button
                  onClick={() => handleClick2()}
                  className="p-2 mt-5 m-3 border rounded-lg pr-5 pl-5 bg-[#A145CD] "
                >
                  Accept
                </button>
              </div>
            </div>
          </div>
          {/* //endsection3 */}
        </div>
        {edit ? (
          <div className="max-w-full text-right">
            <button
              // onClick={detailadd}
              className="p-2 mt-5 m-3 border rounded-lg pr-5 pl-5 bg-[#A145CD] "
            >
              Next
            </button>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
    </Layout>
  );
};

export default withAdminAuthorization(MentorProfile);
