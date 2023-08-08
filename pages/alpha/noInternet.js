import React from 'react';
import Image from 'next/image';

const NoInternetPage = () => {
  return (
    <div className='bg-[#1E1E1E] p-10'>
      <div className='h-screen bg-gradient-to-br from-[#A145CD] to-[#E1348B] flex justify-center flex-col rounded-lg'>
        <div className='flex items-center justify-center mb-5'>
          <Image
            src='/pagesgraphics/common/errors/nointernet.svg'
            alt='404'
            height={500}
            width={500}
          />
        </div>

        <div className='flex justify-center text-white text-xl'>
          No Internet connection
        </div>

        <div className=' flex justify-center'>
          <div className='flex flex-col md:flex-row  item-center  md:justify-center mt-10 gap-5'>
            <div className='w-32  ml-2 md:w-36 h-10 flex items-center justify-center bg-transparent border-2 rounded-lg text-white'>
              Refresh
            </div>

            <div className='w-36 md:w-44  h-10 flex items-center justify-center bg-[#A145CD] rounded-lg text-white'>
              Back to Home
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoInternetPage;