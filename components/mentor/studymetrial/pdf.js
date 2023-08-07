import MentorSidebar from '@/components/common/sidebar/mentor';
import MentorTopbar from '@/components/common/navbar/mentortopbar';
import { useRouter } from 'next/router';
import { use, useEffect, useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import AddPdf from '@/components/mentor/studymetrial/addpdf';
import { useStudyMaterialContext } from '@/lib/context/StudyMaterialContext';
import Button from '@/components/common/button/primary-button';

function PdfList({ pdfs }) {
  return (
    <div>
      {pdfs?.length === 0 && (
          <div className="flex w-full justify-center items-center flex-col gap-y-5 m-5">
            <div className="text-2xl text-center font-medium">No Pdfs</div>
          </div>
        )}
      <div>
        <div className=' w-full  flex  flex-row-reverse '>
        </div>
        <div className='flex justify-center items-center md:items-start  md:ml-10   flex-col  gap-y-5 m-5'>
          {/* <div className=' ml-3 flex items-center justify-between self-stretch'>
            <p>Module 1</p>
          </div> */}
          <div className=' w-full flex flex-col items-center gap-5  '>
            {
              pdfs?.map((pdf, i) => (
                <PdfListItem key={i} pdf={pdf} />
              ))
            }
          </div>
        </div>
      </div>
    </div>
  );
}
function downloadPdf(url) {
  const link = document.createElement('a');

  link.setAttribute('target', '_blank');
  link.setAttribute('href', url);
  link.setAttribute('download', 'file.pdf');
  document.body.appendChild(link);
  link.click();
  link.remove();
}


const PdfListItem = ({ pdf }) => {
  return (
    <div className=' w-full flex flex-row md:justify-between items-center  mt-4 ml-5'>
      <div className=' flex flex-row gap-2'>
        {/* File SVG Icon */}
        <svg
          xmlns='http://www.w3.org/2000/svg'
          className='w-6 h-6 text-white-600'
          fill='none'
          viewBox='0 0 24 24'
          stroke='currentColor'>
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth='2'
            d='M14 3v4a1 1 0 0 0 1 1h4'
          />
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth='2'
            d='M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h8l6 6v10a2 2 0 0 1-2 2h-4'
          />
        </svg>

        {/* Title */}
        <div className='text-xl font-bold'>{pdf.name}</div>
      </div>

      {/* Date Text */}
      <div className='text-sm text-white'>{pdf.createdAt?.toDate().
        toLocaleDateString('en-IN', {
          year: 'numeric',
          month: 'numeric',
          day: 'numeric',
        }) ?? ''
      }</div>

      <div className=' flex flex-row  md:mr-20 gap-3'>
        {/* Size Text */}
        <div className='text-sm text-white'>{
          (pdf.size / 1024).toFixed(2) + ' KB' ?? ''
        }</div>

        {/* Download SVG Icon */}
        <svg
          onClick={() => {
            downloadPdf(pdf.url)
          }}
          xmlns='http://www.w3.org/2000/svg'
          viewBox='0 0 24 24'
          id='download'
          stroke='white'
          className='w-5 h-5 cursor-pointer '>
          <path d='M21,14a1,1,0,0,0-1,1v4a1,1,0,0,1-1,1H5a1,1,0,0,1-1-1V15a1,1,0,0,0-2,0v4a3,3,0,0,0,3,3H19a3,3,0,0,0,3-3V15A1,1,0,0,0,21,14Zm-9.71,1.71a1,1,0,0,0,.33.21.94.94,0,0,0,.76,0,1,1,0,0,0,.33-.21l4-4a1,1,0,0,0-1.42-1.42L13,12.59V3a1,1,0,0,0-2,0v9.59l-2.29-2.3a1,1,0,1,0-1.42,1.42Z'></path>
        </svg>
      </div>
    </div>
  )
}



export default PdfList;
