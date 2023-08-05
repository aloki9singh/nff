import React, { useEffect, useRef, useState } from 'react';


const OurLoveSection = () => {
  return (
    <div className=''>
      <span className='text-4xl  font-extrabold text-white'>Our</span>
      <span className='text-4xl  font-extrabold ml-2 bg-gradient-to-r from-[#A134CD] to-[#E1348B] text-transparent bg-clip-text'>
        Love
      </span>
      <div className='md:w-[40rem] h-1 bg-white mt-2 ' />

      <div className='flex flex-col md:flex-row py-4'>
        <p className='text-white mb-4 md:mb-0 md:w-[240px] lg:w-[370px]  shrink-0'>
          & Support
        </p>
        <p className='text-white'>
          We love you as much you do and want to stand and be with you
          unconditially.
        </p>
      </div>

      <div className='flex flex-col md:flex-row py-4'>
        <p className='text-white mb-4 md:mb-0 md:w-[240px] lg:w-[370px]  shrink-0'>
          Care
        </p>
        <p className='text-white'>
          We care for your future with skills & academics both.
        </p>
      </div>

      <div className='flex flex-col md:flex-row py-4'>
        <p className='text-white mb-4 md:mb-0 md:w-[240px] lg:w-[370px]  shrink-0'>
          Impact
        </p>
        <p className='text-white'>
          We want to create an great impact in this world with neatskills.tech
          by Provoke Developers Private Limiited.
        </p>
      </div>
    </div>
  );
};

export default OurLoveSection;
