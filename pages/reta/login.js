// Page not Provided in figma CSS need to be fixed
//Backend needed to be implemented with appwrite  
// it is admin login page 

import { useState } from 'react';
import NeatS from '/public/componentsgraphics/schools/login/neatskillslogosample.svg'
import Woman from '@/public/pagesgraphics/admin/login/Adminlogingraphic.png';
import { AiOutlineMail } from 'react-icons/ai';
import Image from 'next/image';
import { FaLock } from 'react-icons/fa';

function Adminlogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [authCode, setAuthCode] = useState('');

  function handleLogin(e) {
    e.preventDefault();
    console.log(email, password, authCode);
    //reset the form
    setEmail('');
    setPassword('');
    setAuthCode('');
  }
  return (
    <main className="mx-auto my-12 flex-1 flex flex-col md:flex-row justify-center items-center text-white gap-x-20 mb-0 md:mb-4">
      {/* left */}
      <div className="w-full md:w-1/2 md:pb-12 flex flex-col justify-center mt-16 md:mb-0">
        <Image src={NeatS} alt="Neat Skills" className="hidden md:block" />
        <div className="flex flex-col justify-center items-center">
          <Image src={Woman} alt="Women connecting laptop to server" />
          <p className="hidden md:block text-normal text-lg">
            Start learning the right away!
          </p>
        </div>
      </div>
      {/* right */}
      <div
        className="w-screen rounded-t-[60px] border-2 border-black md:border-0 md:rounded-none md:w-[593px] md:pt-24 h-[615px] md:h-[700px] flex flex-col items-center gap-y-4 md:gap-y-6 mb-0 md:px-0"
        style={{
          background: 'rgba(255, 255, 255, 0.02)',
          //background: 'green',
        }}
      >
        <Image src={NeatS} alt="Neat Skills" className="md:hidden sm:block" />
        <div className="w-screen flex flex-col justify-center text-center">
          <h1 className="text-2xl md:text-5xl text-left px-10 pt-8 md:text-center">
            Admin
          </h1>
          <p className="text-xl md:text-3xl text-left px-10 md:text-center">
            Login
          </p>
        </div>
        <hr
          className="hidden md:block w-3/4 h-0.5 border-none"
          style={{ background: 'rgba(255, 255, 255, 0.32)' }}
        />
        <form className="sm-w-full md:w-5/6 h-72 flex flex-col gap-y-4 py-2">
          <div
            className="w-96 h-14 px-4 flex justify-start items-center gap-x-4 text-white rounded-xl mb-4 mx-auto"
            style={{
              background:
                'linear-gradient(177.81deg, rgba(255, 255, 255, 0.11) 1.84%, rgba(255, 255, 255, 0) 123.81%)',
            }}
          >
            <AiOutlineMail color="green" />
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="border-none focus:outline-none bg-inherit placeholder:text-white"
            />
          </div>
          <div
            className="w-96 h-14 px-4 flex justify-start items-center gap-x-4  text-white rounded-xl mb-4 mx-auto"
            style={{
              background:
                'linear-gradient(177.81deg, rgba(255, 255, 255, 0.11) 1.84%, rgba(255, 255, 255, 0) 123.81%)',
            }}
          >
            <FaLock color="blue" />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="border-none focus:outline-none bg-inherit placeholder:text-white"
            />
          </div>
          <div
            className="w-96 h-14 px-4 flex justify-start items-center gap-x-4  text-white rounded-xl mx-auto"
            style={{
              background:
                'linear-gradient(177.81deg, rgba(255, 255, 255, 0.11) 1.84%, rgba(255, 255, 255, 0) 123.81%)',
            }}
          >
            <FaLock color="blue" />
            <input
              type="password"
              value={authCode}
              onChange={(e) => setAuthCode(e.target.value)}
              placeholder="Unique Auth Code"
              className="border-none focus:outline-none bg-inherit placeholder:text-white"
            />
          </div>
        </form>
        <p className="text-center mt-[-30px]">Forgot Password?</p>
        <button
          className="w-96 h-14 bg-[#E1348B] rounded-2xl"
          onClick={handleLogin}
        >
          Login
        </button>
        <p>{`Let's make some awesome changes`}</p>
      </div>
    </main>
  );
}

export default Adminlogin;
