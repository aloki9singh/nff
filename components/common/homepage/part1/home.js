import React from "react";
import Image from "next/image";

import styles from "@/styles/componentsstyling/homepage/home.module.css";

import mainDesign1 from "@/public/componentsgraphics/common/homepage/home/Group174.svg";

export default function HomePage() {
	const transition = {
		hidden: { opacity: 0 },
		show: {
			opacity: 1,
		},
		transition: {
			delayChildren: 0.5,
		},
	};

	return (
		<>
			<div className="pt-[49px] md:py-[105px] min-h-screen flex flex-col justify-center items-center bg-bs">
				<div className="w-full h-full grid grid-rows-2 max-w-[1440px] lg:grid-rows-none lg:grid-cols-2 ">
					<div className=" justify-center flex items-center row-span-1 lg:row-auto lg:col-span-1">
						<div className="mx-7 lg:ml-[92px] pt-3 mt-[24px] md:mt-0">
							<h1
								className={` text-white font-ral lg:text-left lg:text-[86px] md:text-[76px] sm:text-[50px] text-[32px] text-center font-semibold tracking-thight2
                        mx-5 md:mx-0`}
							>
								Lets{" "}
								<span className={`${styles.learnunderline} relative `}>
									Learn{" "}
									<Image
										src="/vector-12.svg"
										width={50}
										height={24}
										className="sm:w-20 md:w-24 lg:w-32 absolute top-0 sm:top-4 left-[55%] md:left-auto md:right-6 lg:-right-12 md:translate-x-full -translate-y-full"
									/>{" "}
								</span>{" "}
								beyond the limits
							</h1>
							<div className="text-white text-center lg:mx-0 md:text-xl mt-7 lg:text-left px-2">
								<p>
									Educational Programs that will help you start , grow and
									upskill. Book a demo class today !!
								</p>
							</div>

							{/* BUttons */}
							<div className="w-full flex  justify-center lg:justify-start">
								<div className=" flex flex-wrap justify-between text-white max-w-xs md:max-w-lg w-full">
									<button className=" text-xs md:text-xl lg:text-2xl border md:border-2 h-[42px] md:h-[70px] mt-8 px-6 hover:bg-[#e1348b] flex items-center">
										Start Learning
									</button>
									<button className=" text-xs md:text-xl border md:border-2 h-[42px] md:h-[70px] mt-8 px-[9px] md:px-4 bg-[#e1348b] flex items-center ">
										Watch Demo Session
									</button>
								</div>
							</div>
						</div>
					</div>
					<div className="lg:col-span-1  lg:row-auto row-span-1 justify-center hidden lg:flex items-center lg:mr-[92px]">
						<Image
							alt="img"
							className="lg:mr-[6%]"
							src={mainDesign1}
							width={700}
							height={1000}
						></Image>
					</div>
					<div className="lg:col-span-1  lg:row-auto row-span-1 justify-center flex lg:hidden items-center">
						<Image
							alt="img"
							className="lg:mr-[6%]"
							src={mainDesign1}
							width={240}
							height={225}
						></Image>
					</div>
				</div>
			</div>
		</>
	);
}
