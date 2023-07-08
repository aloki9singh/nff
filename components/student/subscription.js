import React from 'react';

const SubscriptionData = () => {
  return (
    <div className="text-white md:-mt-16 overflow-y-scroll">
      <div className="h-fit my-4 p-6 bg-[#373A41] rounded-[36px]">
        <div className="flex justify-between">
          <span className="text-2xl ">Plan</span>
          <span>
            <button
              className="border p-2 rounded-[8px]"
              style={{
                background:
                  'linear-gradient(0deg, #2E3036, #2E3036),linear-gradient(0deg, #BFC0C2, #BFC0C2)',
              }}
            >
              Change Plan
            </button>
          </span>
        </div>
        <div className="text-[#FFFFFFAD]">
          <div>Frequency:</div>
          <div className="my-1">Next Billing:</div>
          <div>Amount:</div>
        </div>
      </div>
      <div className="h-fit p-8 bg-[#373A41] rounded-[36px] my-4">
        <div className="flex justify-between">
          <span className="text-2xl ">Payment Method</span>
          <span>
            <button
              className="border p-2 rounded-[8px]"
              style={{
                background:
                  'linear-gradient(0deg, #2E3036, #2E3036),linear-gradient(0deg, #BFC0C2, #BFC0C2)',
              }}
            >
              Update
            </button>
          </span>
        </div>
        <div className="text-[#FFFFFFAD]">
          <div>card data</div>
          <div className="my-1">
            To update your billing information, click on update.
          </div>
        </div>
      </div>
      <div className="h-fit p-8 bg-[#373A41] rounded-[36px]">
        <div className="flex justify-between">
          <span className="text-2xl ">Cancel Subscription</span>
          <span>
            <button className="border p-2 rounded-[8px] bg-[#d56262]">
              Cancel
            </button>
          </span>
        </div>
        <div className="text-[#FFFFFFAD]">
          If you wish to discontinue your subscription, you can cancel at
          anytime.
        </div>
      </div>
    </div>
  );
};

export default SubscriptionData;
