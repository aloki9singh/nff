import Image from "next/image";
import React from "react";

const AssignmentCard = ({ id, name, date }) => {
  return (
    <>
      <div className="rounded-xl bg-[#505057] shadow  p-4 w-[21%] m-4">
        <Image
          src="/FolderNotch.svg"
          className=" w-14 h-14"
          alt=""
          width={10}
          height={10}
        />
        <h5 className="text-xl  font-bold mb-4 mt-6">{`Assignment -${id}`}</h5>
        <div className="flex justify-between ">
          <p className="text-white text-[10px]">{`${name}`}</p>
          <span className="text-[10px]">{`${date}`}</span>
        </div>
      </div>
    </>
  );
};

export default AssignmentCard