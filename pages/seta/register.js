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
import { doc, setDoc } from "firebase/firestore";
import { db } from "@/config/firebaseconfig";
import { generate } from "shortid";
import { useMediaQuery } from "react-responsive";

function SchoolRegister() {
    const router = useRouter();
    const {uid} = router.query
    const [schoolName, setSchoolName] = useState("");
    const [udisecode, setUdisecode] = useState("");
    const [authCode, setAuthCode] = useState("");
    const [principalName, setPrincipalName] = useState("");
    const [priMail, setPriMail] = useState();
    const [secMail, setSecMail] = useState();
    const [priCall, setPriCall] = useState("");
    const [secCall, setSecCall] = useState("");
    const [admin, setAdmin] = useState("");
    const [noOfStudent, setNoOfStudent] = useState();
    const [building, setBuilding] = useState("");
    const [city, setCity] = useState("");
    const [district, setDistrict] = useState("");
    const [postalCode, setPostalCode] = useState();
    const [country, setCountry] = useState("");
    const [schWebsite, setSchWebsite] = useState("");
    const [insta, setInsta] = useState("");
    const [facebook, setFacebook] = useState("");
    const isMediumScreen = useMediaQuery({ minWidth: 768 });
    const isMobileScreen = useMediaQuery({ maxWidth: 767 });
    const [showSideBar, setShowSideBar] = useState(false);
    const [SideBarState, sendSideBarState] = useState(false);

    function generateCode(school,district,city,length) {
        const digits = "0123456789";
        let code = school.slice(0,1)+district.slice(0,1)+city.slice(0,1)+"";

        for (let i = 0; i < length; i++) {
            code += digits[Math.floor(Math.random() * digits.length)];
        }

        setAuthCode(code)
    }

    const onSubmitHandler = async (e) => {
        e.preventDefault();

        generateCode(schoolName,district,city,3);
        if (!udisecode || !authCode) {
            alert("Please fill all the required fields");
            return;
        }

        const schoolProfile = {
            uid,
            schoolName,
            udiseId: udisecode,
            authCode,
            principalName,
            numberOfStudents: noOfStudent,
            primaryEmail: priMail,
            secondaryEmail: secMail,
            adminName: admin,
            primaryPhoneNumber: priCall,
            secondaryPhoneNumber: secCall,
            schoolAddress: building,
            city,
            district,
            postalCode,
            country,
            schoolWebsite: schWebsite,
            instagramLink: insta,
            facebookLink: facebook,
        };
        console.log("schoolProfile", schoolProfile);

        // store to firestore
        try {
            const docRef = await setDoc(
                doc(db, "schoolProfile", udisecode),
                schoolProfile
            );
            alert("You will receive an email after confirmation. For more information contact to support@neatskills");
        } catch (e) {
            console.log(e);
        }
    };
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
                        className="col-span-5 bg-[#2E3036] w-full lg:col-span-4"
                    >
                        <div className=" md:bg-[#2E3036] bg-[#141518] top-0 md:border-b-[1px] border-b-[2px] border-[#717378]">
                            <SchoolTopbar heading="Enter Below Details" toggleSideBar={toggleSideBar} />
                        </div>
                        <div className="md:flex  gap-5 md:mt-0 text-white mx-10">
                            <form
                                method="post"
                                action="#"
                                className="w-full"
                                onSubmit={onSubmitHandler}
                            >
                                <div className=" text-left mt-6 text-[#E1348B] text-lg mb-4 ml-4">
                                    School Information
                                </div>

                                <div className="w-full md:w-full flex flex-col md:flex-row items-start md:justify-between   md:items-center  gap-y-2 md:gap-x-6 px-4 mb-8  text-white">
                                    <div className="w-full md:w-50% flex-col md:flex md:flex-row  justify-between md:justify-between md:items-center md:flex-1">
                                        <label
                                            htmlFor=""
                                            className="whitespace-nowrap md:whitespace-normal md:flex-1"
                                        >
                                            Name of School
                                        </label>
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
                                        <label
                                            htmlFor=""
                                            className="whitespace-nowrap md:whitespace-normal md:flex-1"
                                        >
                                            U DISE code
                                        </label>
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
                                        <label
                                            htmlFor=""
                                            className="whitespace-nowrap md:whitespace-normal md:flex-1"
                                        >
                                            6 Digit Auth Code
                                        </label>
                                        <input
                                            type="text"
                                            placeholder="Automatically Filled"
                                            className="w-full md:w-[330px] h-10 rounded-lg px-2 md:flex-2"
                                            style={{ background: "#505057" }}
                                            value={authCode}
                                            onChange={(e) => setAuthCode(e.target.value)}
                                            disabled
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
                                        <label
                                            htmlFor=""
                                            className="whitespace-nowrap md:whitespace-normal md:flex-1"
                                        >
                                            Primary Email Address
                                        </label>
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
                                        <label
                                            htmlFor=""
                                            className="whitespace-nowrap md:whitespace-normal md:flex-1"
                                        >
                                            Secondary Email Address
                                        </label>
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
                                        <label
                                            htmlFor=""
                                            className="whitespace-nowrap md:whitespace-normal md:flex-1"
                                        >
                                            Primary Calling Number
                                        </label>
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
                                        <label
                                            htmlFor=""
                                            className="whitespace-nowrap md:whitespace-normal md:flex-1"
                                        >
                                            Secondary Calling Number
                                        </label>
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
                                        <label
                                            htmlFor=""
                                            className="whitespace-nowrap md:whitespace-normal md:flex-1"
                                        >
                                            Name of neatskills admin
                                        </label>
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
                                        <label
                                            htmlFor=""
                                            className="whitespace-nowrap md:whitespace-normal md:flex-1"
                                        >
                                            Number of students in school
                                        </label>
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

                                <div className=" text-left mt-6 text-[#E1348B] text-lg mb-4 ml-4">
                                    School Address
                                </div>

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
                                        <label htmlFor="" className="md:flex-1 mr-10">
                                            City
                                        </label>
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
                                        <label
                                            htmlFor=""
                                            className="whitespace-nowrap md:flex-1 mr-10"
                                        >
                                            Postal Code
                                        </label>
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

                                <div className="w-[331px] md:w-full flex flex-col md:flex-row justify-start items-start md:items-center  gap-y-2 md:gap-x-6 px-4 mb-8  text-white">
                                <div className="md:flex-1">
                                        <label htmlFor="" className="md:flex-1 mr-4">
                                            District
                                        </label>
                                        <input
                                            type="text"
                                            placeholder="Type Here"
                                            className="w-full md:w-[319px] h-10 rounded-lg px-2 md:flex-1"
                                            style={{ background: "#505057" }}
                                            value={district}
                                            onChange={(e) => setDistrict(e.target.value)}
                                            required
                                        />
                                    </div>
                                <div className="md:flex-1">
                                    <label htmlFor=""
                                     className="whitespace-nowrap md:flex-1 mr-[4.3em]">Country</label>
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
                                </div>

                                <div className=" text-left mt-6 text-[#E1348B] text-lg mb-4 ml-4">
                                    Links and Logo
                                </div>
                                <div className="w-[60%]  flex flex-col md:flex-row justify-between items-start md:items-center md:justify-start gap-y-2 md:gap-x-4 px-4 mb-8  text-white ">
                                    <label htmlFor="">School Website Link</label>
                                    <input
                                        type="text"
                                        placeholder="Add URL"
                                        className="w-full md:w-[319px] h-10 rounded-lg px-2"
                                        style={{ background: "#505057" }}
                                        value={schWebsite}
                                        onChange={(e) => setSchWebsite(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="w-[60%]  flex flex-col md:flex-row justify-between items-start md:items-center md:justify-start gap-y-2 md:gap-x-14 px-4 mb-8  text-white">
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
                                    <label htmlFor="" className="whitespace-nowrap">
                                        School Logo
                                    </label>
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
            </div>
        </>
    );
}
export default SchoolRegister;
