import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { RxCross2 } from "react-icons/rx";
import { useAuthContext } from "@/lib/context/AuthContext";
import { useRouter } from "next/router";
import { BsPersonCircle } from "react-icons/bs";
import { AiOutlineSetting } from "react-icons/ai";

const HelpAndSupportSidebar = ({ toggleSideBar, isSidebarOpen }) => {
	const router = useRouter();
	const [width, setWidth] = useState(window.screen.width);
	// console.log(width);
	const { user, userProfile } = useAuthContext();
	const [isChecked, setIsChecked] = useState(false);

	const handleCheckboxChange = () => {
		setIsChecked((prevState) => !prevState);
	};
	useEffect(() => {

		// TODO Add a debounce function to increase effeciency
		const checkWidth = () => {
			// console.log("uea");
			setWidth(window.screen.width);
		};

		window.addEventListener('resize', checkWidth);

		return () => {
			window.removeEventListener("resize", checkWidth);
		};
	}, []);
	return (
		<aside
			className={`${
				!isSidebarOpen && window.screen.width < 768 && "-translate-x-full"
			} w-[214px] p-5 absolute md:sticky top-0 left-0 min-h-screen h-screen md:bg-[#141518] bg-[#25262C]  rounded-l-[40px] md:rounded-l-[0px]  flex flex-col justify-between overflow-scroll duration-200 `}
		>
			<div>
				<div>
					<Image
						src="/componentsgraphics/common/navbar/navbar/neatskillslogosample.svg"
						width={150}
						height={150}
						alt="logo"
						className="mb-6 md:block hidden"
					/>

					<div
						className=" flex justify-end w-full md:hidden  "
						onClick={() => toggleSideBar()}
					>
						<div className="bg-gray-500 rounded-full p-[5px]">
							<RxCross2 className="text-white  text-sm" />
						</div>
					</div>
					<div className="md:hidden block p-2 text-white">
						<Link href={"/meta/profile"}>
							{user && userProfile && userProfile.photoURL ? (
								<Image
									src={userProfile.photoURL}
									alt="proImg"
									height={60}
									width={60}
									className="inline-block relative object-cover object-center md:hidden !rounded-full border border-[#E1348B] aspect-square"
								/>
							) : (
								<BsPersonCircle className="text-white text-4xl"></BsPersonCircle>
							)}
						</Link>
						<p className="pt-2">{user ? user.displayName : "Guest"}</p>
						<p className="text-gray-500 text-[12px] ">
							{`MENTOR- ${
								userProfile
									? (userProfile.displayName || user.displayName).includes(
											"gmail"
									  )
										? removeDomainFromEmail(
												userProfile.displayName || user.displayName
										  )
										: userProfile.displayName || user.displayName
									: "None"
							}`}
						</p>
					</div>
				</div>

				<div className="flex h-full ">
					<ul className="flex flex-col md:gap-1 w-full">
						<li className="">
							<Link
								href="/meta/dashboard"
								className="flex items-center p-2 text-base font-light text-white rounded-lg  hover:bg-pin"
							>
								<label className="inline-flex cursor-pointer items-center space-x-3 ">
									<input
										id="default-checkbox"
										type="checkbox"
										className={`rounded form-checkbox h-3 w-3 text-gray-600 ${
											router.pathname === "/meta/dashboard"
												? "shadow-white"
												: ""
										}`}
										style={{
											boxShadow:
												router.pathname === "/meta/dashboard"
													? "0 0 5px #A145CD"
													: "none",
										}}
									/>
									<span
										className={`${
											router.pathname == "/meta/dashboard"
												? "text-[#E1348B]"
												: ""
										}`}
									>
										Home
									</span>
								</label>
							</Link>
						</li>
						<li>
							<Link
								href="/meta/courses"
								className="flex items-center p-2 text-base font-light text-white rounded-lg  hover:bg-pin "
							>
								<label className="inline-flex cursor-pointer items-center space-x-3">
									<input
										id="default-checkbox"
										type="checkbox"
										className={`rounded form-checkbox h-3 w-3 text-gray-600 ${
											router.pathname === "/meta/courses" ? "shadow-white" : ""
										}`}
										style={{
											boxShadow:
												router.pathname === "/meta/courses"
													? "0 0 5px #A145CD"
													: "none",
										}}
									/>{" "}
									<span
										className={`${
											router.pathname == "/meta/courses" ? "text-[#E1348B]" : ""
										}`}
									>
										Course
									</span>
								</label>
							</Link>
						</li>
						<li>
							<Link
								href="student"
								className="flex items-center p-2 text-base font-light text-white rounded-lg  hover:bg-pin "
							>
								<label className="inline-flex cursor-pointer items-center space-x-3">
									<input
										id="default-checkbox"
										type="checkbox"
										className={`rounded form-checkbox h-3 w-3 text-gray-600 ${
											router.pathname === "/meta/student" ? "shadow-white" : ""
										}`}
										style={{
											boxShadow:
												router.pathname === "/meta/student"
													? "0 0 5px #A145CD"
													: "none",
										}}
									/>

									<span
										className={`${
											router.pathname == "/meta/student" ? "text-[#E1348B]" : ""
										}`}
									>
										Students
									</span>
								</label>
							</Link>
						</li>
						<hr className="h-px  bg-gray-500 border-0 w-[90%] mx-auto my-1"></hr>
						<li>
							<Link
								href="schedule"
								className="flex items-center p-2 text-base font-light text-white rounded-lg  hover:bg-pin "
							>
								<label className="inline-flex cursor-pointer items-center space-x-3">
									<input
										id="default-checkbox"
										type="checkbox"
										className={`rounded form-checkbox h-3 w-3 text-gray-600 ${
											router.pathname === "/meta/schedule" ? "shadow-white" : ""
										}`}
										style={{
											boxShadow:
												router.pathname === "/meta/schedule"
													? "0 0 5px #A145CD"
													: "none",
										}}
									/>

									<span
										className={`ml-3 text-[${
											router.pathname == "/meta/schedule" ? "#E1348B" : ""
										}]`}
									>
										Schedule
									</span>
								</label>
							</Link>
						</li>
						<li>
							<div
								onClick={() => router.push("https://meet.neatskills.tech/")}
								className="flex items-center p-2 text-base font-light text-white rounded-lg hover:bg-pin"
							>
								<label className="inline-flex cursor-pointer items-center space-x-3">
									<input
										id="default-checkbox"
										type="checkbox"
										className={`rounded form-checkbox h-3 w-3 text-gray-600 ${
											isChecked ? "shadow-white text-white" : ""
										}`}
										style={{
											boxShadow: isChecked ? "0 0 5px #A145CD" : "none",
										}}
										checked={isChecked}
										onChange={handleCheckboxChange}
									/>

									<span
										className={`ml-3 ${
											isChecked === "https://meet.neatskills.tech"
												? "text-#E1348B"
												: ""
										}`}
									>
										Live Class
									</span>
								</label>
							</div>
						</li>

						<li>
							<Link
								href="studymaterial"
								className="flex items-center p-2 text-base font-light text-white rounded-lg  hover:bg-pin "
								replace
							>
								<label className="inline-flex cursor-pointer items-center space-x-3">
									<input
										id="default-checkbox"
										type="checkbox"
										className={`rounded form-checkbox h-3 w-3 text-gray-600 ${
											router.pathname === "/meta/studymaterial"
												? "shadow-white"
												: ""
										}`}
										style={{
											boxShadow:
												router.pathname === "/meta/studymaterial"
													? "0 0 5px #A145CD"
													: "none",
										}}
									/>

									<span
										className={`${
											router.pathname == "/meta/studymaterial"
												? "text-[#E1348B]"
												: ""
										}`}
									>
										Study Material
									</span>
								</label>
							</Link>
						</li>
						<li>
							<Link
								href="/meta/assignments"
								className="flex items-center p-2 text-base font-light text-white rounded-lg    hover:bg-pin "
								replace
							>
								<label className="inline-flex cursor-pointer items-center space-x-3">
									<input
										id="default-checkbox"
										type="checkbox"
										className={`rounded form-checkbox h-3 w-3 text-gray-600 ${
											router.pathname === "/meta/assignments" ? "shadow-white" : ""
										}`}
										style={{
											boxShadow:
												router.pathname === "/meta/assignments"
													? "0 0 5px #A145CD"
													: "none",
										}}
									/>

									<span
										className={`${
											router.pathname == "/meta/assignments"
												? "text-[#E1348B]"
												: ""
										}`}
									>
										Assignments
									</span>
								</label>
							</Link>
						</li>
						<hr className="h-px  bg-gray-500 border-0 w-[90%] mx-auto my-1 "></hr>
						<li>
							<Link
								href="/meta/chats"
								className="flex items-center p-2 text-base font-light text-white rounded-lg   hover:bg-pin "
							>
								<label className="inline-flex cursor-pointer items-center space-x-3">
									<input
										id="default-checkbox"
										type="checkbox"
										className={`rounded form-checkbox h-3 w-3 text-gray-600 ${
											router.pathname === "/meta/chats" ? "shadow-white" : ""
										}`}
										style={{
											boxShadow:
												router.pathname === "/meta/chats"
													? "0 0 5px #A145CD"
													: "none",
										}}
									/>

									<span
										className={`${
											router.pathname == "/meta/chats" ? "text-[#E1348B]" : ""
										}`}
									>
										Chats
									</span>
								</label>
							</Link>
						</li>
						<li>
							<Link
								href="/meta/profile"
								className="flex items-center cursor-pointer p-2 text-base font-normal text-white rounded-lg   hover:bg-pin "
							>
								<label className="inline-flex items-center space-x-3">
									<input
										id="default-checkbox"
										type="checkbox"
										className={`rounded form-checkbox h-3 w-3 text-gray-600 ${
											router.pathname === "/meta/profile" ? "shadow-white" : ""
										}`}
										style={{
											boxShadow:
												router.pathname === "/meta/profile"
													? "0 0 5px #A145CD"
													: "none",
										}}
									/>

									<span
										className={`${
											router.pathname == "/meta/profile" ? "text-[#E1348B]" : ""
										}`}
									>
										Profile
									</span>
								</label>
							</Link>
						</li>
						<li className="md:hidden block">
							<Link
								href="/meta/settings"
								className="flex items-center cursor-pointer p-2 text-base font-normal text-white rounded-lg   hover:bg-pin "
							>
								<label className="inline-flex items-center space-x-3">
									<input
										id="default-checkbox"
										type="checkbox"
										className={`rounded form-checkbox h-3 w-3 text-gray-600 ${
											router.pathname === "/meta/settings" ? "shadow-white" : ""
										}`}
										style={{
											boxShadow:
												router.pathname === "/meta/settings"
													? "0 0 5px #A145CD"
													: "none",
										}}
									/>

									<span
										className={`${
											router.pathname == "/meta/settings"
												? "text-[#E1348B]"
												: ""
										}`}
									>
										Settings
									</span>
								</label>
							</Link>
						</li>
						<li className="md:hidden block">
							<Link
								href="profile"
								className="flex items-center cursor-pointer p-2 text-base font-normal text-white rounded-lg   hover:bg-pin "
							>
								<label className="inline-flex items-center space-x-3">
									<input
										id="default-checkbox"
										type="checkbox"
										className={`rounded form-checkbox h-3 w-3 text-gray-600 ${
											router.pathname === "/meta/logout" ? "shadow-white" : ""
										}`}
										style={{
											boxShadow:
												router.pathname === "/meta/logout"
													? "0 0 5px #A145CD"
													: "none",
										}}
									/>

									<span
										className={`${
											router.pathname == "/meta/logout" ? "text-[#E1348B]" : ""
										} cursor-pointer`}
									>
										<p
											onClick={() => {
												signOut(auth);
												router.push("/");
											}}
										>
											Logout
										</p>
									</span>
								</label>
							</Link>
						</li>
					</ul>
				</div>
			</div>
			<div className="text-white space-y-5  md:block hidden mt-10">
				<button
					onClick={() => router.push("/meta/setting")}
					className=" bg-[#373A41]  flex  justify-center  items-center px-5  m-auto  rounded-[10px] pt-2.5 pb-2 text-xs font-medium uppercase leading-normal gap-x-2 "
				>
					<AiOutlineSetting />
					<span className={`${router.pathname == "/meta/dashboard" ? "" : ""}`}>
						Settings{" "}
					</span>
				</button>
			</div>
		</aside>
	);
};

export default HelpAndSupportSidebar;
