//verifed by Shreyas Sahoo
import Sidebar from '../../common/sidebar/sidebar';
import Dashboardnav from '../../common/navbar/dashboardnav';
import BottomNav from '../../common/footer/bottomnav';
import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
// import dots from '../../public/under/dots.png';
import oval from '../../../public/componentsgraphics/common/underprogress/semicircle.svg';
import brown from '../../../public/componentsgraphics/common/underprogress/brownfilledcircle.svg';
import purple from '../../../public/componentsgraphics/common/underprogress/purplefilledcircle.svg';
import imac from '../../../public/componentsgraphics/common/underprogress/manstandingwithlaptop.svg';
import Link from 'next/link'; 
import { BsInstagram } from 'react-icons/bs';
import { FaFacebook, FaLinkedinIn, FaTwitter } from 'react-icons/fa';

export default function UnderProgress() {
  const [timerDays, setTimerDays] = useState('00');

  const [timerHours, setTimerHours] = useState('00');

  const [timerMinutes, setTimerMinutes] = useState('00');

  const [timerSeconds, setTimerSeconds] = useState('00');

  const [timer, setTimer] = useState([]);

  let interval = useRef();

  const startTimer = () => {
    const countdownDate = new Date('May 24, 2023 00:00:00').getTime();

    interval = setInterval(() => {
      const now = new Date().getTime();

      const distance = countdownDate - now;

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));

      const hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );

      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));

      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      if (distance < 0) {
        // stop timer
        clearInterval(interval.current);
      } else {
        // update timer
        setTimerDays(days);
        setTimerHours(hours);
        setTimerMinutes(minutes);
        setTimerSeconds(seconds);
      }
    }, 1000);
  };

  useEffect(() => {
    startTimer();
    const timerId = interval.current;
    return () => clearInterval(timerId);
  }, []);

  return (
    <div className="flex h-screen">
      <div className="lg:col-span-1 hidden lg:grid">
        <Sidebar />
      </div>
      <div className="w-full h-full flex flex-col bg-[#2D2E35] space-y-4">
        <Dashboardnav heading="" />
        <div className="text-white grow flex items-center justify-center h-fit">
          <div className="w-[90%] h-full flex md:bg-[#373A41] rounded-[30px]">
            <div className="flex justify-center flex-wrap gap-x-20 m-5 gap-y-10 h-fit">
              <div className="absolute lg:left-72 md:left-16 left-72 lg:top-36 md:top-44 top-[500px]">
                {/* <Image src={dots} alt="/" className="w-28 h-48" /> */}
              </div>
              <div className="absolute lg:left-[854px] md:left-[430px] left-[110px] lg:top-48 md:top-60 top-[545px]">
                <Image
                  src={brown}
                  alt="/"
                  className="lg:w-20 lg:h-20 md:w-16 md:h-16 w-10 h-10"
                />
              </div>
              <div className="absolute md:right-28 right-6 lg:top-[440px] md:top-[510px] top-[670px]">
                <Image
                  src={purple}
                  alt="/"
                  className="md:w-12 md:h-12 w-8 h-8"
                />
              </div>
              {/* quote and timer div */}
              <div className="">
                <div className="w-full lg:px-16 md:px-2 md:grid md:grid-cols-2 space-y-8 space-x-2 items-center lg:mt-24 md:mt-36">
                  <div className="flex flex-col justify-center space-y-8">
                    <h1 className="lg:text-4xl text-3xl font-semibold">
                      Our webpage is under construction
                    </h1>
                    <p className="font-semibold lg:text-base text-lg flex items-center ">
                      Unfortunately this page is down for a bit of maintenance
                      right now. But soon we will be up and the sun will shine
                      again
                    </p>
                  </div>
                  <div className="md:hidden flex justify-center items-center">
                    <Image src={imac} alt="/" className="mb-4" />
                  </div>
                  <div className="w-full h-full justify-center lg:items-end items-center flex">
                    <div className="md:w-[523px] md:h-40 w-65 h-20 flex space-x-4">
                      <div className="lg:w-24 lg:h-32 md:w-16 md:h-32 w-14 h-20 bg-[#E1348B] md:rounded-3xl rounded-xl flex flex-col justify-center items-center lg:space-y-4">
                        <p className="font-semibold lg:text-5xl md:text-3xl text-center">
                          {timerDays}
                        </p>
                        <p className="font-semibold lg:text-xl md:text-lg text-center">
                          Days
                        </p>
                      </div>
                      <div className="lg:w-24 lg:h-32 md:w-16 md:h-32 w-14 h-20 bg-[#E1348B] md:rounded-3xl rounded-xl flex flex-col justify-center items-center lg:space-y-4">
                        <p className="font-semibold lg:text-5xl md:text-3xl text-center">
                          {timerHours}
                        </p>
                        <p className="font-semibold lg:text-xl md:text-lg text-center">
                          Hours
                        </p>
                      </div>
                      <div className="lg:w-24 lg:h-32 md:w-16 md:h-32 w-14 h-20 bg-[#E1348B] md:rounded-3xl rounded-xl flex flex-col justify-center items-center lg:space-y-4">
                        <p className="font-semibold lg:text-5xl md:text-3xl text-center">
                          {timerMinutes}
                        </p>
                        <p className="font-semibold lg:text-xl md:text-lg text-center">
                          min
                        </p>
                      </div>
                      <div className="lg:w-24 lg:h-32 md:w-16 md:h-32 w-14 h-20 bg-[#E1348B] md:rounded-3xl rounded-xl flex flex-col justify-center items-center lg:space-y-4">
                        <p className="font-semibold lg:text-5xl md:text-3xl text-center">
                          {timerSeconds}
                        </p>
                        <p className="font-semibold lg:text-xl md:text-lg text-center">
                          sec
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="absolute lg:bottom-0 md:bottom-[104px] hidden md:flex bottom-[89px]">
                <Image
                  src={oval}
                  alt="/"
                  className="bg-cover bg-center lg:w-[960px] md:w-[600px] lg:h-36 md:h-40"
                />
                <div className="absolute inset-0 flex justify-center items-center z-10 text-white">
                  <div className="flex flex-col">
                    <div className="flex gap-4 lg:gap-10 justify-center font-semibold text-xl mt-4">
                      <Link href="">
                        <p className="py-4 hover:scale-110  text-sm md:text-base">
                          <BsInstagram className="md:w-6 md:h-6" />
                        </p>
                      </Link>
                      <Link href="">
                        <p className="py-4 hover:scale-110  text-sm md:text-base">
                          <FaTwitter className="md:w-6 md:h-6" />
                        </p>
                      </Link>
                      <Link href="">
                        <p className="py-4 hover:scale-110  text-sm md:text-base">
                          <FaLinkedinIn className="md:w-6 md:h-6" />
                        </p>
                      </Link>
                      <Link href="">
                        <p className="py-4 hover:scale-110  text-sm md:text-base">
                          <FaFacebook className="md:w-6 md:h-6" />
                        </p>
                      </Link>
                    </div>
                    <div className="">
                      <p className="font-semibold lg:text-lg hidden md:flex">
                        Provoke Developers - @2023 All Rights Reserved
                      </p>
                      <div className="md:hidden font-normal text-center text-sm mb-6">
                        <p>Provoke Developers</p>
                        <p>@2023 All Rights Reserved</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <BottomNav />
      </div>
    </div>
  );
}
