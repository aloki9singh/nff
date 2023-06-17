import { useState } from "react";
import Schoolsidebar from "../components/Sidebar/Schoolsidebar";
import { useRouter } from "next/router";
import { useEffect } from "react";
// import MobileNav from "../components/CalenderParts/MobileNav";
import SchoolProfileTopbar from "../components/Navbar/SchoolProfileTopbar";
import Image from "next/image";
import MentorChart from "../components/Mentor/MentorChart";
import { setIn } from "formik";
import IDdraganddrop from "../components/Student/IDdraganddrop";
function MentorProfile() {
    const router = useRouter();
    const chartData = [0, 10, 20, 50, 10, 5, 20, 15, 30, 10, 11, 12]; //Change this student data to show on chart, passed as prop


    const [schoolName, setSchoolName] = useState("");
    const [udisecode, setUdisecode] = useState("");
    const [authCode, setAuthCode] = useState("");
    const [principalName, setPrincipalName] = useState("");
    const [priMail, setPriMail] = useState("");
    const [secMail, setSecMail] = useState("");
    const [priCall, setPriCall] = useState("");
    const [secCall, setSecCall] = useState("");
    const [admin, setAdmin] = useState("");
    const [noOfStudent, setNoOfStudent] = useState("");
    const [building, setBuilding] = useState("");
    const [city, setCity] = useState("");
    const [postalCode, setPostalCode] = useState("");
    const [country, setCountry] = useState("");
    const [schWebsite, setSchWebsite] = useState("");
    const [insta, setInsta] = useState("");
    const [facebook, setFacebook] = useState("");

    const onSubmitHandler = (e) => {
        e.preventDefault();
        pushdata();
    };


    return (
        <>
            <div className="md:h-screen h-full  text-base bg-[#15161B]">
                <div className="flex">
                    <div className="lg:col-span-1 hidden lg:grid">
                        {" "}
                        <Schoolsidebar pathname={router.pathname} />
                    </div>
                    <div
                        style={{ background: "#2E3036" }}
                        className="col-span-5 lg:col-span-4 md:rounded-l-[50px] pt-2 w-full "
                    >
                        <SchoolProfileTopbar heading={"Profile"} />
                        <hr className="hidden lg:block opacity-50 mt-3 "/>
                        <div className="text-white grow flex flex-col items-center justify-center h-fit md:pt-0 pt-12">
                            {/* text */}

                            <div className="   h-[200px] w-full  bg-gradient-to-r from-[#A145CD] to-[#E1348B] flex items-center justify-between" >
                              <div>

                             
                              <div className="flex items-center">
                              
                            <Image
                                            src={"/ProfileGirlimg.png"}
                                            alt="proImg"
                                            height={100}
                                            width={100}
                                            className="rounded-full w-[150px] object-contain mt-[-55px] p-4"
                                        />
                                        <div className="text-2xl ml-4 mt-[-35px]">Dav Public School</div>
                                        </div>
                            </div>
                            <div className="w-[160px] border rounded-lg bg-slate-800 p-4 mr-4">
                                  DRJ469
                                  <br />
                                  DAV Ratu Road, Ranchi
                            </div>
                            </div>
                            {/* <div className="w-full h-full   md:text-base text-sm  ">
                                <div className=" md:mx-10 mx-5">
                                    <div className="flex">
                                        {" "}
                                        
                                        <div className="text-2xl ml-4 mt-[-35px]">Garvit Kumar</div>
                                    </div>
                                </div>
                            </div> */}
                        </div>
                        {/* /// */}
                        <div className="  md:flex  gap-5 m-5  md:mt-0 text-white">
                            {/* <div className="   ">
                <div className="md:flex gap-5">
                  <div className=" md:w-1/4">
                    <div>
                      <div className=" text-left">Stats.</div>
                      <div className=" text-center gap-5  text-white  my-5  md:my-2 ">
                        <div className="bg-gradient-to-r from-[#A145CD] to-[#E1348B] rounded-2xl   py-3 my-4 md:px-3 ">
                          <p className="text-sm">4.8/5.0</p>
                          <p className="text-xs">Tutor rating</p>
                        </div>
                        <div className="bg-gradient-to-r from-[#A145CD] to-[#E1348B] rounded-2xl   py-3 my-4 md:px-3 ">
                          <p className="text-sm">500+</p>
                          <p className="text-xs">Question answered</p>
                        </div>
                        <div className="bg-gradient-to-r from-[#A145CD] to-[#E1348B] rounded-2xl   py-3 my-4 md:px-3 ">
                          <p className="text-sm">March 2023</p>
                          <p className="text-xs">Material Prepared</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="md:w-3/4">
                    <div className="text-left">
                      <div className="md:ml-10">Number of students</div>
                      <div className="mt-5 md:mt-2 ">
                        <MentorChart data={chartData} />
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between m-5 md:m-2 md:mt-[-5px]">
                    <div>Top courses</div>
                    <div>
                      <button className="border-2 p-1 text-sm">View All</button>
                    </div>
                  </div>
                  <div className="md:flex  rounded-[30px] md:space-y-0 space-y-5 md:space-x-2">
                    <div className="border bg-black rounded-[30px] p-5 md:py-2  ">
                      <Image
                        width={100}
                        height={100}
                        alt={"img"}
                        src="/Programmer coding on laptop.png"
                        className="w-12"
                      />
                      <div className="text-xs text-gray-600">COURSE</div>
                      <h1>Introduction to C++</h1>
                      <p className="text-xs text-gray-500">
                        Learn the basics of C++ and how to write your first
                        code.{" "}
                      </p>
                      <div className="text-right">
                        <button className="mt-2 text-xs  border-pink p-2 border">
                          20 Learners
                        </button>
                      </div>
                    </div>
                    <div className="border bg-black rounded-[30px] p-5 md:py-2 ">
                      <Image
                        width={50}
                        height={50}
                        alt={"img"}
                        src="/Programmer coding on laptop.png"
                        className="w-12"
                      />
                      <div className="text-xs text-gray-600">COURSE</div>
                      <h1>Introduction to C++</h1>
                      <p className="text-xs text-gray-500">
                        Learn the basics of C++ and how to write your first
                        code.{" "}
                      </p>
                      <div className="text-right">
                        <button className="mt-2 text-xs border-pink  p-2 border">
                          20 Learners
                        </button>
                      </div>
                    </div>
                    <div className="border bg-black rounded-[30px] p-5 md:py-2 ">
                      <Image
                        width={50}
                        height={50}
                        alt={"img"}
                        src="/Programmer coding on laptop.png"
                        className="w-12"
                      />
                      <div className="text-xs text-gray-600">COURSE</div>
                      <h1>Introduction to C++</h1>
                      <p className="text-xs text-gray-500">
                        Learn the basics of C++ and how to write your first
                        code.{" "}
                      </p>
                      <div className="text-right">
                        <button className="mt-2 text-xs border-[#E1348B]  p-2 border ">
                          20 Learners
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div> */}
                            {/* <div className=" ">
                <div className="bg-[#373A41] rounded-[20px] pb-9 pt-5  px-2 space-y-2 md:w-[290px] mt-5">
                  <div className=" text-center text-xl text-gray-500">
                    Educator highlights
                  </div>
                  <div className="ml-6">Worked at Neatskills</div>
                  <div className="flex gap-2">
                    {" "}
                    <span>
                      <Image
                        src={"/mentorProfile/degree_icon.png"}
                        width={100}
                        height={100}
                        alt="img"
                        className="w-5"
                      />{" "}
                    </span>{" "}
                    Studied at{" "}
                    <span className="text-[#E1348B]">xxxxx(B.Tech.)</span>
                  </div>
                  <p className="ml-7  font-extralight">
                    Latest Result: Ashwin - 100%ile Thrice in Maths in JEE Main
                    2021 , AIR 409 (JEE Advanced) through my Evolve Batch. Many
                    Students Scoring more than 99.5%ile in Maths. Producing
                    IITians every year.
                  </p>

                  <div className="flex gap-2">
                    {" "}
                    <span>
                      <Image
                        src={"/mentorProfile/location_icon.png"}
                        width={100}
                        height={100}
                        alt="img"
                        className="w-4"
                      />{" "}
                    </span>{" "}
                    Lives in{" "}
                    <span className="text-[#E1348B]">
                      {" "}
                      Kota, Rajasthan, India
                    </span>
                  </div>
                  <p className="ml-7  font-extralight">
                    Unacademy Educator since 10th March, 2022
                  </p>

                  <div className="flex gap-2">
                    {" "}
                    <span>
                      <Image
                        src={"/mentorProfile/globe_icon.png"}
                        width={100}
                        height={100}
                        alt="img"
                        className="w-5"
                      />{" "}
                    </span>{" "}
                    <span className=""> Knows Hinglish, Hindi and English</span>
                  </div>
                </div>
              </div> */}
                            <form method="post" action="#" className="w-full" onSubmit={onSubmitHandler}>

                                <div className=" text-left mt-6 text-[#E1348B] text-lg mb-4 ml-4">School Information</div>

                                <div className="w-full md:w-full flex flex-col md:flex-row items-start md:justify-between   md:items-center  gap-y-2 md:gap-x-6 px-4 mb-8  text-white">
                                <div className="w-full md:w-50% flex-col md:flex md:flex-row  justify-between md:justify-between md:items-center md:flex-1">
                                    <label htmlFor="" className ="whitespace-nowrap md:whitespace-normal md:flex-1">Name of School</label>
                                    <input
                                        type="text"
                                        placeholder="Type Here"
                                        className="w-full md:w-[330px] h-10 rounded-lg px-2 md:flex-2"
                                        style={{ background: "#505057" }}
                                        value={schoolName}
                                        onChange={(e) => setSchoolName(e.target.value)}
                                        required
                                    />
                                    </div>
                                    <div className="w-full flex-col md:flex md:flex-row justify-between md:items-center md:flex-1">
                                    <label htmlFor="" className ="whitespace-nowrap md:whitespace-normal md:flex-1">U DISE code</label>
                                    <input
                                        type="text"
                                        placeholder="Type Here"
                                        className="w-full md:w-[330px] h-10 rounded-lg px-2 md:flex-2"
                                        style={{ background: "#505057" }}
                                        value={udisecode}
                                        onChange={(e) => setUdisecode(e.target.value)}
                                        required
                                    />
                                    </div>
                                </div>

                                <div className="w-full md:w-full  flex flex-col md:flex-row justify-between items-start md:items-center gap-y-2 md:gap-x-6 px-4 mb-8  text-white">
                                <div className="w-full flex-col md:flex md:flex-row justify-between md:items-center md:flex-1">
                                    <label htmlFor="" className ="whitespace-nowrap md:whitespace-normal md:flex-1">6 Digit Auth Code</label>
                                    <input
                                        type="text"
                                        placeholder="Type Here"
                                        className="w-full md:w-[330px] h-10 rounded-lg px-2 md:flex-2"
                                        style={{ background: "#505057" }}
                                        value={authCode}
                                        onChange={(e) => setAuthCode(e.target.value)}
                                        required
                                    />
                                    </div>
                                    <div className="w-full flex-col md:flex md:flex-row justify-between md:items-center md:flex-1">
                                    <label htmlFor="" className ="whitespace-nowrap md:whitespace-normal md:flex-1">Principal Name</label>
                                    <input
                                        type="text"
                                        placeholder="Type Here"
                                        className="w-full md:w-[330px] h-10 rounded-lg px-2 md:flex-2"
                                        style={{ background: "#505057" }}
                                        value={principalName}
                                        onChange={(e) => setPrincipalName(e.target.value)}
                                        required
                                    />
                                    </div>
                                </div>

                                <div className="w-full md:w-full flex flex-col md:flex-row justify-between items-start md:items-center gap-y-2 md:gap-x-6 px-4 mb-8  text-white">
                                <div className="w-full flex-col md:flex md:flex-row justify-between md:items-center md:flex-1">
                                    <label htmlFor="" className ="whitespace-nowrap md:whitespace-normal md:flex-1">Primary Email Address</label>
                                    <input
                                        type="text"
                                        placeholder="Type Here"
                                        className="w-full md:w-[330px] h-10 rounded-lg px-2 md:flex-2"
                                        style={{ background: "#505057" }}
                                        value={priMail}
                                        onChange={(e) => setPriMail(e.target.value)}
                                        required
                                    />
                                    </div>
                                    <div className="w-full flex-col md:flex md:flex-row  justify-between md:items-center md:flex-1">
                                    <label htmlFor="" className ="whitespace-nowrap md:whitespace-normal md:flex-1">Secondary Email Address</label>
                                    <input
                                        type="text"
                                        placeholder="Type Here"
                                        className="w-full md:w-[330px] h-10 rounded-lg px-2 md:flex-2"
                                        style={{ background: "#505057" }}
                                        value={secMail}
                                        onChange={(e) => setSecMail(e.target.value)}
                                        required
                                    />
                                    </div>
                                </div>
                                <div className="w-full md:w-full flex flex-col md:flex-row justify-between items-start md:items-center gap-y-2 md:gap-x-6 px-4 mb-8  text-white ">
                                <div className="w-[50%] flex-col md:flex md:flex-row  justify-between md:items-center md:flex-1">
                                    <label htmlFor="" className ="whitespace-nowrap md:whitespace-normal md:flex-1">Primary Calling Number</label>
                                    <input
                                        type="text"
                                        placeholder="Type Here"
                                        className="w-full md:w-[330px] h-10 rounded-lg px-2 md:flex-2"
                                        style={{ background: "#505057" }}
                                        value={priCall}
                                        onChange={(e) => setPriCall(e.target.value)}
                                        required
                                    />
                                    </div>
                                    <div className="w-full flex-col md:flex md:flex-row  justify-between md:items-center md:flex-1">
                                    <label htmlFor="" className ="whitespace-nowrap md:whitespace-normal md:flex-1">Secondary Calling Number</label>
                                    <input
                                        type="text"
                                        placeholder="Type Here"
                                        className="w-full md:w-[330px] h-10 rounded-lg px-2 md:flex-2"
                                        style={{ background: "#505057" }}
                                        value={secCall}
                                        onChange={(e) => setSecCall(e.target.value)}
                                        required
                                    />
                                    </div>
                                </div>
                                <div className="w-full md:w-full flex flex-col md:flex-row justify-between items-start md:items-center gap-y-2 md:gap-x-6 px-4 mb-8  text-white">
                                <div className="w-[50%] flex-col md:flex md:flex-row  justify-between md:items-center md:flex-1">
                                    <label htmlFor="" className ="whitespace-nowrap md:whitespace-normal md:flex-1">Name of neatskills admin</label>
                                    <input
                                        type="text"
                                        placeholder="Type Here"
                                        className="w-full md:w-[330px] h-10 rounded-lg px-2 md:flex-2"
                                        style={{ background: "#505057" }}
                                        value={admin}
                                        onChange={(e) => setAdmin(e.target.value)}
                                        required
                                    />
                                    </div>
                                    <div className="w-full flex-col md:flex md:flex-row  justify-between md:items-center md:flex-1 md:gap-x-4">
                                    <label htmlFor="" className ="whitespace-nowrap md:whitespace-normal md:flex-1">Number of students in school</label>
                                    <input
                                        type="text"
                                        placeholder="Type Here"
                                        className="w-full md:w-[330px] h-10 rounded-lg px-2 md:flex-2"
                                        style={{ background: "#505057" }}
                                        value={noOfStudent}
                                        onChange={(e) => setNoOfStudent(e.target.value)}
                                        required
                                    />
                                    </div>
                                </div>

                                <div className=" text-left mt-6 text-[#E1348B] text-lg mb-4 ml-4">School Address</div>

                                <div className="w-full md:w-full flex flex-col md:flex-row justify-start items-start md:items-center gap-y-2 md:gap-x-6 px-4 mb-8  text-white">
                                    <label htmlFor="">Building, Street name</label>
                                    <input
                                        type="text"
                                        placeholder="Type Here"
                                        className="w-full md:w-[80%] h-14  rounded-lg px-2 placeholder:text-sm focus:outline-none md:p-4"
                                        style={{ background: "#505057" }}
                                        value={building}
                                        onChange={(e) => setBuilding(e.target.value)}
                                        required
                                    />

                                </div>

                                <div className="w-[331px] md:w-full flex flex-col md:flex-row justify-start items-start md:items-center  gap-y-2 md:gap-x-6 px-4 mb-8  text-white">
                              <div className="md:flex-1">
                                    <label htmlFor="" className="md:flex-1 mr-10">City</label>
                                    <input
                                        type="text"
                                        placeholder="Type Here"
                                        className="w-full md:w-[319px] h-10 rounded-lg px-2 md:flex-1"
                                        style={{ background: "#505057" }}
                                        value={city}
                                        onChange={(e) => setCity(e.target.value)}
                                        required
                                    />
</div>
<div className="md:flex-1">
                                    <label htmlFor="" className ="whitespace-nowrap md:flex-1 mr-10">Postal Code</label>
                                    <input
                                        type="text"
                                        placeholder="Type Here"
                                        className="w-full md:w-[319px] h-10 rounded-lg px-2 md:flex-1 "
                                        style={{ background: "#505057" }}
                                        value={postalCode}
                                        onChange={(e) => setPostalCode(e.target.value)}
                                        required
                                    />
</div>
                                </div>

                                <div className="w-full md:w-fit  flex flex-col md:flex-row justify-between items-start  md:items-center gap-y-2 md:gap-x-2 px-4 mb-8  text-white">
                                    <label htmlFor="">Country</label>
                                    <input
                                        type="text"
                                        placeholder="Type Here"
                                        className="w-full md:w-[319px] h-10 rounded-lg px-2"
                                        style={{ background: "#505057" }}
                                        value={country}
                                        onChange={(e) => setCountry(e.target.value)}
                                        required
                                    />

                                </div>


                                <div className=" text-left mt-6 text-[#E1348B] text-lg mb-4 ml-4">Links and Logo</div>
                                <div className="w-[60%]  flex flex-col md:flex-row justify-between items-start md:items-center md:justify-start gap-y-2 md:gap-x-4 px-4 mb-8  text-white ">
                                    <label htmlFor="" >School Website Link</label>
                                    <input
                                        type="text"
                                        placeholder="Add URL"
                                        className="w-full md:w-[319px] h-10 rounded-lg px-2"
                                        style={{ background: "#505057" }}
                                        value={schWebsite}
                                        onChange={(e) => setSchWebsite(e.target.value)}
                                        required
                                    />

                                </div><div className="w-[60%]  flex flex-col md:flex-row justify-between items-start md:items-center md:justify-start gap-y-2 md:gap-x-14 px-4 mb-8  text-white">
                                    <label htmlFor="">Instagram Link</label>
                                    <input
                                        type="text"
                                        placeholder="Add URL"
                                        className="w-full md:w-[319px] h-10 rounded-lg px-2"
                                        style={{ background: "#505057" }}
                                        value={insta}
                                        onChange={(e) => setInsta(e.target.value)}
                                        required
                                    />

                                </div>
                                <div className="w-[60%] flex flex-col md:flex-row justify-between items-start md:items-center md:justify-start gap-y-2 md:gap-x-16 px-4 mb-8  text-white">


                                    <label htmlFor="">Facebook Link</label>
                                    <input
                                        type="text"
                                        placeholder="Add URL"
                                        className="w-full md:w-[319px] h-10 rounded-lg px-2"
                                        style={{ background: "#505057" }}
                                        value={facebook}
                                        onChange={(e) => setFacebook(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="w-full md:w-[80%] flex flex-col md:flex-row   gap-y-2 md:gap-x-16 p-8 mb-8  text-white">


                                    <label htmlFor="" className="whitespace-nowrap" >School Logo</label>
                                    <div className="border border-gray-300 rounded-10 flex justify-center items-center p-4 md:w-full">
                                    <IDdraganddrop />
                                    </div>
                                </div>

                                <div className="flex justify-end">
                                    <button
                                        type="submit"
                                        className="text-white  bg-[#AA2769] focus:ring-4 focus:outline-none font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center hover:bg-[#93225a] my-8"
                                    >
                                        Submit
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                <div className=" ">
                    {/* <MobileNav></MobileNav> */}
                </div>
            </div>
        </>
    );
}
export default MentorProfile;
