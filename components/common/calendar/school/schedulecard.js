import React from "react";

const Schedulecard = ({item}) => {

    console.log(item);
  return (
    <div key={item.uid} className="flex flex-row items-start w-full p-2">
      <div className={`rounded-md bg-[${item.defaultRadio}] shrink-0 p-2 my-auto`}>
        {item.startTime}
      </div>
      <div className="flex flex-col justify-center ml-2 text-lg">
        <div className="">{item.addTitle}</div>
        <p className="text-sm flex gap-5">
          <span>Online.</span>  <span>{item.addBatch}</span>
        </p>
      </div>
    </div>
  );
};

export default Schedulecard;
