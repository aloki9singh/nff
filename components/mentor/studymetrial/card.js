import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';

import { db } from '../../../config/firebaseconfig';
import { collection, getDocs, query } from 'firebase/firestore';

const StudyMaterialCard = ({ module, onClick }) => {
  const [material, setMaterial] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const q = query(collection(db, 'studyMaterial'));
      const materialSnapshot = await getDocs(q);
      const materialData = materialSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setMaterial(materialData);
    };
    fetchData();
  }, []);
  const menuItems = [...new Set(material.map(Val => Val.title))];

  // console.log(menuItems);
  const filteredMaterial = selectedOption
    ? material.filter(item => item.title === selectedOption)
    : material;

  return (
    <div>
      {' '}
      {/* {filteredMaterial.map(study => (
        <Link  href='studyMaterial'> */}
        {/* on hover shadow should be on right and bottom sides */}
      <div className='rounded-2xl border-2 cursor-pointer hover:-translate-y-1 transition-all duration-150 hover:shadow-md hover:shadow-gray-500   w-[280px] border-white bg-[#37393D]  max-w-sm md:gap-6' onClick={onClick}>
        <div className='flex gap-2 items-center '>
          <div className='m-2 p-3 border rounded-2xl bg-gradient-to-r from-[#673CAF] to-[#DA2E8B] w-36 flex flex-col items-center justify-between '>
            <Image
              src='/pagesgraphics/student/coursedescription/laptop.svg'
              width={60}
              height={60}
              alt='image'
            />
            <h1 className='text-white text-base font-medium text-center line-clamp-2'>
              {module?.name}
            </h1>
          </div>
          <div className='text-sm text-white pr-2 space-y-6'>
            <p className='mr-2 text-xs flex items-center gap-1'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth={1.5}
                stroke='currentColor'
                className='w-3 h-3'>
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z'
                />
              </svg>
              {module?.pdf?.length ?? 0} pdf
            </p>
            <p className='mr-2 text-xs flex items-center gap-1'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth={1.5}
                stroke='currentColor'
                className='w-3 h-3'>
                <path
                  strokeLinecap='round'
                  d='M15.75 10.5l4.72-4.72a.75.75 0 011.28.53v11.38a.75.75 0 01-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25h-9A2.25 2.25 0 002.25 7.5v9a2.25 2.25 0 002.25 2.25z'
                />
              </svg>
              {module?.video?.length ?? 0} videos
            </p>
            <p className='mr-2 text-xs flex items-center gap-1'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth={1.5}
                stroke='currentColor'
                className='w-5 h-5'>
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244'
                />
              </svg>
              {module?.link?.length ?? 0} links
            </p>
          </div>
        </div>
      </div>
      {/* </Link>
      ))} */}
    </div>
  );
}

export default StudyMaterialCard;