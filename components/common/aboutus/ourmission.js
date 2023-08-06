import React, { useEffect, useRef, useState } from "react";

const OurMissionSection = ({ data }) => {
	return (
		<div className="">
			<p>
				<span className="text-4xl  font-extrabold text-white">Our</span>
				<span className="text-4xl  font-extrabold ml-2 bg-gradient-to-r from-[#A134CD] to-[#E1348B] text-transparent bg-clip-text">
					Mission
				</span>
			</p>
			<div className=" md:w-[40rem] h-1 bg-white mt-2" />
			<div className="mt-2">
				{data.map(({ title, desc, index }) => {
					return (
						<div key={index} className="flex flex-col md:flex-row py-4">
							<p className="text-white mb-3 md:mb-0 md:w-[240px] lg:w-[370px] text-sm md:text-base font-semibold md:font-normal shrink-0">
								{title}
							</p>
							<p className="text-sm md:text-base text-white">{desc}</p>
						</div>
					);
				})}
			</div>
		</div>
	);
};

export default OurMissionSection;
