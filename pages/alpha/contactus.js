/////main body CSS and nav bar needed to be fixed with responsiveness  //currently mainbody css is fixed  without figma 
// needed to connect form with backend  to receive mail  // connected to backend
// ------------------>navbar need to be fixed

import NavbarSecond from "@/components/common/navbar/navbar2";
import Sidebar from "@/components/common/sidebar/sidebar";
import Image from "next/image";
import { useState } from "react";
import { contactFn } from "@/lib/api";

const contact = () => {
  const [query, setQuery] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const formData = { query, email, name, phoneNo };
  return (
    <>
      <div className="flex h-screen">
        <div className="lg:col-span-1 hidden lg:grid">
          <Sidebar />
        </div>
        <div className="w-full h-full flex flex-col">
          <NavbarSecond buttonVis="hidden" title="Contact Us" />
          <div className="md:rounded-bl-[40px] bg-[#2D2E35] text-white grow flex items-center justify-center">
            <div className="w-[90%] md:flex md:bg-[#373A41] md:my-5 rounded-[30px] h-fit">
              {/* LEFT */}
              <div className="flex-1 md:bg-[#141518] rounded-l-[30px] ">
                <h1 className="mb-[#728095] text-2xl border-b border-[#728095] md:px-8 py-5">
                  Contact Us
                </h1>
                <div className="flex flex-col gap-6">
                  <div className="flex items-start md:px-8 mt-6">
                    <Image
                      src="/pagesgraphics/common/contactus/mail.svg"
                      alt="mail"
                      width={20}
                      height={20}
                      className="mt-2 mr-2"
                    />
                    <div className="">
                      <h1>Mail Us</h1>
                      <p className="text-[#AFB0B3] text-sm">
                        support@neatskills.tech
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start md:px-8">
                    <Image
                      src="/pagesgraphics/common/contactus/call.svg"
                      alt="phone"
                      width={20}
                      height={20}
                      className="mt-2 mr-2"
                    />
                    <div>
                      <h1>Call Us</h1>
                      <p className="text-[#AFB0B3] text-sm">
                        (Not available right now)
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              {/* RIGHT */}
              <div className="flex-[2_2_0%] md:px-20">
                <h1 className="md:text-3xl  my-5">Submit a request</h1>
                <div className="text-white">
                  <form onSubmit={(e) => contactFn(e, formData)}>
                    <div className="mb-6">
                      <label className="block text-sm font-medium text-white">
                        Your name
                        <span className="text-[#5F6065]">(required)</span>
                      </label>
                      <input
                        type="text"
                        onChange={(e) => setName(e.target.value)}
                        className=" text-sm rounded-lg block w-full p-2.5 bg-[#373A41] border border-[#5F6065] placeholder-[#5F6065] focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Type here"
                        required
                      />
                    </div>
                    <div className="mb-6">
                      <label className="block text-sm font-medium text-white">
                        Your email address
                        <span className="text-[#5F6065]">(required)</span>
                      </label>
                      <input
                        type="email"
                        onChange={(e) => setEmail(e.target.value)}
                        className=" text-sm rounded-lg block w-full p-2.5 bg-[#373A41] border border-[#5F6065] placeholder-[#5F6065] focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Type here"
                        required
                      />
                    </div>
                    <div className="mb-6">
                      <label className="block text-sm font-medium text-white">
                        Mobile number
                        <span className="text-[#5F6065]">(required)</span>
                      </label>
                      <input
                        type="tel"
                        onChange={(e) => setPhoneNo(e.target.value)}
                        className=" text-sm rounded-lg block w-full p-2.5 bg-[#373A41] border border-[#5F6065] placeholder-[#5F6065] focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Type here"
                        required
                      />
                    </div>
                    <div>
                      <label
                        for="message"
                        className="block text-sm font-medium text-white"
                      >
                        Why you&rsquo;re contacting us
                        <span className="text-[#5F6065]">(required)</span>
                      </label>
                      <textarea
                        id="message"
                        rows="4"
                        onChange={(e) => setQuery(e.target.value)}
                        className=" text-sm rounded-lg block w-full p-2.5 bg-[#373A41] border border-[#5F6065] placeholder-[#5F6065] focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Add query"
                      ></textarea>
                    </div>

                    <div className="flex justify-end">
                      <button
                        type="submit"
                        className="text-white bg-[#AA2769] focus:ring-4 focus:outline-none font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center hover:bg-[#93225a] focus:ring-blue-800 my-8"
                      >
                        Submit
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default contact;