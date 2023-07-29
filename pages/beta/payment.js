import React, { useState } from 'react'
import ChoosePlan from "@/components/student/payment/plan";
import StepProgress from "@/components/student/payment/stepprogress";
import Payment from './paymen';
import PaymentCompleted from "@/components/student/payment/paymentdone";
import PaymentProceed from '@/components/student/payment/PaymentProceed';


import DashboardNav from "@/components/common/navbar/dashboardnav";

const Paynow = () => {

  const [currentStep, setCurrentStep] = useState(0); //to manage the current step of the payment process
  const [price, setPrice] = useState();

  const updatePage = (page) => {
    setCurrentStep(page);
  };

  const updatePrice = (price) => {
    setPrice(price);
  }



  function toggleSideBar() {
    setShowSideBar(!showSideBar);
    sendSideBarState(showSideBar);
  }

  return (
    <>

      <DashboardNav heading={"Payment"} toggleSideBar={toggleSideBar} />
      <div className={`flex flex-col items-center  text-white font-Inter ${currentStep==0? "bg-[#0D0E14]" : "bg-[#2D2E35] md:h-screen"}`}>
        <StepProgress currentStep={currentStep} />
        {currentStep == 2 && <PaymentCompleted />}

        {currentStep == 1 && <PaymentProceed price={price}/>}
      </div>
        {currentStep == 0 && <Payment updatePage={updatePage} updatePrice={updatePrice} />}

    </>
  )
}

export default Paynow