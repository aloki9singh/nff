import Image from 'next/image';
import React from 'react';
import { useRouter } from 'next/router';

const AssignmentCard = ({ id, name, date, url, courseid }) => {
  const router = useRouter()
  const time = new Date(date.seconds * 1000 + date.nanoseconds / 1000000);
  return (
    <>
      <div className="rounded-xl bg-[#505057] shadow p-4 md:w-48 h-fit m-4 cursor-pointer" onClick={() => router.push({pathname: "/beta/assignmentupload", query: {id: id, courseid: courseid}})}>
        <Image
          src="/componentsgraphics/mentor/FolderNotch.svg"
          className="w-12 h-12"
          alt=""
          width={10}
          height={10}
        />
        <h5 className="text-base font-medium mt-4">{`Assignment - ${id}`}</h5>
        <div className="flex-col items-between justify-between">
          <div className="text-white text-[10px] my-2">{`${name}`}</div>
          <div className="text-[10px]">{`${time.toLocaleString()}`}</div>
        </div>
      </div>
    </>
  );
};

export default AssignmentCard;
