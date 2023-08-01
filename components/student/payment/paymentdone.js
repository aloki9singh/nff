import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";

const PaymentCompleted = () => {

  return (
    <>
      <div className="container md:flex ">
        <div className="order-first md:order-1 data-conatiner w-full block md:flex md:w-[660px] md:h-[481px] rounded-[34px] bg-[#373A41] md:m-8 md:mx-16 ">
          <div className="left md:w-[340px] p-[1rem] md:mt-4">
            <div className="sec1 md:m-4">
              <h2>Payment completed</h2>
              <p>4656 5664 6564 8338</p>
            </div>

            <div className="sec2 md:m-4">
              <h2>Billing address</h2>
              <p className="text-[14px]">
                Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                Aspernatur laboriosam placeat vero id accusantium magni ut,
                tempore commodi nihil libero ratione quibusdam ullam.
              </p>
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

            <button className="w-full rounded-[11px] bg-[#A145CD] py-[5px] px-[10px] mt-4 " onClick={() => {
              localStorage.removeItem('currentPage');
            }}>
              Download Receipt
            </button>
          </div>
        </div>

        <div className="order-last md:order-2  graphics-conatainer w-full md:w-[490px] m-4 md:mx-16 ">
          <Image
            src="/pagesgraphics/student/payment/GroupPayment.svg"
            width={460}
            height={320}
            alt="Picture of the author"
          />

          <h1 className="text-[2.5rem]">
            Welcome to the <span className="text-[#E1348B]">Neatskills</span>{" "}
            family !
          </h1>
          <p>
            Congratulations you have bought the trial/subscription successfully
            ! Explore and start your first course today
          </p>
        </div>
      </div>
    </>
  );
};

export default PaymentCompleted;
