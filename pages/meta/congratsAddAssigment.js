import React from 'react';
import { useRouter } from 'next/router';
import AddTeamPage from '@/pages/reta/addteam';
import { useEffect } from 'react';
import AddAssigments from './addassignment';

const CongratsAddAssigment = () => {
  const glass = {
    background: 'rgba( 255, 255, 255, 0.25 )',
    boxShadow: '0 8px 32px 0 rgba( 31, 38, 135, 0.37 )',
    backdropFilter: 'blur( 4px )',
    borderRadius: '10px',
    border: '1px solid rgba( 255, 255, 255, 0.18 )',
    display: 'flex'
  };

  const router = useRouter();
  // const handleCreateAnotherTeam = () => {
  //   router.push(AddAssigment);
  // };

  useEffect(() => {
    // Disable scrolling when the component mounts
    document.body.style.overflow = 'hidden';

    // Re-enable scrolling when the component unmounts
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  return (
    <>
      <div className='w-screen h-screen flex items-center justify-center'>
        <div
          className='d-flex items-center justify-center w-[85%] sm:w-[1350px] h-[724px] rounded-xl bg-[#1E1E1E] m-12'
          style={{
            backgroundImage: "url('/pagesgraphics/mentor/Frame.svg')",
            display: 'flex'
          }}>
          <div
            href='#'
            class='block max-w-xl p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700'
            style={glass}>
            <div className='d-flex justify-center'>
              <div className='text-container text-center'>
                <h5 class='mb-2 text-2xl font-bold tracking-tight text-white dark:text-white'>
                  Congratulations
                </h5>

                <h6 className='text-white font-normal sm:text-2xl text-xl'>
                  Assigment made successfully!
                </h6>
              </div>

              <button
                className='d-flex text-white sm:m-4 h-11 px-6 justify-center items-center gap-2 rounded-xl bg-[#E1348B] my-4'
                onClick={() => router.push('addassignment')}>
                Create another Assigment
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CongratsAddAssigment;
