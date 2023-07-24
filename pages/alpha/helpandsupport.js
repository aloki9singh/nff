import Navbar from "@/components/common/navbar/navbar";
import NavbarSecond from "@/components/common/navbar/navbar2";
import HelpAndSupportSidebar from "@/components/common/sidebar/helpandsupport";

const helpandsupport = () => {
	return (
		<div className="flex">
			<HelpAndSupportSidebar />
			<div className="min-h-screen  w-full flex flex-col ">
        <NavbarSecond />
        <div className="h-full w-full bg-[#2D2E35] rounded-bl-[40px]">
          <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
        </div>

      </div>
		</div>
	);
};

export default helpandsupport;
