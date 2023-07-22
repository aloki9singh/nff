import { Fragment, useEffect, useState } from "react";
import Link from "next/link";
import { AiOutlineClose } from "react-icons/ai";
import { ImMenu } from "react-icons/im";
import Image from "next/dist/client/image";
import { useAuthContext } from "@/lib/context/AuthContext";

export default function Navbar({ nav, setNav }) {
	const { user, userProfile } = useAuthContext();
	const handleNav = () => {
		setNav(!nav);
	};
	//   change navbar color when scrolling
	const [color, setColor] = useState(false);

	const changeColor = () => {
		if (window.scrollY >= 90) {
			setColor(true);
		} else {
			setColor(false);
		}
	};

	useEffect(() => {
		window.addEventListener("scroll", changeColor);
		console.log({ user, userProfile });
	}, []);

	return (
		<>
			<div
				className={` w-full px-4 md:px-8 lg:px-16 py-4 ${
					color ? "bg-[#131313] shadow-xl" : "bg-transparent"
				} fixed z-[100] transition-all duration-300 h-[49px] md:h-[105px] flex justify-center items-center`}
			>
				<div className="w-full max-w-[1440px] flex justify-between items-center font-ral ">
					<Link
						href="/"
						className="uppercase hover:border-b w-[112px] h-[43px] md:w-[186px] md:h-[71px] flex-shrink-0"
					>
						<Image
							src="/componentsgraphics/common/navbar/navbar/neatskillslogosample.svg"
							alt="logo"
							className="w-full h-full object-contain
                           "
							width={100}
							height={100}
						/>
					</Link>
					<div className="hidden md:flex justify-center  w-full items-center text-white text-xs  lg:text-base mx-10 lg:mx-12">
						<ul className="max-w-[407px] w-full flex justify-between">
							<Link href="/beta/courseoverview">
								<li className="text-md uppercase hover:border-b ">Courses</li>
							</Link>
							<Link href="/alpha/aboutus">
								<li className="text-md uppercase hover:border-b ">About Us</li>
							</Link>
							<Link href="/alpha/contactus">
								<li className="text-md uppercase hover:border-b ">Contact</li>
							</Link>
						</ul>
					</div>
					{!user ? (
						<div className="hidden md:flex items-center ">
							<Link href={"/beta/signup"}>
								<button
									type="button"
									className="bg-pink text-white font-Inter uppercase font-semibold   rounded-10 border-2 border-white 
                text-xs w-[77px] h-7
                md:text-sm md:w-24 md:h-11
                lg:text-xl lg:w-32 lg:h-14 "
								>
									Sign up
								</button>
							</Link>
							<Link href={"/beta/login"}>
								<button
									type="button"
									className="bg-transparent text-white font-Inter uppercase font-semibold   rounded-10 border-2 border-white 
                        text-xs w-[77px] h-7 ml-10
                        md:text-sm md:w-24 md:h-11 md:ml-6
                        lg:text-xl lg:w-32 lg:h-14 lg:ml-[52px]
                        "
								>
									LOGIN
								</button>
							</Link>
						</div>
					) : (
						<div className="hidden md:flex items-center space-x-10 shrink-0 ml-5">
							<p className="text-pink  font-semibold text-xs md:text-sm lg:text-xl">
								{userProfile.name.first + " " + userProfile.name.last}
							</p>
							<Image
								src={userProfile.photoURL}
								width={100}
								height={100}
								className="h-7 md:h-11 lg:h-14 w-7 md:w-11 lg:w-14 aspect object-cover rounded-full"
							/>
						</div>
					)}
					<div className="flex items-center gap-4 md:hidden">
						{!user ? (
							<Link href={"/beta/signup"}>
								<button
									type="button"
									className="bg-pink text-white text-[10px]  w-[72px] h-[27px] rounded-10 border border-white
                        "
								>
									Get Started
								</button>
							</Link>
						) : (
							<div className="flex items-center space-x-5 shrink-0 ml-5">
							<p className="text-pink  font-semibold text-xs md:text-sm lg:text-xl">
								{userProfile.name.first + " " + userProfile.name.last}
							</p>
							<Image
								src={userProfile.photoURL}
								width={100}
								height={100}
								className="h-7 md:h-11 lg:h-14 w-7 md:w-11 lg:w-14 aspect object-cover rounded-full"
							/>
						</div>
						)}
						<div
							onClick={handleNav}
							className=" cursor-pointer flex items-center"
						>
							<ImMenu size={25} className="text-white/80" />
						</div>
					</div>
				</div>
				<div />
			</div>
			<div
				className={
					nav
						? " fixed left-0 top-0 w-full h-screen bg-black/70 z-50  ease-in duration-700 "
						: " fixed    "
				}
			>
				{/* // Side Drawer Menu */}
				<div
					className={
						nav
							? "fixed left-0 top-0  w-[60%] sm:w-[60%] md:w-[50%] h-full  bg-bs backdrop-blur-md p-4 ease-in duration-500"
							: "fixed left-[-100%] top-0 w-[75%] sm:w-[60%] md:w-[45%] h-screen  p-5 ease-in duration-1000"
					}
				>
					<div>
						<div className=" cursor-pointer flex w-full items-center justify-between top-0 mt-0 pt-5 overflow-clip">
							<div className="w-full">
								<div
									onClick={() => setNav(false)}
									className="rounded-full shadow-lg  p-3 cursor-pointer float-right"
								>
									<AiOutlineClose className="text-yellow-50" />
								</div>
							</div>
						</div>

						<div className="text-white ">
							<ul className="uppercase text-center ">
								<Link href="/">
									<div
										onClick={() => setNav(false)}
										className="py-4 text-sm hover:scale-110 "
									>
										Why Neatskills ?
									</div>
								</Link>
								<Link href="/beta/courseoverview">
									<div
										onClick={() => setNav(false)}
										className="py-4 text-sm hover:scale-110"
									>
										Our Courses
									</div>
								</Link>
								<Link href="/alpha/aboutus">
									<div
										onClick={() => setNav(false)}
										className="py-4 text-sm hover:scale-110"
									>
										AboutUs
									</div>
								</Link>
								<Link href="/beta/login">
									<div
										onClick={() => setNav(false)}
										className="py-4 text-sm hover:scale-110"
									>
										Login
									</div>
								</Link>
								<Link href="/beta/signup">
									<div
										onClick={() => setNav(false)}
										className="py-4 text-sm hover:scale-110"
									>
										Signup
									</div>
								</Link>
								<Link href="/alpha/contactus">
									<div
										onClick={() => setNav(false)}
										className="py-4 text-sm hover:scale-110"
									>
										watch a Demo Session
									</div>
								</Link>
							</ul>

							<div className="">
								<Link href={"/beta/signup"}>
									<button className="uppercase tracking-widest text-white text-xs px2 py-4 w-full bg-pin border-2 rounded-xl ">
										Get Started
									</button>
								</Link>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
