import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Dashboardnav from "@/components/common/navbar/dashboardnav";
import CourseoverviewSidebar from "@/components/common/sidebar/courseoverview";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/config/firebaseconfig";
import { useMediaQuery } from "react-responsive";
import { callUserById } from "@/lib/exportablefunctions";
import { useAuthContext } from "@/lib/context/AuthContext";
import withStudentAuthorization from "@/lib/HOC/withStudentAuthorization";
import SupportCard from "@/components/common/card/supportcard";

const Studentdashboard = () => {
	const { user, userProfile } = useAuthContext();
	const [_, setVerified] = useState(false);
	const isMediumScreen = useMediaQuery({ minWidth: 768 });
	const isMobileScreen = useMediaQuery({ maxWidth: 767 });
	const [showSideBar, setShowSideBar] = useState(false);
	const [SideBarState, sendSideBarState] = useState(false);
	const router = useRouter();
	useEffect(() => {
		if (isMediumScreen) {
			sendSideBarState(false);
		}
		const unsubscribe = onAuthStateChanged(auth, async (user) => {
			if (user) {
				user.emailVerified = true;
				const value = await callUserById(user.uid);
				setVerified(value.user.verified);
			}
		});

		return () => unsubscribe(); // Cleanup the listener
	}, [isMediumScreen]);

	if (!user || !userProfile) {
		router.push("/");
	}

	if (!user || !userProfile) {
		return null;
	}
	function toggleSideBar() {
		setShowSideBar(!showSideBar);
		sendSideBarState(showSideBar);
	}

	return (
		<>
			<div className="md:h-screen h-full text-base md:w-full ">
				<div className="flex">
					{isMobileScreen && (
						<div
							className={`fixed right-0 ${
								SideBarState ? "block" : "hidden"
							} w-[281px] h-screen bg-[#25262C]  rounded-l-[40px] z-10`}
						>
							<CourseoverviewSidebar toggleSideBar={toggleSideBar} />
						</div>
					)}

					{!isMobileScreen && (
						<div className={`md:block  hidden w-[221px] bg-[#141518] z-10`}>
							<CourseoverviewSidebar toggleSideBar={toggleSideBar} />
						</div>
					)}
					<div className="flex-grow bg-[#2E3036]  md:rounded-l-[50px]">
						<div className="flex justify-between  top-0 md:border-b-[1px] border-b-[2px] border-[#717378]  md:rounded-l-[50px] ">
							<Dashboardnav
								heading="My Progress"
								toggleSideBar={toggleSideBar}
							/>
						</div>
						<div className="h-full w-full bg-[#2D2E35] rounded-bl-[40px]flex flex-col items-center px-4 md:px-10 py-10 text-white">
							<div className="flex flex-col items-center bg-[#373A41] h-full w-full rounded-[30px] py-10 text-center px-4 md:px-10 ">
								{/* Top Text */}
								<div>
									<h1 className="font-Inter text-center text-3xl md:text-[40px]">
										Help & Support
									</h1>
									<p className="my-4 font-Inter text-xs md:text-base">
										If you are visiting from Neatskills.com you are in the right
										place!
									</p>
								</div>

								{/* Big Links buttons */}
								<div className="w-full grid-flow-row grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8 justify-evenly my-9 max-w-5xl ">
									<div className="w-full flex flex-col items-center">
										<SupportCard
											className={"max-w-[300px]"}
											img={
												"/componentsgraphics/common/helpandsupportpage/HandPointing.svg"
											}
											text={"Getting Started Guide"}
											href={"#GettingStarted"}
										/>
									</div>

									<div className="w-full flex flex-col items-center">
										<SupportCard
											className={" max-w-[300px]"}
											img={
												"/componentsgraphics/common/helpandsupportpage/Student.svg"
											}
											text={"Enroll in Course"}
											href={"#Enroll"}
										/>
									</div>
									<div className="w-full flex flex-col items-center">
										<SupportCard
											className={" max-w-[300px]"}
											img={
												"/componentsgraphics/common/helpandsupportpage/EnvelopeSimple.svg"
											}
											text={"Email Support"}
											href={"#EmailSupport"}
										/>
									</div>
									<div className="w-full flex flex-col items-center">
										<SupportCard
											className={" max-w-[300px]"}
											img={
												"/componentsgraphics/common/helpandsupportpage/Megaphone.svg"
											}
											text={"Updates and Announcements"}
											href={"#Updates"}
										/>
									</div>
									<div className="w-full flex flex-col items-center">
										<SupportCard
											className={" max-w-[300px]"}
											icon={
												<p className="font-Inter text-2xl sm:text-4xl md:text-[32px] leading-none">
													(FAQ)
												</p>
											}
											text={"Frequently Asked Questions"}
											href={"#FAQ"}
										/>
									</div>
									<div className="w-full flex flex-col items-center">
										<SupportCard
											className={" max-w-[300px]"}
											img={
												"/componentsgraphics/common/helpandsupportpage/Student.svg"
											}
											text={"Feedback and Suggestion"}
											href={"#Feedback"}
										/>
									</div>
								</div>

								{/* Text information */}
								<div className="max-w-5xl ">
									<div
										id="GettingStarted"
										className="flex flex-col md:flex-row py-10 border-b border-[#5F6065] space-y-5 md:space-y-0 px-5 md:px-0"
									>
										<h5
											className="w-full md:w-6/12 lg:w-5/12 text-start md:pr-12
									text-2xl
								 lg:text-3xl font-semibold"
										>
											Getting Started Guide
										</h5>
										<p className="w-full md:w-6/12 lg:w-7/12 text-start text-base lg:text-xl font-Inter leading-[150%] tracking-wider">
											If you're new to the platform, start by reading our
											comprehensive guide that will walk you through the
											registration process, setting up your profile, and
											exploring the available courses and resources.
										</p>
									</div>

									<div
										id="Enroll"
										className="flex flex-col md:flex-row py-10 border-b border-[#5F6065] space-y-5 md:space-y-0 px-5 md:px-0"
									>
										<h5
											className="w-full md:w-6/12 lg:w-5/12 text-start md:pr-12
									text-2xl
								 lg:text-3xl font-semibold"
										>
											Enroll In Course
										</h5>
										<ul className="w-full md:w-6/12 lg:w-7/12 text-start text-base lg:text-xl list-decimal space-y-1">
											<li className="font-Inter leading-[150%] tracking-wider">
												Browse the Course Catalog: Explore the course catalog to
												discover the available courses. You can search by
												category, subject, or use keywords to find specific
												courses of interest.
											</li>
											<li className="font-Inter leading-[150%] ">
												Course Selection: Read the course descriptions and click
												on a course to access more details. Take note of the
												course duration, format, and prerequisites, if any. Make
												sure the course aligns with your learning goals and fits
												your schedule.
											</li>

											<li className="font-Inter leading-[150%] ">
												Create an Account: If you haven't already, create an
												account on our learning platform. Provide the necessary
												information to register, including your name, email
												address, and password. You may also have the option to
												sign up using your social media accounts.
											</li>

											<li className="font-Inter leading-[150%] ">
												Login to Your Account: After creating an account, log in
												using your credentials. This will grant you access to
												the platform's features and allow you to enroll in
												courses.
											</li>

											<li className="font-Inter leading-[150%] ">
												Enroll in the Course: Once you've chosen a course, click
												on the "Enroll" or "Buy Now" button. If the course is
												free, you may be enrolled immediately. For paid courses,
												you'll be prompted to select a payment method and
												complete the transaction.
											</li>

											<li className="font-Inter leading-[150%] ">
												Payment and Discounts: If applicable, enter any discount
												codes during the payment process to avail yourself of
												special offers or promotions. The system will calculate
												the discounted price before finalizing the payment.
											</li>

											<li className="font-Inter leading-[150%] ">
												Confirmation and Access: After successful enrollment,
												you'll receive a confirmation message or email. The
												course will now appear in your enrolled courses or
												dashboard. Click on the course title to access its
												materials and start your learning journey.
											</li>
										</ul>
									</div>

									<div
										id="EmailSupport"
										className="flex flex-col md:flex-row py-10 border-b border-[#5F6065] space-y-5 md:space-y-0 px-5 md:px-0"
									>
										<h5
											className="w-full md:w-6/12 lg:w-5/12 text-start md:pr-12
									text-2xl
								 lg:text-3xl font-semibold"
										>
											Email Support
										</h5>
										<p className="w-full md:w-6/12 lg:w-7/12 text-start text-base lg:text-xl font-Inter leading-[150%] tracking-wider">
											If you prefer to communicate via email, you can reach out
											to our support team at support@learningplatform.com. We
											aim to respond to all queries within 24 hours.
										</p>
									</div>

									<div
										id="Updates"
										className="flex flex-col md:flex-row py-10 border-b border-[#5F6065] space-y-5 md:space-y-0 px-5 md:px-0"
									>
										<h5
											className="w-full md:w-6/12 lg:w-5/12 text-start md:pr-12
									text-2xl
								 lg:text-3xl font-semibold"
										>
											Updates and Announcement
										</h5>
										<p className="w-full md:w-6/12 lg:w-7/12 text-start text-base lg:text-xl font-Inter leading-[150%] tracking-wider">
											Keep an eye on our platform's news section for the latest
											updates, new features, and announcements. This section is
											a great place to stay informed about any changes that may
											affect your learning experience.
										</p>
									</div>

									<div
										id="FAQ"
										className="flex flex-col md:flex-row py-10 border-b border-[#5F6065] space-y-5 md:space-y-0 px-5 md:px-0"
									>
										<h5
											className="w-full md:w-6/12 lg:w-5/12 text-start md:pr-12
									text-2xl
								 lg:text-3xl font-semibold"
										>
											Frequently Asked Questions
										</h5>
										<p className="w-full md:w-6/12 lg:w-7/12 text-start text-base lg:text-xl font-Inter leading-[150%] tracking-wider">
											Check out our FAQ section, where we have compiled answers
											to common queries from learners like you. You may find
											solutions to your questions here without the need to reach
											out to support.
										</p>
									</div>

									<div
										id="Feedback"
										className="flex flex-col md:flex-row py-10 border-b border-[#5F6065] space-y-5 md:space-y-0 px-5 md:px-0"
									>
										<h5
											className="w-full md:w-6/12 lg:w-5/12 text-start md:pr-12
									text-2xl
								 lg:text-3xl font-semibold"
										>
											Feedback and Suggestion
										</h5>
										<p className="w-full md:w-6/12 lg:w-7/12 text-start text-base lg:text-xl font-Inter leading-[150%] tracking-wider">
											We value your input! Share your feedback and support by
											emailing us at{" "}
											<a href="mailto:feedback@provedev.tech">
												{" "}
												feedback@provedev.tech
											</a>{" "}
											. Your thoughts help us improve our services. Thank you
											for being a part of our journey!
										</p>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default withStudentAuthorization(Studentdashboard);
