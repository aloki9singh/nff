import { useRouter } from 'next/router';

const UploadCard = ({
  title,
  desc,
  level,
  sessions,
  language,
  category,
  banner
}) => {
  const router = useRouter();
  return (
    <div
      className='shrink-0 rounded-2xl border-2  justify-center border-white border-dashed shadow-lg bg-[#505057] py-[10px] px-[12px] h-[250px] md:h-[17rem] mx-2 ml-0    md:p-5 flex flex-col '
      onClick={() => {
        window.location.href = 'addassigment';
      }}>
      <div className='flex flex-col items-center justify-center space-y-4'>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          viewBox='0 0 24 24'
          fill='none'
          stroke='white'
          strokeWidth='2'
          strokeLinecap='round'
          strokeLinejoin='round'
          className='feather feather-folder w-12 h-12'>
          <path d='M22 11V6c0-1.1-.9-2-2-2H4C2.9 4 2 4.9 2 6v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2v-5' />
          <rect x='2' y='2' width='20' height='8' rx='2' ry='2' />
        </svg>
        <h2 className='text-white font-medium text-xl'>Assignment</h2>
      </div>
    </div>
  );
};

export default UploadCard;
