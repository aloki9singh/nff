import { useState } from "react";
import Head from "next/head";
import axios from "axios";
import ChoosePlan from "@/components/student/payment/plan";
import StepProgress from "@/components/student/payment/stepprogress";
import PaymentCompleted from "@/components/student/payment/paymentdone";
import { useAuthContext } from "@/lib/context/AuthContext";
import { useRouter } from "next/router";

export default function Payment() {
  const [currentStep, setCurrentStep] = useState(0); //to manage the current step of the payment process

  const updatePage = (page) => {
    setCurrentStep(page);
  };

  // const makePayment = async () => {
  //   console.log('here...');
  //   const res = await initializeRazorpay();

  //   if (!res) {
  //     alert('Razorpay SDK Failed to load');
  //     return;
  //   }

  //   // Make API call to the serverless API
  //   const data = await fetch('/api/razorpay', { method: 'POST' }).then((t) =>
  //     t.json()
  //   );
  //   console.log(data);
  //   var options = {
  //     key: 'rzp_test_cARkSDvMdJFmJI', // Enter the Key ID generated from the Dashboard
  //     name: 'Manu ',
  //     currency: data.currency,
  //     amount: data.amount,
  //     order_id: data.id,
  //     description: 'Thankyou for your test donation',
  //     image: 'https://manuarora.in/logo.png',
  //     handler: function (response) {
  //       // Validate payment at server - using webhooks is a better idea.
  //       alert(response.razorpay_payment_id);
  //       alert(response.razorpay_order_id);
  //       alert(response.razorpay_signature);
  //     },
  //     prefill: {
  //       name: 'Manu Arora',
  //       email: 'manuarorawork@gmail.com',
  //       contact: '9999999999',
  //     },
  //   };

  //   const paymentObject = new window.Razorpay(options);
  //   paymentObject.open();
  // };

  const makePayment = async () => {
    const options = {
      upiuid: "paytmqr1i14y67t46@paytm",
      token: "4ee77e-8faf20-d01e27-3e4cd9-c29d69",
      orderId: "ws12",
      txnAmount: "10",
      txnNote: "Nothing",
      callback_url: "localhost:3000",
      checksum: "asda",
    };
    const res = await axios.post("/api/provoke", options);
    console.log(res);
  };

  const initializeRazorpay = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      // document.body.appendChild(script);

      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };

      document.body.appendChild(script);
    });
  };
  //securedroute
  const router = useRouter();
  const { user, userProfile } = useAuthContext();
  if (!user || !userProfile) {
    router.push("/");
  }

  if (!user || !userProfile) {
    return null;
  }
  return (
    <>
      <div className="md:h-screen flex flex-col items-center bg-[#2D2E35] text-white font-Inter">
        <StepProgress currentStep={currentStep} />
        {currentStep == 1 && <ChoosePlan updatePage={updatePage} />}
        {currentStep == 4 && <Hero onClick={makePayment} />}
        {currentStep == 0 && <PaymentCompleted />}
      </div>
    </>
  );
}

const Hero = ({ onClick }) => {
  return (
    <div className="relative z-10 flex flex-col md:flex-row mt-10 items-center  max-w-6xl justify-evenly mx-auto">
      <div className="md:w-1/3 mb-20 md:mb-0 mx-10">
        <h1 className=" text-white font-bold text-5xl mb-10">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-violet-500">
            Neatskills
          </span>
        </h1>
        <p className="text-sm text-gray-300 font-light tracking-wide w-[300px] mb-10"></p>
        <div className="bg-gradient-to-r from-[#3e4044] to-[#1D2328] p-[1px] rounded-md mb-4">
          <button
            onClick={onClick}
            className="bg-gradient-to-r from-[#2E3137] to-[#1D2328] rounded-md w-full py-4 shadow-xl drop-shadow-2xl text-gray-300 font-bold"
          >
            Purchase Now
          </button>
        </div>
      </div>
      {/* <div className="w-2/3 bg-white flex-shrink-0  relative"> */}
      {/* <img
        className="w-full md:w-[36rem] h-full"
        alt="stripe payment from undraw"
        src="/payments.svg"
      /> */}
    </div>
  );
};
