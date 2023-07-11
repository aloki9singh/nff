import NavbarSecond from '@/components/common/navbar/navbar2';
import Sidebar from '@/components/common/sidebar/sidebar';
import Image from 'next/image';
import { useState } from 'react';
import { contactFn } from '@/lib/api';
import { Carousel } from 'react-responsive-carousel';
import Team1 from '@/public/componentsgraphics/common/aboutpage/team1.png';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import Footer from '@/components/common/footer/footer';
import CarouselComp from '@/components/common/carousel/carousel';

const Aboutus = () => {
  const [query, setQuery] = useState('');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [phoneNo, setPhoneNo] = useState('');
  const formData = { query, email, name, phoneNo };

  const breakPoints = [
    { width: 1, itemsToShow: 1 },
    { width: 550, itemsToShow: 2 },
    { width: 768, itemsToShow: 3 },
    { width: 1200, itemsToShow: 4 }
  ];

  const mentors = [
    {
      id: 1,
      name: 'Preeti Pathak',
      designation: 'team player 1'
    },
    {
      id: 2,
      name: 'Preeti Pathak',
      designation: 'team player 2'
    },
    {
      id: 3,
      name: 'Preeti Pathak',
      designation: 'team player 3'
    },
    {
      id: 4,
      name: 'Preeti Pathak',
      designation: 'team player 4'
    }
  ];

  return (
    <>
      <NavbarSecond buttonVis='hidden' title='About Us' />
      <div className='h-full'>
        <div className='w-full h-full flex flex-col overflow-auto'>
          <div className='flex justify-center items-center flex-col'>
            <span className='text-white text-4xl mt-14'>we&apos;re here to</span>
            <span className='text-[#E1348B] text-4xl mt-5 text-center decoration-white ml-5'>
              guarantee your success
            </span>
          </div>

          {/* Info first part */}
          <div className='w-[80%]  h-64'>
            <div className='w-full h-[70%] ml-10 md:ml-44 mt-11 p-5 rounded-md bg-[#E1348B] flex items-center text-center text-white font-semibold overflow-auto'>
              <span className='text-sm md:text-sm lg:text-2xl'>
                ConsultUs provides consulting services that help business owners
                and leaders build a more valuable business. We worked with their
                founder to build a professional, modern site that follows the
                StoryBrand framework to clearly communicate the value it adds to
                potential clients
              </span>
            </div>
            <div className='w-[75%] bg-white mx-auto mt-5 md:ml-80'>
              {/* IMAGE SHOULD BE HERE */}
            </div>
          </div>

          {/* Our mission */}
          <div className='w-[80%] h-auto mt-20 ml-10 md:ml-44 mb-10'>
            <span className='text-lg ml-4 text-white'>Our</span>
            <span className='text-lg ml-2 text-[#E1348B]'>mission</span>
            <div className='w-64 h-1 bg-white mt-2 ml-4' />

            <div className='flex flex-col md:flex-row p-4'>
              <div className='text-white mb-4 md:mb-0 md:mr-8'>
                unmatched service
              </div>
              <div className='text-white'>
                Support corporate clients and financial investors with their
                growth strategy and international development.
              </div>
            </div>

            <div className='flex flex-col md:flex-row p-4'>
              <div className='text-white mb-4 md:mb-0 md:mr-8'>Specific</div>
              <div className='text-white'>
                ConsultUs core expertise lies in the ability to support our
                clients in understanding, analysing and executing commercial and
                investment strategies in specific markets.
              </div>
            </div>

            <div className='flex flex-col md:flex-row p-4'>
              <div className='text-white mb-4 md:mb-0 md:mr-8'>Experience</div>
              <div className='text-white'>
                Experience in working with and assisting a wide range of clients
                from international corporations to small/medium-sized
                businesses, from large corporate debt providers to mid-market
                private equity investors.
              </div>
            </div>

            <div className='flex flex-col md:flex-row p-4'>
              <div className='text-white mb-4 md:mb-0 md:mr-8'>Technology</div>
              <div className='text-white'>
                The best combination of technology and people.
              </div>
            </div>
          </div>

          {/* Our mission */}
          <div className='w-[80%] h-auto mt-10 ml-10 md:ml-44 mb-10'>
            <span className='text-lg ml-4 text-white'>Our</span>
            <span className='text-lg ml-2 text-[#E1348B]'>Commitment</span>
            <div className='w-64 h-1 bg-white mt-2 ml-4' />

            <div className='flex flex-col md:flex-row p-4'>
              <div className='text-white mb-4 md:mb-0 md:mr-8'>Ethics</div>
              <div className='text-white'>
                Ethics for ConsultUs means ensuring our customers the
                confidentiality and uniqueness of the service they are provided.
                A client must be reassured by the fact that the service provided
                to them is made-to-measure and will not be recycled for their
                competitors.
              </div>
            </div>

            <div className='flex flex-col md:flex-row p-4'>
              <div className='text-white mb-4 md:mb-0 md:mr-8'>Quality</div>
              <div className='text-white'>
                ConsultUs is committed to ensuring that our advice and
                recommendations are based on the best combination of methods,
                information research, creativity and internal quality assurance.
              </div>
            </div>

            <div className='flex flex-col md:flex-row p-4'>
              <div className='text-white mb-4 md:mb-0 md:mr-8'>Continuity</div>
              <div className='text-white'>
                ConsultUs considers that the continuity of relations on the long
                term with its clients is the guarantee of the satisfaction of
                these and the quality of the services provided.
              </div>
            </div>
          </div>

          {/* ourteam section */}
          {/* Our Team */}
          <div className='w-[80%] mt-10 ml-10 md:ml-44 mb-10'>
            <div className='flex justify-center items-center'></div>
            <div className='w-[90%] rounded-2xl px-5 py-9 md:pt-[110px] md:pb-[129px] max-w-[1440px]'>
              <div className='flex flex-col md:flex-row justify-center items-center'>
                <div className="text-2xl md:text-3xl flex flex-col items-center bg-[url('/pink_rect.png')] bg-bottom bg-contain bg-no-repeat">
                  <h1>Meet Our</h1>
                  <h1>team</h1>
                  <div className='bg-[#DA2C84] transform -rotate-2 w-full origin-bottom-right h-1 mt-[-10px] ml-[10px]'></div>
                </div>
                <div className='text-sm md:text-base md:w-1/2 pt-4 px-4 md:pl-8'>
                  Neat Skills offers the world&apos;s best classes from the world&apos;s
                  best practitioners. It&apos;s like having a mentor at your
                  fingertips - no matter where you are
                </div>
              </div>
              <div>
                <div className='flex items-center justify-center mt-10 p-2'>
                  <CarouselComp />
                </div>
              </div>
            </div>
          </div>

          <div className='w-[80%] h-auto ml-10 md:ml-44'>
            <section className=''>
              <div className='py-8 lg:py-16 px-4 mx-auto max-w-screen-md'>
                <h2 className='mb-4 text-4xl tracking-tight font-extrabold text-center text-[#E1348B]'>
                  Contact Us
                </h2>
                <p className='mb-8 lg:mb-16 font-light text-center text-gray-500 dark:text-gray-400 sm:text-xl'>
                  We’d love to hear from you. Please fill out this form.
                </p>
                <form action='#' className='space-y-8'>
                  <div>
                    <label
                      htmlFor='email'
                      className='block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300'>
                      Name
                    </label>
                    <input
                      type='email'
                      id='email'
                      className='shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light'
                      placeholder='name@flowbite.com'
                      required
                    />
                  </div>
                  <div>
                    <label
                      htmlFor='subject'
                      className='block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300'>
                      Email
                    </label>
                    <input
                      type='text'
                      id='subject'
                      className='block p-3 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 shadow-sm focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light'
                      placeholder='Let us know how we can help you'
                      required
                    />
                  </div>

                  <div>
                    <label
                      htmlFor='subject'
                      className='block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300'>
                      Phone
                    </label>
                    <input
                      type='text'
                      id='subject'
                      className='block p-3 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 shadow-sm focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light'
                      placeholder='Let us know how we can help you'
                      required
                    />
                  </div>

                  <div>
                    <label
                      htmlFor='subject'
                      className='block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300'>
                      Title
                    </label>
                    <input
                      type='text'
                      id='subject'
                      className='block p-3 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 shadow-sm focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light'
                      placeholder='Let us know how we can help you'
                      required
                    />
                  </div>

                  <div>
                    <label
                      htmlFor='subject'
                      className='block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300'>
                      Subject
                    </label>
                    <input
                      type='text'
                      id='subject'
                      className='block p-3 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 shadow-sm focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light'
                      placeholder='Let us know how we can help you'
                      required
                    />
                  </div>

                  <div className='flex justify-center items-center'>
                    <button
                      type='submit'
                      className='py-3 px-5  text-sm font-medium text-center bg-[#E1348B] text-white rounded-lg sm:w-fit hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800'>
                      Submit
                    </button>
                  </div>
                </form>
              </div>
            </section>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Aboutus;
