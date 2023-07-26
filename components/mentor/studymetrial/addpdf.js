import MentorSidebar from '@/components/common/sidebar/mentor';
import MentorTopbar from '@/components/common/navbar/mentortopbar';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import Video from '@/components/mentor/studymetrial/videos';
import ShareLink from '@/components/mentor/studymetrial/shareLink';
import Pdf from '@/components/mentor/studymetrial/pdf';

function MetrialInfo() {
  const router = useRouter();
  const isMediumScreen = useMediaQuery({ minWidth: 768 });
  const isMobileScreen = useMediaQuery({ maxWidth: 767 });
  const [showSideBar, setShowSideBar] = useState(false);
  const [SideBarState, sendSideBarState] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);

  function toggleSideBar() {
    setShowSideBar(!showSideBar);
    sendSideBarState(showSideBar);
  }
  useEffect(() => {
    if (isMediumScreen) {
      sendSideBarState(false);
    }
    // const unsubscribe = onAuthStateChanged(auth, async (user) => {
    //   if (user) {
    //     user.emailVerified = true;
    //     const value = await callUserById(user.uid);
    //     setVerified(value.user.verified);
    //   }
    // });

    // return () => unsubscribe(); // Cleanup the listener
  }, [isMediumScreen]);

  const { query } = router;

  useEffect(() => {
    const { selectedCard } = query;
    if (selectedCard) {
      setSelectedCard(decodeURIComponent(selectedCard));
    }
  }, [query]);

  const [selectedModule, setSelectedModule] = useState('Module 1');
  const [fileName, setFileName] = useState('File Name: Module 1');

  const handleModuleChange = event => {
    const selectedValue = event.target.value;
    setSelectedModule(selectedValue);
    setFileName(`File Name: ${selectedValue}`);
  };

  return (
    <div className='w-full  flex flex-col'>
      <div className='flex items-center p-10'>
        <div className='mr-3'>File Name:</div>
        <input
          type='text'
          className='border rounded px-2 py-1 bg-inherit'
          // Add any additional props or event handlers to the input as needed
        />
      </div>

      <div className='flex items-center  p-10 '>
        <div className='mr-3'>
          <label htmlFor='moduleSelect'>Select Module:</label>
          <select
            id='moduleSelect'
            className='border rounded  ml-2 px-2 py-1 bg-inherit text-white '
            value={selectedModule}
            onChange={handleModuleChange}>
            <option value='Module 1' className=' bg-inherit'>
              Module 1
            </option>
            <option value='Module 2' className=' bg-inherit'>
              Module 2
            </option>
            <option value='Module 3' className=' bg-inherit'>
              Module 3
            </option>
            {/* Add more modules as needed */}
          </select>
        </div>
      </div>

      <div className=' w-full flex items-center  ml-48 mt-10'>
        <div className=' w-[70%]  h-48 flex items-center border-2 p-10 border-[#5F6065] rounded-lg'>
          <div className=' border-2 border-white w-full h-full border-dashed flex items-center justify-center '>
            upload pdf
          </div>
        </div>
      </div>

      <div className='w-full flex flex-row-reverse '>
        <button className=' mt-12 w-[10%] h-10  mr-10 bg-[#AA2769]'>
          Add Pdf
        </button>
      </div>
    </div>
  );
}

export default MetrialInfo;
