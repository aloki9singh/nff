import { useState } from 'react';
import { AiOutlineEdit } from 'react-icons/ai';

function DailyTip() {
  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState("Learning that is spread out over time drastically increases knowledge retention.");

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleTextChange = (event) => {
    setText(event.target.value);
  };

  const handleSaveClick = () => {
    setIsEditing(false);
  };

  return (
    <div className="bg-[#373A41] rounded-[20px] mb-10 mt-[-20px] md:mt-0">
      <div className="md:h-80 h-60  rounded-2xl bg-[#373A41] text-white">
        <div className="mt-4 items-center">
          <h1 className="text-xl flex justify-between px-8 text-center pt-10 md:pb-10 pb-5">
            <p>Daily Tip</p>
            {isEditing ? (
              <button className="text-white" onClick={handleSaveClick}>
                Save
              </button>
            ) : (
              <button className="text-white" onClick={handleEditClick}>
                <AiOutlineEdit />
              </button>
            )}
          </h1>

        <div className='mx-5'>
        {isEditing ? (
            <textarea
              className="text-l  w-full  font-extralight text-center  py-5 bg-[#2E3036] rounded-[10px]  px-2   overflow-y-hidden md:h-40"
              value={text}
              onChange={handleTextChange}
            />
          ) : (
            <p className="text-l font-extralight text-center md:w-[250px] m-auto px-2   py-5 bg-[#2E3036] rounded-[10px] md:h-40 align-middle  overflow-scroll scrollbar-hide ">
              {text}
            </p>
          )}
        </div>

        </div>
      </div>
    </div>
  );
}

export default DailyTip;
