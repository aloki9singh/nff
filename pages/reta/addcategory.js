import { useState } from 'react';
import Image from 'next/image';
import NeatS from '../public/Neatskills.svg';

const Createcategory = () => {
  const [category, setCategory] = useState('');

  function handleLogin(e) {
    e.preventDefault();
    console.log(category);
    //reset the form
    setCategory('');
  }
  return (
    <div className="w-screen h-screen flex ">
      <div
        className="w-3/4 h-3/4 m-auto rounded-2xl"
        style={{ background: 'rgba(255, 255, 255, 0.02)' }}
      >
        <Image src={NeatS} alt="Logo" />
        <div className="w-2/4 h-2/4 m-auto flex flex-col justify-center items-center text-center gap-y-6 text-white">
          <label htmlFor="category" className="text-3xl md:text-5xl">
            Create Category
          </label>
          <input
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            name="category"
            id="category"
            placeholder="Name a category"
            className="w-64 md:w-1/2 h-10 border-none focus:outline-none bg-inherit placeholder:text-white rounded-lg px-4 mb-4  md:mb-0"
            style={{
              background:
                'linear-gradient(178deg, rgba(255, 255, 255, 0.11) 1.69%, rgba(255, 255, 255, 0) 135.33%)',
            }}
          />
          <button
            className="w-64 md:w-1/2 h-10 bg-[#E1348B] rounded-lg"
            onClick={handleLogin}
          >
            Create
          </button>
        </div>
      </div>
    </div>
  );
};

export default Createcategory;
