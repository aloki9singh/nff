import NavbarSecond from "@/components/common/navbar/navbar2";
import Sidebar from "@/components/common/sidebar/sidebar";
import Image from "next/image";

const contact = () => {
  return (
    <>
      <div className="flex h-screen">
        <Sidebar />
        <div className="w-full h-full flex flex-col">
          <NavbarSecond buttonVis="hidden" title="Contact Us" />
         
        </div>
      </div>
    </>
  );
};

export default contact;
