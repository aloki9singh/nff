import React, { useState } from "react";
import Image from "next/image";
import { BsPatchCheckFill } from "react-icons/bs";



const PaymentProceed = ({ price, updatePage }) => {
  const [activeTab, setActiveTab] = useState("card");


  const paymentFuction = (e) => {
    e.preventDefault();
    updatePage(2);
  }


  const handleReq = async (e) => {

    const requestBody = {
      price: price * 100,
    };

    await fetch('/api/payment', { method: 'POST', body: JSON.stringify(requestBody) },)
      .then(response => response.json())
      .then(response => {
        console.log(response)
        window.location.href = response.data.instrumentResponse.redirectInfo.url;
      })
      .catch(err => console.error(err));


    
      paymentFuction(e)

  }


  return (
    <>
      <div className="flex container w-[1068px] h-[590px] bg-[#373A41] rounded-[33px] mb-16">

        <div className="hidden md:inline left m-12">

          <h1 className="py-2">Payment Method</h1>

          <ul className="flex flex-wrap text-sm font-medium text-center text-gray-500 border-gray-200 dark:border-gray-700 dark:text-gray-400 py-4">
            <li className="mr-2" role="presentation">
              <button
                className={`flex border border-[#717378] py-[7.418px] px-[30px] items-center rounded-lg ${activeTab == "card" ? "border-[#E1348B]" : null
                  }`}
                onClick={() => setActiveTab("card")}
              >
                <BsPatchCheckFill
                  className={`${activeTab == "card" ? "text-[#E1348B]" : "text-white"
                    }`}
                />
                <p className="mx-4">Debit/Credit</p>
                <Image
                  src="/pagesgraphics/student/payment/card.png"
                  width={57}
                  height={30}
                  alt="Picture of the Course"
                />
              </button>
            </li>
            <li className="mr-2" role="presentation">
              <button
                className={`flex border border-[#717378]  items-center py-[1.418px] px-[45px] rounded-lg ${activeTab == "upi" ? "border-[#E1348B]" : null
                  }`}
                onClick={() => setActiveTab("upi")}
              >
                <BsPatchCheckFill
                  className={`${activeTab == "upi" ? "text-[#E1348B]" : "text-white"
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
            <div className="mb-4">
              <label
                className="block text-white text-sm font-bold mb-2"
                for="UPI Id"
              >
                UPI Id
              </label>
              <input
                className="shadow appearance-none border rounded w-[451px] py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="UPI Id"
                type="text"
              />
            </div>

            <div className="mb-4">
              <label
                className="block text-white text-sm font-bold mb-2"
                for="UPI Id"
              >
                Card Holder Name
              </label>
              <input
                className="shadow appearance-none border rounded w-[451px] py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="Card Holder Name"
                type="text"
              />
            </div>

            <div className="mb-4">
              <button className="bg-[#A145CD] py-2 flex px-12 text-center items-center rounded-lg">
                Verify
                <svg
                  class="w-3.5 h-3.5 ml-2"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 10"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M1 5h12m0 0L9 1m4 4L9 9"
                  />
                </svg>
              </button>
            </div>
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
                Card Number
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
              <div className="">
                <label
                  className="block text-white text-sm font-bold mb-2 block"
                  for="Card Holder Name"
                >
                  Expiry Date
                </label>
                <input
                  className="shadow appearance-none border rounded w-[201px] py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="Card Holder Name"
                  type="text"
                />
              </div>

              <div className="px-12">
                <label
                  className="block text-white text-sm font-bold mb-2"
                  for="Card Holder Name"
                >
                  CVC
                </label>
                <input
                  className="shadow appearance-none border rounded w-[201px] py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="Card Holder Name"
                  type="text"
                />
              </div>
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
            <p>Price</p>
            <p>Rs {price}</p>
          </div>
          <div className="flex text-sm gap-[3rem] flex-row md:gap-[6rem]">
            <h2>Discount</h2>
            <h2 className="text-red-500">-Rs 0</h2>
          </div>
          <div className="flex text-sm gap-[4rem] flex-row md:gap-[8rem]">
            <h2>GST</h2>
            <h2 className="text-green-400">+Rs 0</h2>
          </div>

          <hr class="h-px my-8 bg-gray-200 w-full dark:bg-gray-700"></hr>

          <div className="flex text-sm flex-row gap-[4rem] md:gap-[8rem]">
            <h2>Subtotal</h2>
            <h2>Rs {price}</h2>
          </div>

          <button className="w-full rounded-[11px] bg-[#A145CD] py-[5px] px-[10px] mt-4 " onClick={(e) => {
            handleReq(e);
          }}
          >
            Pay Now
          </button>
        </div>
      </div>
    </>
  );
};

export default PaymentProceed;



//salt == 099eb0cd-02cf-4e2a-8aca-3e6c6aff0399;
//merchantId = PGTESTPAYUAT

