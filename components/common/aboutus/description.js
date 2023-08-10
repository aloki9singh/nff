import Image from 'next/image'
import React from 'react'

const Description = ({className}) => {
  return (
    <div className={` ${className} relative flex flex-col items-center `}>
          <div
            className="w-full pb-20 sm:pb-20  md:pb-32 max-w-[1440px] mt-11 px- p-10 rounded-[50px] bg-gradient-to-b from-[#A134CD] to-[#E1348B] flex  text-sm md:text-base text-white"
            style={{ clipPath: "polygon(0 0, 100% 0, 100% 85%, 0% 100%)" }}
          >
            <p className="text-sm md:text-xl lg:text-2xl lg:px-11  ">
              <a href="https://neatskills.tech" className="font-semibold">neatskills.tech</a> is developed and managed by Provoke Developers
              Private Limited. At the core of this, we value quality and want to
              provide everyone with the affordable way to access any skill and
              explore themselves in their own way with their own lifelong
              learning partner.
            </p>
          </div>
          <Image
            src="/componentsgraphics/common/aboutpage/about.png"
            alt="random image"
            width={900}
            height={600}
            className="w-9/12 md:pt-3 -translate-y-[40%]  sm:-translate-y-1/3 object-cover shadow-md rounded-lg max-w-[900px]"
          />
        </div>
  )
}

export default Description