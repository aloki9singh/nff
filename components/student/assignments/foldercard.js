import Image from 'next/image';
import React from 'react';
import { useRouter } from 'next/router';
import { useAuthContext } from '@/lib/context/AuthContext';

const AssignmentCard = ({ id, name, date, url, courseid, checked, active, no, submit }) => {
  const router = useRouter()
  const {user} = useAuthContext()
  const time = new Date(date.seconds * 1000 + date.nanoseconds / 1000000);
  return (
    <>
      <div className={`rounded-xl bg-[#505057] shadow p-4 md:w-48 h-${active == "check" ? "fit" : "[184px]"} m-4 cursor-pointer`} onClick={() => {if (!checked)
      {router.push({ pathname: "/beta/assignmentupload", query: { id: id, courseid: courseid } })
      }
      else{
        router.push({
            pathname: "/beta/assignments/feedback",
            query: { courseid: courseid, id: id, submitid: user.uid},
          })
      }}}>
        <div className='flex justify-between items-center'>
          <Image
            src="/componentsgraphics/mentor/FolderNotch.svg"
            className="w-12 h-12"
            alt=""
            width={10}
            height={10}
          />
          <div className='text-xs pt-3 md:pt-0 md:text-sm text-[#E1348B]'>
            <span className='mr-3'>{checked ?
              <div>
                <Image src="/componentsgraphics/mentor/tick.svg" width="25" height="25" alt="Checked"></Image>
              </div>
              :
              submit ? "Submitted" : "Pending"}</span>
          </div>
        </div>
        <h5 className="text-base font-medium mt-4">{`Assignment - ${no}`}</h5>
        <div className="flex-col items-between justify-between">
          <div className="text-white text-[10px] my-2">{`${name}`}</div>
          <div className="text-[10px]">{`${time.toLocaleString()}`}</div>
        </div>
        {(checked && active == "check") ? <button className="bg-[#E1348B] rounded-[10px] mt-4 font-semibold text-sm text-white py-2 px-4 m-2" onClick={() =>
          router.push({
            pathname: "/beta/assignments/feedback",
            query: { courseid: courseid, id: id, submitid: user.uid},
          })
        }>
          View Feedback
        </button> : ""}
      </div>
    </>
  );
};

export default AssignmentCard;
