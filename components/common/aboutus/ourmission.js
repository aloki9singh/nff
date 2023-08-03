import React, { useEffect, useRef, useState } from 'react';

const OurMissionSection = () => {
  return (
    <div className=''>
      <p>
        <span className='text-4xl  font-extrabold text-white'>Our</span>
        <span className='text-4xl  font-extrabold ml-2 bg-gradient-to-r from-[#A134CD] to-[#E1348B] text-transparent bg-clip-text'>
          Mission
        </span>
      </p>
      <div className=' md:w-[40rem] h-1 bg-white mt-2' />

      <div className='flex flex-col md:flex-row py-4 '>
        <p className='text-white mb-4 md:mb-0 md:w-[240px] lg:w-[370px]  shrink-0'>
          We believe in
        </p>
        <p className=' text-white '>Affordability</p>
      </div>

      <div className='flex flex-col md:flex-row py-4'>
        <p className='text-white mb-4 md:mb-0 md:w-[240px] lg:w-[370px]  shrink-0'>
          Quality
        </p>
        <p className='text-white '>Skills</p>
      </div>

      <div className='flex flex-col md:flex-row py-4'>
        <p className='text-white mb-4 md:mb-0 md:w-[240px] lg:w-[370px]  shrink-0'>
          Why We?
        </p>
        <p className='text-white'>We love to do stuffs for everyone</p>
      </div>

      <div className='flex flex-col md:flex-row py-4'>
        <p className='text-white mb-4 md:mb-0 md:w-[240px] lg:w-[370px]  shrink-0'>
          Provoke Developers Private Limited?
        </p>
        <p className='text-white '>The parent company of neatskills.tech</p>
      </div>
    </div>
  );
};

export default OurMissionSection;
