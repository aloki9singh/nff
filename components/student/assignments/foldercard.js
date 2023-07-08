import Image from 'next/image';
import React from 'react';

const AssignmentCard = ({ id, name, date }) => {
  return (
    <>
      <div className="rounded-xl bg-[#505057] shadow p-4 md:w-48 md:h-40 m-4">
        <Image
          src="/FolderNotch.svg"
          className="w-12 h-12"
          alt=""
          width={10}
          height={10}
        />
        <h5 className="text-base font-medium mt-4">{`Assignment -${id}`}</h5>
        <div className="flex justify-between">
          <p className="text-white text-[10px]">{`${name}`}</p>
          <span className="text-[10px]">{`${date}`}</span>
        </div>
      </div>
    </>
  );
};

export default AssignmentCard;
