import Navbar from "@/components/common/navbar/navbar";
import NavbarSecond from "@/components/common/navbar/navbar2";
import HelpAndSupportSidebar from "@/components/common/sidebar/helpandsupport";
import { useState } from "react";

const Helpandsupport = () => {
	const [isSidebar, setIsSidebar] = useState(true);
	const toggleSideBar = () => {
		setIsSidebar(!isSidebar);
	};
	console.log(isSidebar);

	return (
		<div className="flex text-white">
			<HelpAndSupportSidebar
				toggleSideBar={toggleSideBar}
				isSidebarOpen={isSidebar}
			/>
			<div className="min-h-screen  w-full flex flex-col ">
				<NavbarSecond toggleSidebar={toggleSideBar} />
				<div className="h-full w-full bg-[#2D2E35] rounded-bl-[40px]flex flex-col items-center px-10 py-10">
					<div className="bg-[#373A41] h-full w-full rounded-[30px] py-10 text-center">
						{/* Top Text */}
						<div>
							<h1 className="font-Inter text-center text-[40px]">
								Help & Support
							</h1>
							<p className="my-4 font-Inter">
								If you are visiting from Neatskills.com you are in the right
								place!
							</p>
						</div>

						{/* Big Links buttons */}
						<div className="grid "></div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Helpandsupport;
