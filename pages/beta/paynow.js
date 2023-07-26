import React, { useState } from 'react'
import ChoosePlan from "@/components/student/payment/plan";
import StepProgress from "@/components/student/payment/stepprogress";
import PaymentCompleted from "@/components/student/payment/paymentdone";
import PaymentProceed from '@/components/student/payment/PaymentProceed';

const Paynow = () => {

  const [currentStep, setCurrentStep] = useState(1); //to manage the current step of the payment process

  const updatePage = (page) => {
    setCurrentStep(page);
  };


  return (
    <>
    <div className="md:h-screen flex flex-col items-center bg-[#2D2E35] text-white font-Inter">
      <StepProgress currentStep={currentStep} />
      {currentStep == 0 && <ChoosePlan updatePage={updatePage} />}
      {currentStep == 1 && <PaymentProceed />}
      {currentStep == 2 && <PaymentCompleted />}
    </div>
  </>
  )
}

export default Paynow