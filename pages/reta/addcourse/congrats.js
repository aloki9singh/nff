import React from 'react';
import { useRouter } from 'next/router';
import AddTeamPage from '@/pages/reta/addTeam';
import { useEffect } from 'react';


const CongratsAddTeam = () => {
  const glass = {
    background: 'rgba(51, 51, 51, 0.4)',
    boxShadow: '0 8px 32px 0 rgba( 31, 38, 135, 0.37 )',
    backdropFilter: 'blur(8.5px)',
    borderRadius: '10px',
    display: 'flex'
  };

  const router = useRouter();
  const handleCreateAnotherTeam = () => {
    router.push(addTeamPage);
  };

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
          backgroundImage: "url('/pagesgraphics/admin/AddTeam/Frame.svg')",
          display: 'flex'
        }}>
        <div
          className='block max-w-2xl py-8 px-20  rounded-lg shadow '
          style={glass}>
          <div className='d-flex justify-center'>
            <div className='text-container text-center'>
              <h5 class='mb-3 text-4xl font-bold tracking-tight text-white dark:text-white'>
                Congratulations
              </h5>
              <h6 className='text-white font-normal text-lg max-w-lg'>
              A new course has successfully been added. The course will only be visible to public after assigning a mentor to it.
              </h6>
            </div>

            <div className='button-container text-center my-3 '>
              <button className='d-flex h-11 px-6 text-white sm:m-4 justify-center items-center gap-2 rounded-xl bg-[#E1348B] my-6'>
                Assign A Mentor
              </button>

              <button
                className='d-flex text-white sm:m-4 h-11 px-6 justify-center items-center gap-2 rounded-xl bg-[#E1348B] my-4'
                onClick={() => router.push('/meta/dashboard')}>
                Go to Dashboard
              </button>
            </div>
          </div>
        </div>
      </div>
      </div>
    </>
  );
};

export default CongratsAddTeam;
