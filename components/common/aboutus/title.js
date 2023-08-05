import React from "react";

const Title = ({className}) => {
	return (
		<div
			className="text-center text-2xl md:text-4xl md:m-10 py-2 
  space-y-4 border-b-white border-b-4"
		>
			<p className=" text-white">We are here to</p>
			<p className=" bg-gradient-to-r from-[#A134CD] to-[#E1348B] bg-clip-text  text-transparent   ">
				guarantee your success
			</p>
		</div>
	);
};

export default Title;
