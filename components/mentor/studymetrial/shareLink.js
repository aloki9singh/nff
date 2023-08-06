import MentorSidebar from '@/components/common/sidebar/mentor';
import MentorTopbar from '@/components/common/navbar/mentortopbar';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import { useStudyMaterialContext } from '@/lib/context/StudyMaterialContext';
import Link from 'next/link';

function ShareLink() {

  const { selectedModule: module } = useStudyMaterialContext();




  return (
    <div>

      <div className='flex justify-center md:ml-10  flex-wrap md:grid md:gap-x-20 md:gap-y-5 lg:grid-cols-3 md:grid-cols-3 gap-y-5 m-5'>

        {
          module.link.map((link, i) => (
            <Link target='_blank' href={link.link} key={i} className='flex justify-between items-center'>
              <div className='m-2 p-3 border rounded-2xl bg-gradient-to-r from-[#673CAF] to-[#DA2E8B] h-32 w-48 flex flex-col '>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  viewBox='0 0 24 24'
                  fill='none'
                  stroke='currentColor'
                  strokeWidth='2'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  className='w-10 h-10 mb-2'>
                  <polygon points='23 7 16 12 23 17 23 7'></polygon>
                  <rect x='1' y='5' width='15' height='14' rx='2' ry='2'></rect>
                </svg>

                <div>
                  <h1
                    className='text-white text-base font-medium mb-2 '

                    >
                    {link.title}
                  </h1>
                  <div className=' flex flex-row  justify-between gap-3'>
                    <p className='text-white text-sm '>
                      {link.subtitle}
                    </p>
                    <div className='text-xs text-white pr-2 space-y-6'>
                      {
                        link.createdAt.toDate().
                          toLocaleDateString('en-IN', {
                            year: 'numeric',
                            month: 'numeric',
                            day: 'numeric',
                          })
                      }
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))
        }
      </div>
    </div>
  );
}

export default ShareLink;
