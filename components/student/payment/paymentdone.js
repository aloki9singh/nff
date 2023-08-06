import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

const PaymentCompleted = () => {
  const router = useRouter();
  const [payData, setPayData] = useState();



  const [items, setItems] = useState([
    { name: 'Amount', price: 0 },
    { name: 'Discount', price: 0 },
    { name: 'GST', price: 0 },
  ]);

  useEffect(() => {
    const { val } = router.query;
    if (val) {
      const payloadData = JSON.parse(atob(val));
      setPayData(payloadData);
      setItems([{ name: 'Amount', price: payloadData?.amount / 100 },
      { name: 'Discount', price: payloadData?.discount || 0 },
      { name: 'GST', price: payloadData?.gst || 0 }])
    }
    else {
      router.push("/beta/paymentFailed");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.query]);


  const totalAmount = items.reduce((total, item) => total + item.price, 0);



  const generatePDF = () => {
    const receiptContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>Receipt</title>
        <style>
          body {
            font-family: Arial, sans-serif;
          }
          .receipt {
            width: 250px;
            margin: 0 auto;
            padding: 10px;
          }
          .title {
            text-align: center;
            font-size: 18px;
            margin-bottom: 10px;
          }
          .item {
            display: flex;
            justify-content: space-between;
            margin-bottom: 5px;
          }
          .itemName {
            flex: 1;
          }
          .itemPrice {
            flex-basis: 50px;
          }
          .total {
            font-weight: bold;
            margin-top: 10px;
          }
        </style>
      </head>
      <body>
        <div class="receipt">
          <div class="title">Receipt</div>
          ${items
        .map(
          item => `
                <div class="item">
                  <div class="itemName">${item.name}</div>
                  <div class="itemPrice">Rs${Number(item.price)?.toFixed(2)}</div>
                </div>
              `
        )
        .join('')}
          <div class="total">Total: Rs${Number(totalAmount)?.toFixed(2)}</div>
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
              <h2>Rs 0</h2>
            </div>
            <div className="flex text-sm gap-[4rem] flex-row md:gap-[10rem]">
              <h2>GST</h2>
              <h2>Rs 0</h2>
            </div>

            <hr className="h-px my-8 bg-gray-200 w-full dark:bg-gray-700"></hr>

            <div className="flex text-sm flex-row gap-[4rem] md:gap-[8rem]">
              <h2>Subtotal</h2>
              <h2>Rs {payData?.amount / 100}</h2>
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
