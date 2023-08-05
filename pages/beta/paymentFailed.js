import React from 'react'
import ToastMessage from "@/components/student/payment/ToastMessage";


const paymentFailed = () => {
  return (
    <>
    <div className="newc ">

    <ToastMessage
            heading="Payment Failed"
            message="Somthing Went Wrong!! Please Try Again!"
          />
    </div>
 
    </>
  )
}

export default paymentFailed;