import { useState } from "react";
import Schoolsidebar from "@/components/common/sidebar/school";
import { useRouter } from "next/router";
import { useEffect } from "react";
// import MobileNav from "../components/CalenderParts/MobileNav";
import SchoolTopbar from "@/components/common/navbar/schooltopbar";
import Image from "next/image";
// import MentorChart from "../components/Mentor/MentorChart";
import { setIn } from "formik";
import IDdraganddrop from "@/components/student/assignments/iddraganddrop";
import { collection, doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from "@/config/firebaseconfig";
import { generate } from "shortid";
import { useMediaQuery } from "react-responsive";
import { useAuthContext } from "@/lib/context/AuthContext";

function MentorProfile() {
  const router = useRouter();
  const [profile, setProfile] = useState()
  const [edit, setEdit] = useState(false)
  
  useEffect(() => {
    const getData = async () => {
      const usersCollection = collection(db, "allusers");
      const q = doc(usersCollection, user.uid)
      const querySnapshot = await getDoc(q);
      if (!querySnapshot.empty) {
        setProfile(querySnapshot.data());
      }
    }
    getData()
  }, [user])
  const handleChange = (e) => {
    e.preventDefault()
    setProfile({ ...profile, [e.target.name]: e.target.value })
  }
  const isMediumScreen = useMediaQuery({ minWidth: 768 });
  const isMobileScreen = useMediaQuery({ maxWidth: 767 });
  const [showSideBar, setShowSideBar] = useState(false);
  const [SideBarState, sendSideBarState] = useState(false);
  const { user } = useAuthContext()

  // push nhi ho rha

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    const schoolProfile = {
      principalName: profile?.principalName,
      numberOfStudents: profile?.numberOfStudents,
      primaryEmail: profile?.primaryEmail,
      secondaryEmail: profile?.secondaryEmail,
      primaryPhoneNumber: profile?.primaryPhoneNumber,
      secondaryPhoneNumber: profile?.secondaryPhoneNumber,
      schoolWebsite: profile?.schoolWebsite,
      instagramLink: profile?.instagramLink,
      facebookLink: profile?.facebookLink,
    };

    // store to firestore
    try {
      const docRef = await updateDoc(
        doc(db, "allusers",user.uid ),
        schoolProfile
      );
      // console.log("Document written with ID: ", docRef.id);
      alert("Profile Updated");
      setEdit(false)
    } catch (e) {
      console.log(e);
    }
  };

  const handleClick = () => {
    setEdit(!edit)
  }


  function toggleSideBar() {
    setShowSideBar(!showSideBar);
    sendSideBarState(showSideBar);
  }
  useEffect(() => {
    if (isMediumScreen) {
      sendSideBarState(false);
    }
  }, [isMediumScreen]);

  return (
    <>
      <div className="md:h-screen h-full text-base">
        <div className="flex">
          {/* First Sidebar - Visible on Mobile */}
          {isMobileScreen && (
            <div
              className={`fixed right-0 ${SideBarState ? "block" : "hidden"
                } w-[281px] h-screen bg-[#25262C]  rounded-l-[40px] z-10`}
            >
              <Schoolsidebar toggleSideBar={toggleSideBar} />
            </div>
          )}

          {/* Second Sidebar - Visible on Desktop */}
          {!isMobileScreen && (
            <div className={`md:block  hidden w-[221px] bg-[#141518] z-10`}>
              <Schoolsidebar toggleSideBar={toggleSideBar} />
            </div>
          )}
          <div
            className="col-span-5 bg-[#2E3036] w-full lg:col-span-4 "
          >
            <div className=" md:bg-[#2E3036] bg-[#141518] top-0 md:border-b-[1px] border-b-[2px] border-[#717378]">
              <SchoolTopbar heading="My Progress" toggleSideBar={toggleSideBar} />
            </div>
            <hr className="hidden lg:block opacity-50 " />
            <div className="text-white grow flex flex-col items-center justify-center h-fit md:pt-0">
              {/* text */}

              <div className="h-[200px] w-full  bg-[url('/componentsgraphics/schools/back.svg')] bg-no-repeat bg-cover flex items-center justify-between">
                <div>
                  <div className="flex items-center">
                    <Image
                      src={"/pagesgraphics/school/profile/ProfileGirlimg.svg"}
                      alt="proImg"
                      height={100}
                      width={100}
                      className="rounded-full w-[150px] object-contain mt-[-55px] p-4"
                    />
                    <div className="text-2xl ml-4 mt-[-35px]">
                      {profile?.schoolName}
                    </div>
                  </div>
                </div>
                <div className="w-[200px] border rounded-lg bg-slate-800 p-4 mr-4">
                  <h1 className="text-center text-xl">
                    {profile?.authCode}
                  </h1>
                  <br />
                  <p className="text-sm">
                    {profile?.buiding}, {profile?.city}, {profile?.district}
                  </p>
                </div>
              </div>
            </div>
            {/* /// */}
            {!edit ? <div className="flex justify-end mt-8 mr-8">
              <button className="p-4 px-8 bg-[#505057] text-white rounded-[10px]" onClick={handleClick}>
                Edit Profile
              </button>
            </div> :
              <div className="flex justify-end mt-8 mr-8">
                <button className="p-4 px-8 bg-[#A145CD] text-white rounded-[10px] mr-2  " onClick={onSubmitHandler}>
                  Save
                </button>
                <button className="p-4 px-8 bg-[#505057] text-white rounded-[10px]" onClick={handleClick}>
                  Cancel
                </button>
              </div>}
            <div className="md:flex  gap-5 m-5  md:mt-0 text-white">
              <form
                method="post"
                action="#"
                className="w-full"
                onSubmit={onSubmitHandler}
              >
                <div className=" text-left mt-6 text-[#E1348B] text-lg mb-4 ml-4">
                  School Information
                </div>

                <div className="w-full md:w-full flex flex-col md:flex-row justify-between items-start md:items-center gap-y-2 md:gap-x-6 px-4 mb-8  text-white">
                  <label
                    htmlFor=""
                  >
                    Name of School
                  </label>
                  <input
                    type="text"
                    placeholder="Type Here"
                    className="w-full md:w-[81.3%] h-14  rounded-lg px-2 placeholder:text-sm focus:outline-none md:p-4"
                    style={{ background: "#505057" }}
                    value={profile?.schoolName}
                    onChange={handleChange}
                    name="schoolName"
                    readOnly
                    required
                  />
                </div>

                <div className="w-full md:w-full  flex flex-col md:flex-row justify-between items-start md:items-center gap-y-2 md:gap-x-6 px-4 mb-8  text-white">
                  <div className="w-full flex-col md:flex md:flex-row justify-between md:items-center md:flex-1">
                    <label
                      htmlFor=""
                      className="whitespace-nowrap md:whitespace-normal md:flex-1"
                    >
                      U DISE code
                    </label>
                    <input
                      type="text"
                      placeholder="Type Here"
                      className="w-full md:w-[62%] h-10 rounded-lg px-2 md:flex-2"
                      style={{ background: "#505057" }}
                      value={profile?.udiseId}
                      onChange={handleChange}
                      name="udiseId"
                      readOnly
                      required
                    />
                  </div>
                  <div className="w-full flex-col md:flex md:flex-row justify-between md:items-center md:flex-1">
                    <label
                      htmlFor=""
                      className="whitespace-nowrap md:whitespace-normal md:flex-1"
                    >
                      Principal Name
                    </label>
                    <input
                      type="text"
                      placeholder="Type Here"
                      className="w-full md:w-[62%] h-10 rounded-lg px-2 md:flex-2"
                      style={{ background: "#505057" }}
                      value={profile?.principalName}
                      onChange={handleChange}
                      readOnly={!edit}
                      name="principalName"
                      required
                    />
                  </div>

                </div>

                <div className="w-full md:w-full flex flex-col md:flex-row justify-between items-start md:items-center gap-y-2 md:gap-x-6 px-4 mb-8  text-white">
                  <div className="w-full flex-col md:flex md:flex-row justify-between md:items-center md:flex-1">
                    <label
                      htmlFor=""
                      className="whitespace-nowrap md:whitespace-normal md:flex-1"
                    >
                      Primary Email Address
                    </label>
                    <input
                      type="text"
                      placeholder="Type Here"
                      className="w-full md:w-[62%] h-10 rounded-lg px-2 md:flex-2"
                      style={{ background: "#505057" }}
                      value={profile?.primaryEmail}
                      onChange={handleChange}
                      readOnly={!edit}
                      name="primaryEmail"
                      required
                    />
                  </div>
                  <div className="w-full flex-col md:flex md:flex-row  justify-between md:items-center md:flex-1">
                    <label
                      htmlFor=""
                      className="whitespace-nowrap md:whitespace-normal md:flex-1"
                    >
                      Secondary Email Address
                    </label>
                    <input
                      type="text"
                      placeholder="Type Here"
                      className="w-full md:w-[62%] h-10 rounded-lg px-2 md:flex-2"
                      style={{ background: "#505057" }}
                      value={profile?.secondaryEmail}
                      onChange={handleChange}
                      readOnly={!edit}
                      name="secondaryEmail"
                      required
                    />
                  </div>
                </div>
                <div className="w-full md:w-full flex flex-col md:flex-row justify-between items-start md:items-center gap-y-2 md:gap-x-6 px-4 mb-8  text-white ">
                  <div className="w-[50%] flex-col md:flex md:flex-row  justify-between md:items-center md:flex-1">
                    <label
                      htmlFor=""
                      className="whitespace-nowrap md:whitespace-normal md:flex-1"
                    >
                      Primary Calling Number
                    </label>
                    <input
                      type="text"
                      placeholder="Type Here"
                      className="w-full md:w-[62%] h-10 rounded-lg px-2 md:flex-2"
                      style={{ background: "#505057" }}
                      value={profile?.primaryPhoneNumber}
                      onChange={handleChange}
                      readOnly={!edit}
                      name="primaryPhoneNumber"
                      required
                    />
                  </div>
                  <div className="w-full flex-col md:flex md:flex-row  justify-between md:items-center md:flex-1">
                    <label
                      htmlFor=""
                      className="whitespace-nowrap md:whitespace-normal md:flex-1"
                    >
                      Secondary Calling Number
                    </label>
                    <input
                      type="text"
                      placeholder="Type Here"
                      className="w-full md:w-[62%] h-10 rounded-lg px-2 md:flex-2"
                      style={{ background: "#505057" }}
                      value={profile?.secondaryPhoneNumber}
                      onChange={handleChange}
                      readOnly={!edit}
                      name="secondaryPhoneNumber"
                      required
                    />
                  </div>
                </div>
                <div className="w-full md:w-full flex flex-col md:flex-row justify-between items-start md:items-center gap-y-2 md:gap-x-6 px-4 mb-8  text-white">
                  <div className="w-[50%] flex-col md:flex md:flex-row  justify-between md:items-center md:flex-1">
                    <label
                      htmlFor=""
                      className="whitespace-nowrap md:whitespace-normal md:flex-1"
                    >
                      Name of neatskills admin
                    </label>
                    <input
                      type="text"
                      placeholder="Type Here"
                      className="w-full md:w-[62%] h-10 rounded-lg px-2 md:flex-2"
                      style={{ background: "#505057" }}
                      value={profile?.adminName}
                      onChange={handleChange}
                      name="adminName"
                      readOnly
                      required
                    />
                  </div>
                  <div className="w-full flex-col md:flex md:flex-row  justify-between md:items-center md:flex-1 md:gap-x-4">
                    <label
                      htmlFor=""
                      className="whitespace-nowrap md:whitespace-normal md:flex-1"
                    >
                      Number of students in school
                    </label>
                    <input
                      type="text"
                      placeholder="Type Here"
                      className="w-full md:w-[62%] h-10 rounded-lg px-2 md:flex-2"
                      style={{ background: "#505057" }}
                      value={profile?.numberOfStudents}
                      onChange={handleChange}
                      readOnly={!edit}
                      name="numberOfStudents"
                      required
                    />
                  </div>
                </div>

                <div className=" text-left mt-6 text-[#E1348B] text-lg mb-4 ml-4">
                  School Address
                </div>

                <div className="w-full md:w-full flex flex-col md:flex-row justify-between items-start md:items-center gap-y-2 md:gap-x-6 px-4 mb-8  text-white">
                  <label htmlFor="">Building, Street name</label>
                  <input
                    type="text"
                    placeholder="Type Here"
                    className="w-full md:w-[81.3%] h-14  rounded-lg px-2 placeholder:text-sm focus:outline-none md:p-4"
                    style={{ background: "#505057" }}
                    value={profile?.schoolAddress}
                    onChange={handleChange}
                    readOnly
                    name="schoolAddress"
                    required
                  />
                </div>

                <div className="w-[331px] md:w-full flex flex-col md:flex-row justify-start items-start md:items-center  gap-y-2 md:gap-x-6 px-4 mb-8  text-white">
                  <div className="w-[50%] flex-col md:flex md:flex-row  justify-between md:items-center md:flex-1">
                    <label htmlFor="" className="md:flex-1 mr-10">
                      City
                    </label>
                    <input
                      type="text" E
                      placeholder="Type Here"
                      className="w-full md:w-[62%] h-10 rounded-lg px-2"
                      style={{ background: "#505057" }}
                      value={profile?.city}
                      onChange={handleChange}
                      readOnly
                      name="city"
                      required
                    />
                  </div>
                  <div className="w-[50%] flex-col md:flex md:flex-row  justify-between md:items-center md:flex-1">
                    <label
                      htmlFor=""
                      className="whitespace-nowrap md:flex-1 mr-10"
                    >
                      Postal Code
                    </label>
                    <input
                      type="text"
                      placeholder="Type Here"
                      className="w-full md:w-[60%] h-10 rounded-lg px-2 "
                      style={{ background: "#505057" }}
                      value={profile?.postalCode}
                      onChange={handleChange}
                      readOnly
                      name="postalCode"
                      required
                    />
                  </div>
                </div>

                <div className="w-full flex flex-col md:flex-row justify-between items-start md:items-center  gap-y-2 md:gap-x-6 px-4 mb-8 text-white">
                  <div className="w-[50%] flex-col md:flex md:flex-row  justify-between md:items-center md:flex-1">
                    <label htmlFor="" className="md:flex-1 mr-4">
                      District
                    </label>
                    <input
                      type="text"
                      placeholder="Type Here"
                      className="w-full md:w-[62%] h-10 rounded-lg px-2 "
                      style={{ background: "#505057" }}
                      value={profile?.district}
                      onChange={handleChange}
                      readOnly
                      required
                    />
                  </div>
                  <div className="w-[50%] flex-col md:flex md:flex-row  justify-between md:items-center md:flex-1">
                    <label htmlFor="" className="whitespace-nowrap md:flex-1 mr-[4.3em]">Country</label>
                    <input
                      type="text"
                      placeholder="Type Here"
                      className="w-full md:w-[60%] h-10 rounded-lg px-2"
                      style={{ background: "#505057" }}
                      value={profile?.country}
                      onChange={handleChange}
                      readOnly
                      name="country"
                      required
                    />
                  </div>
                </div>
                <div className=" text-left mt-6 text-[#E1348B] text-lg mb-4 ml-4">
                  Links and Logo
                </div>
                <div className="w-[50%] flex-col md:flex md:flex-row  justify-between items-start md:items-center gap-y-2  px-4 mb-8  text-white">
                  <label htmlFor="">School Website Link</label>
                  <input
                    type="text"
                    placeholder="Add URL"
                    className="w-full md:w-[60%] h-10 rounded-lg px-2 mx-4"
                    style={{ background: "#505057" }}
                    value={profile?.schoolWebsite}
                    onChange={handleChange}
                    readOnly={!edit}
                    name="schoolWebsite"
                    required
                  />
                </div>
                <div className="w-[50%] flex-col md:flex md:flex-row  justify-between items-start md:items-center gap-y-2  px-4 mb-8  text-white">
                  <label htmlFor="">Instagram Link</label>
                  <input
                    type="text"
                    placeholder="Add URL"
                    className="w-full md:w-[60%] h-10 rounded-lg px-2 mx-4"
                    style={{ background: "#505057" }}
                    value={profile?.instagramLink}
                    onChange={handleChange}
                    readOnly={!edit}
                    name="instagramLink"
                    required
                  />
                </div>
                <div className="w-[50%] flex-col md:flex md:flex-row  justify-between items-start md:items-center gap-y-2  px-4 mb-8  text-white">
                  <label htmlFor="">Facebook Link</label>
                  <input
                    type="text"
                    placeholder="Add URL"
                    className="w-full md:w-[60%] h-10 rounded-lg px-2 mx-4"
                    style={{ background: "#505057" }}
                    value={profile?.facebookLink}
                    readOnly={!edit}
                    name="facebookLink"
                    required
                  />

                </div>
                {edit ? <div className="w-full md:w-[80%] flex flex-col md:flex-row   gap-y-2 md:gap-x-16 p-8 mb-8  text-white">
                  <label htmlFor="" className="whitespace-nowrap">
                    School Logo
                  </label>
                  <div className="border border-gray-300 rounded-10 flex justify-center items-center p-4 md:w-full">
                    <IDdraganddrop />
                  </div>
                </div> : ""}
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default MentorProfile;
