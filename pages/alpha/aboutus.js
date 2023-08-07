import React, { useEffect, useRef, useState } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
import { useMediaQuery } from "react-responsive";
import { db } from "@/config/firebaseconfig";
import Image from "next/image";
import Dashboardnav from "@/components/common/navbar/dashboardnav";

import Sidebar from "@/components/common/sidebar/sidebar";
import { contactFn, contactFnaboutus } from "@/lib/api";
import { Carousel } from "react-responsive-carousel";

import "react-responsive-carousel/lib/styles/carousel.min.css";
import Footer from "@/components/common/footer/footer";
import CourseoverviewSidebar from "@/components/common/sidebar/courseoverview";
import Description from "@/components/common/aboutus/description";
import Title from "@/components/common/aboutus/title";
import OurMissionSection from "@/components/common/aboutus/ourmission";
import OurLoveSection from "@/components/common/aboutus/ourLove";
import TeamSection from "@/components/common/aboutus/team";
import GetInTouch from "@/components/common/aboutus/getInTouch";

const Aboutus = () => {
	const [mentor, setMentor] = useState([]);

	useEffect(() => {
		const fetchPost = async () => {
			const q = query(
				collection(db, "allusers"),
				where("role", "==", "mentor")
			);
			const querySnapshot = await getDocs(q);
			const newData = querySnapshot.docs.map((doc) => ({
				...doc.data(),
				id: doc.id,
			}));
			setMentor(newData);
		};

		fetchPost();
	}, [mentor]);

	const scrollContainerRef = useRef(null);

	const scrollBackward = () => {
		scrollContainerRef.current.scrollBy({
			left: -200, // Adjust the scroll amount as per your requirements
			behavior: "smooth",
		});
	};

	const scrollForward = () => {
		scrollContainerRef.current.scrollBy({
			left: 200, // Adjust the scroll amount as per your requirements
			behavior: "smooth",
		});
	};

	const style = document.createElement("style");

	// Set the CSS code as the inner text of the <style> element
	style.innerText = `
  .hide-scrollbar {
    overflow-x: auto;
    scrollbar-width: none; /* Firefox */
    -ms-overflow-style: none; /* IE and Edge */
  }

  .hide-scrollbar::-webkit-scrollbar {
    width: 0.5rem; /* Adjust as needed */
    background-color: transparent;
  }

  .hide-scrollbar::-webkit-scrollbar-thumb {
    background-color: transparent;
  }
`;

	document.head.appendChild(style);

	const [email, setEmail] = useState("");
	const [name, setName] = useState("");
	const [phoneNo, setPhoneNo] = useState("");
	const [title, setTitle] = useState("");
	const [subject, setSubject] = useState("");
	const formData = { title, email, name, phoneNo, subject };

	const OurMissionData = [
		{
			title: "Affordability",
			desc: "Our mission is to offer a highly affordable and accessible learning platform, ensuring education is accessible to all. Transparent pricing and financial accessibility drive our commitment to make neatskills.tech, neatlabs, and neatworld available to every student, fostering inclusivity and personalized support. ",
		},
		{
			title: "Quality",
			desc: "At Provoke Developers, we prioritize excellence in every aspect of our platforms. Dedicated teams verify content, ensuring world-class quality for our learners. From industry-grade mentors to hands-on experiences, we empower users with the best resources to thrive.",
		},
		{
			title: "Practicality",
			desc: "We emphasize hands-on learning and real-world application, preparing learners for dynamic challenges. Through neatlabs and neatworld, practical implementation rewards curiosity and innovation, bridging the gap between theory and practice.",
		},
		{
			title: "Innovation",
			desc: "Innovation fuels our journey, driving us to explore new domains and develop groundbreaking projects. Our platforms incorporate cutting-edge technology and interactive features to keep learners engaged and updated.",
		},
	];

	const OurLoveData = [
		{
			title: "Inclusivity",
			desc: "Inclusivity is our core value. We create a welcoming space for learners from diverse backgrounds, offering affordable pricing, language support, and personalized paths. Our mentorship programs cater to unique challenges and aspirations.",
		},
		{
			title: "Access of Everything",
			desc: "We ensure unparalleled quality across all educational platforms. neatskills.tech, neatlabs, and neatworld undergo rigorous verification to empower learners with top-notch resources and tools.",
		},
		{
			title: "24/7 Help and Support",
			desc: "At neatskills.tech, we are dedicated to empowering learners with personalized guidance, a vibrant community, and 24/7 assistance. We create a resilient learning environment, fostering growth, innovation, and inclusivity. Welcome to the Neatskills.tech family, where learning becomes an inspiring adventure.",
		},
	];

	const breakPoints = [
		{ width: 1, itemsToShow: 1 },
		{ width: 550, itemsToShow: 2 },
		{ width: 768, itemsToShow: 3 },
		{ width: 1200, itemsToShow: 4 },
	];
	const clearFormFields = () => {
		setEmail("");
		setName("");
		setPhoneNo("");
		setTitle("");
		setSubject("");
	};
	const extractNameFromEmail = (email) => {
		const atIndex = email.indexOf("@");

		if (atIndex !== -1) {
			const name = email.substring(0, atIndex);
			return name;
		} else {
			return email;
		}
	};
	const isMediumScreen = useMediaQuery({ minWidth: 768 });
	const isMobileScreen = useMediaQuery({ maxWidth: 767 });
	const [showSideBar, setShowSideBar] = useState(false);
	const [SideBarState, sendSideBarState] = useState(false);
	useEffect(() => {
		if (isMediumScreen) {
			sendSideBarState(false);
		}
	}, [isMediumScreen]);

	function toggleSideBar() {
		setShowSideBar(!showSideBar);
		sendSideBarState(showSideBar);
	}
	return (
		<div className="flex flex-col items-center">
			<Dashboardnav heading="About Us" toggleSideBar={toggleSideBar} />
			{isMobileScreen && (
				<div
					className={`fixed right-0 ${
						SideBarState ? "block" : "hidden"
					} w-[281px] h-screen bg-[#25262C]  rounded-l-[40px] z-10`}
				>
					<CourseoverviewSidebar toggleSideBar={toggleSideBar} />
				</div>
			)}
			<div className="flex flex-col items-center px-4 mt-8 md:mt-0 ">
				<Title />
				<Description className={"w-full px-2 sm:px-4 md:px-20 "} />
			</div>

			{/* Our misson */}
			<div className="space-y-12 max-w-[1440px] mx-4 sm:mx-8 md:mx-16">
				<OurMissionSection data={OurMissionData} />
				<OurLoveSection data={OurLoveData} />
			</div>

			{/* Our Team */}
			<div className="max-w-[1440px] w-full px-4 sm:px-8 md:px-16 my-16">
				<TeamSection />
				<GetInTouch />
			</div>
			<Footer />
		</div>
	);
};

export default Aboutus;
