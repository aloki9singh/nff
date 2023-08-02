import React from 'react';
import Image from 'next/image';

import styles from '@/styles/componentsstyling/courseheader/courseheader.module.css';

import user from '@/public/componentsgraphics/student/courses/header/pfpsample.svg';
import books from '@/public/componentsgraphics/student/courses/header/booksicon.svg';
import search from '@/public/componentsgraphics/student/courses/header/searchicon.svg';
import desktop from '@/public/componentsgraphics/student/courses/header/desktopicon.svg';
import laptop from '@/public/componentsgraphics/student/courses/header/laptopicon.svg';

export default function CourseHeader() {
  return (
    <div className="text-white">
      <div className="flex flex-col items-center max-w-[630px]  mx-auto relative pt-20 pb-10 px-10">
        <h2 className="text-4xl font-medium text-center mb-2">
          Unleash your full potential with our courses
        </h2>
        <p className="text-sm font-normal text-center w-3/4 mb-8">
          Build your skills with our interactive courses. Get the education you
          need, on your own terms.
        </p>
        <button className="bg-[#a145cd] rounded-2xl font-semibold text-sm text-white py-4 px-4">
          Get Started for Free
        </button>
        <div className="item-center">
          <Image
            src={books}
            alt="books"
            className="absolute md:right-16  right-6 bottom-9 w-16"
          />
          <Image
            src={search}
            alt="search"
            className="absolute left-10 md:left-16 bottom-11 w-10"
          />
          <Image
            src={laptop}
            alt="laptop"
            className="absolute md:right-8 right-4 md:top-36 top-[180px] w-16"
          />
          <Image
            src={desktop}
            alt="desktop"
            className="absolute md:left-8 left-4 md:top-36 top-[180px] w-16"
          />
        </div>
      </div>
    </div>
  );
}
