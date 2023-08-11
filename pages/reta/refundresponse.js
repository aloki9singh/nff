import React, { useEffect, useState } from 'react'

import { useRouter } from "next/router";


const Refundresponse = () => {
    const router = useRouter();
    const [payload, setPayload] = useState();
    
    
    useEffect(() => {
        const { param } = router.query;
        if (param) {
          const payloadData = JSON.parse(atob(param));
          setPayload(payloadData);
          console.log(payloadData);
        }
        else {
          router.push("/beta/paymentFailed");
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [router.query]);
    

  return (
    <>

    <div className="text-white block justify-center mt-[45vh] w-[60%] bg-slate-700 m-auto">
        <div className='flex justify-around py-4'>

        <h1>Status</h1>
        <h1>{payload?.code}</h1>
        </div>
        <div className='flex justify-around py-4'>

        <h1>Amount</h1>
        <h1>{payload?.data?.amount}</h1>
        </div>
        <div className='flex justify-around py-4'>

        <h1>Transaction Id</h1>
        <h1>{payload?.data?.merchantTransactionId}</h1>
        </div>

        <div className='flex justify-around py-4'>

        <h1>State</h1>
        <h1>{payload?.data?.state}</h1>
        </div>

        <div className='flex justify-around py-4'>

        <h1>Message</h1>
        <h1>{payload?.message}</h1>
        </div>
    </div>

    </>
  )
}

export default Refundresponse