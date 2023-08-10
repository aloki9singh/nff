import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useAuthContext } from "@/lib/context/AuthContext";


const PaymentCompleted = () => {
  const router = useRouter();
  const [payData, setPayData] = useState();


  const { user, userProfile } = useAuthContext();

  const [items, setItems] = useState([
    { name: 'Amount', price: 0 },
    { name: 'Discount', price: 0 },
  ]);

  useEffect(() => {
    const { val } = router.query;
    if (val) {
      const payloadData = JSON.parse(atob(val));
      setPayData(payloadData);
      setItems([{ name: "Transaction Id", price: payloadData?.transactionId },
      { name: 'Amount', price: payloadData?.amount / 100 },
      { name: 'Discount', price: payloadData?.discount / 100 || 0 },
      { name: "Payment Time", price: payloadData?.paymentAt },
      {name: "Sender name", price:user?.displayName}
      ])
    }
    else {
      router.push("/beta/paymentFailed");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.query]);




  const generatePDF = () => {
    const receiptContent = `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Receipt</title>
        <script src="https://cdn.tailwindcss.com"></script>
      </head>


      <body class="bg-[#2D2E35] items-center">
    <div class="flex flex-col justify-center text-center items-center m-auto">
      <img src="/componentsgraphics/common/navbar/navbar/neatskillslogosample.svg" alt="" />
      <h2 class="text-[2rem] pt-6 text-white">Payment Receipt</h2>

      <div
        class="bg-[#25282E] w-full text-white text-center m-auto md:w-[50%] items-center justify-center my-8"
      >
        <h2 class="text-[2rem] pt-6">Payment Success</h2>
        <h2 class="text-[2rem] py-6">INR ${items[1].price}</h2>

        <hr class="w-[60%] m-auto pt-8" />

        <div class="w-[50%] m-auto">
        
        ${items
        .map(
          (item , i )=> `
              <div class="flex text-white py-2 overflow-x-clip">
              <h2>${item.name}</h2>
              <h2 class="px-8">${(i == 1 || i ==2 ) ? "Rs "+Number(item.price)?.toFixed(2) : item.price}</h2>
              </div>
              `
        ).join('')}

          <hr class="w-full pt-8 m-auto" />

          <div class="flex text-white py-2">
            <h2>Total</h2>
            <h2 class="px-8">Rs${Number(items[1].price - items[2].price)?.toFixed(2)}</h2>
          </div>
        </div>
        <hr class="w-[60%] m-auto pt-8" />
      </div>
    </div>
  </body>
      </html>
    `;
    const printWindow = window.open('', '_blank');
    printWindow.document.open();
    printWindow.document.write(receiptContent);
    printWindow.document.close();
    printWindow.print();

    router.push("/beta/dashboard");
  };







  return (
    <>
      <div className="container md:flex ">
        <div className="order-first md:order-1 data-conatiner w-full block md:flex md:w-[660px] md:h-[481px] rounded-[34px] bg-[#373A41] md:m-8 md:mx-16 ">
          <div className="left md:w-[340px] p-[1rem] md:mt-4">
            <div className="sec1 md:m-4">
              <h2>Payment completed</h2>
              {/* <p>4656 5664 6564 8338</p> */}
            </div>

            <div className="sec2 md:m-4">
              <h2>Transaction Id</h2>
              <p className="text-[14px]">
                {payData?.transactionId}
              </p>
            </div>
          </div>
          <div className="right flex md:w-[331px] pt-[26px] pb-[18px] px-[26px] flex-col items-start gap-[5px] border border-white rounded-[11px] ml-2 md:ml-0 mr-2 md:mr-8 my-8">
            <h2>Order Summary</h2>
            <h1 className="text-xl mt-2 mb-4">
              Subscription Plan{" "}
              <span className="text-[#A145CD] font-bold">{payData?.plan == 1 ? "Monthly" : payData?.plan == 12 ? "Yearly" : "Quarterly"}</span>
            </h1>

            <h2 className="font-bold">Order details</h2>
            <div className="flex text-sm gap-[4rem] flex-row md:gap-[8rem]">
              <p>Amount</p>
              <p>Rs {payData?.amount / 100}</p>
            </div>
            <div className="flex text-sm gap-[4rem] flex-row md:gap-[8rem]">
              <h2>Discount</h2>
              <h2>Rs {payData?.discount / 100}</h2>
            </div>
            {/* <div className="flex text-sm gap-[4rem] flex-row md:gap-[10rem]">
              <h2>GST</h2>
              <h2>Rs 0</h2>
            </div> */}

            <hr className="h-px my-8 bg-gray-200 w-full dark:bg-gray-700"></hr>

            <div className="flex text-sm flex-row gap-[4rem] md:gap-[8rem]">
              <h2>Subtotal</h2>
              <h2>Rs {(payData?.amount / 100) - payData?.discount / 100}</h2>
            </div>

            <button className="w-full rounded-[11px] bg-[#A145CD] py-[5px] px-[10px] mt-4 " onClick={() => {
              generatePDF();
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

          <button className="w-full rounded-[11px] bg-[#E1348B] py-[5px] px-[10px] mt-4 " onClick={() => {
            router.push("/beta/courseoverview");
          }}>
            Let&apos;s Go
          </button>
        </div>
      </div>
    </>
  );
};

export default PaymentCompleted;
