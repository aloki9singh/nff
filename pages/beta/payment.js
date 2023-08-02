import React, { useEffect, useState } from 'react'
import StepProgress from "@/components/student/payment/stepprogress";
import PaymentCompleted from "@/components/student/payment/paymentdone";
import PaymentProceed from '@/components/student/payment/PaymentProceed';
import DashboardNav from "@/components/common/navbar/dashboardnav";
import Payment from '@/components/student/payment/paymen';

const Paynow = () => {

  //to manage the current step of the payment process
  const [currentStep, setCurrentStep] = useState(0);
  //To pass the price of the selected card plan
  const [price, setPrice] = useState();

  //hooks for navbar toggle
  const [showSideBar, setShowSideBar] = useState(false);
  const [SideBarState, sendSideBarState] = useState(false);

  //stores the page number to the localhost (till now its a jugaad)
  const updatePage = (page) => {
    setCurrentStep(page);
    localStorage.setItem('currentPage', page);
  };

  //get the page number stored in localStorage
  useEffect(() => {
    const pg = localStorage.getItem('currentPage');
    console.log(pg);

    if (pg) {
      setCurrentStep(pg);
    }
  }, [currentStep])


  //update the value of price hook according to passed into props
  const updatePrice = (price) => {
    setPrice(price);
  }


  //for toggling navbar
  function toggleSideBar() {
    setShowSideBar(!showSideBar);
    sendSideBarState(showSideBar);
  }

  return (
    <div className='h-screen'>

      <DashboardNav heading={"Payment"} toggleSideBar={toggleSideBar} />

      <div className={`flex flex-col items-center  text-white font-Inter ${currentStep==0? "bg-[#0D0E14]" : "bg-[#2D2E35] "}`}>

        <StepProgress currentStep={currentStep} />
        {currentStep == 2 && <PaymentCompleted />}

        {currentStep == 1 && <PaymentProceed updatePage={updatePage} price={price} />}
      </div>
      {currentStep == 0 && <Payment updatePage={updatePage} updatePrice={updatePrice} />}

    </div>
  )
}

export default Paynow