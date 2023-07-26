import React, { useState } from "react";
import Image from "next/image";
import { BsPatchCheckFill } from "react-icons/bs";

const PaymentProceed = () => {
  const [activeTab, setActiveTab] = useState("card");

  return (
    <>
      <div className="flex container w-[1068px] h-[590px] bg-[#373A41] rounded-[33px] mb-16">
        <div className="left">
          <h1>Payment Method</h1>

          <ul className="flex flex-wrap text-sm font-medium text-center text-gray-500 border-gray-200 dark:border-gray-700 dark:text-gray-400">
            <li className="mr-2" role="presentation">
              <button
                className={`flex border border-[#717378] py-[7.418px] px-[30px] items-center rounded-lg ${
                  activeTab == "card" ? "border-[#E1348B]" : null
                }`}
                onClick={() => setActiveTab("card")}
              >
                <BsPatchCheckFill
                  className={`${
                    activeTab == "card" ? "text-[#E1348B]" : "text-white"
                  }`}
                />
                <p className="mx-4">Debit/Credit</p>
                <Image
                  src="/pagesgraphics/student/payment/card.png"
                  width={57}
                  height={30}
                  alt="Picture of the author"
                />
              </button>
            </li>
            <li className="mr-2" role="presentation">
              <button
                className={`flex border border-[#717378]  items-center py-[1.418px] px-[45px] rounded-lg ${
                  activeTab == "upi" ? "border-[#E1348B]" : null
                }`}
                onClick={() => setActiveTab("upi")}
              >
                <BsPatchCheckFill
                  className={`${
                    activeTab == "upi" ? "text-[#E1348B]" : "text-white"
                  }`}
                />
                <p className="mx-4">UPI ID</p>
                <Image
                  src="/pagesgraphics/student/payment/upi.png"
                  width={57}
                  height={20}
                  alt="Picture of the author"
                />
              </button>
            </li>
          </ul>

          <div className={`upi ${activeTab == "card" ? "hidden" : null}`}>
            hello
          </div>

          <div className={`upi ${activeTab == "upi" ? "hidden" : null}`}>
            <div className="mb-4">
              <label
                className="block text-white text-sm font-bold mb-2"
                for="Card Holder Name"
              >
                Card Holder Name
              </label>
              <input
                className="shadow appearance-none border rounded w-[451px] py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="Card Holder Name"
                type="text"
              />
            </div>

            <div className="mb-4 relative">
              <label
                className="block text-white text-sm font-bold mb-2"
                for="Card Holder Name"
              >
                Card Holder Name
              </label>
              <input
                className="shadow appearance-none border rounded w-[451px] py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="Card Holder Name"
                type="text"
              />

              <Image
                className="absolute top-[50%] right-12"
                src="/pagesgraphics/student/payment/card.png"
                width={57}
                height={30}
                alt="Picture of the author"
              />
            </div>

            <div className="mb-4 flex">
              <label
                className="block text-white text-sm font-bold mb-2 block"
                for="Card Holder Name"
              >
                Card Holder Name
              </label>
              <input
                className="shadow appearance-none border rounded w-[201px] py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="Card Holder Name"
                type="text"
              />

              <label
                className="block text-white text-sm font-bold mb-2"
                for="Card Holder Name"
              >
                Card Holder Name
              </label>
              <input
                className="shadow appearance-none border rounded w-[201px] py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="Card Holder Name"
                type="text"
              />
            </div>
          </div>
        </div>

        <div className="right flex md:w-[331px] pt-[26px] pb-[18px] px-[26px] flex-col items-start gap-[5px] border border-white rounded-[11px] ml-2 md:ml-0 mr-2 md:mr-8 my-8">
          <h2>Order Summary</h2>
          <h1 className="text-xl mt-2 mb-4">
            Subscription Plan{" "}
            <span className="text-[#A145CD] font-bold">Quarterly</span>
          </h1>

          <h2 className="font-bold">Order details</h2>
          <div className="flex text-sm gap-[4rem] flex-row md:gap-[8rem]">
            <p>Subtotal</p>
            <p>Rs 1899</p>
          </div>
          <div className="flex text-sm gap-[4rem] flex-row md:gap-[8rem]">
            <h2>Subtotal</h2>
            <h2>Rs 1899</h2>
          </div>
          <div className="flex text-sm gap-[4rem] flex-row md:gap-[8rem]">
            <h2>Subtotal</h2>
            <h2>Rs 1899</h2>
          </div>

          <hr class="h-px my-8 bg-gray-200 w-full dark:bg-gray-700"></hr>

          <div className="flex text-sm flex-row gap-[4rem] md:gap-[8rem]">
            <h2>Subtotal</h2>
            <h2>Rs 1899</h2>
          </div>

          <button className="w-full rounded-[11px] bg-[#A145CD] py-[5px] px-[10px] mt-4 ">
            Download Receipt
          </button>
        </div>
      </div>
    </>
  );
};

export default PaymentProceed;
