import React from "react";

const Schedulecard = ({item}) => {
  return (
    <div key={item.uid} className="flex flex-row items-start w-full p-2">
      <div className={`rounded-md bg-[${item.defaultRadio}] shrink-0 p-2`}>
        {item.startTime}
      </div>
      <div className="flex flex-col justify-center ml-2 text-lg">
        <div className="text-sm">{item.addTitle}</div>
        <p className="text-xs">
          Online. {item.addBatch} <span></span>
        </p>
      </div>
    </div>
  );
};

export default Schedulecard;
