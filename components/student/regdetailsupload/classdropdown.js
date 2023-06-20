// Verified by Satyabrat Ojha

import React, { useState } from "react";
export let optionSelected = "";
const ClassDropdown = ({ title }) => {
  const [selectedOption, setSelectedOption] = useState(0);
  const options = ["8", "9", "10", "11", "12"];
  const [isOpen, setIsOpen] = useState(false);
  const toggling = () => setIsOpen(!isOpen);

  const onOptionClicked = (value) => () => {
    setSelectedOption(value);
    setIsOpen(false);
  };
  optionSelected = selectedOption;
  return (
    <>
      <div className="inline-flex">
        <div className="relative inline-flex  rounded-md border bg-[#414348]">
          <a
            href="javascript:void(0)"
            onClick={toggling}
            className="w-[100%] rounded-l-md px-4 py-2 text-sm text-gray-600 no-underline hover:bg-gray-50 hover:text-gray-700"
          >
            {selectedOption || `${title}`}
          </a>
          <div className="relative">
            <button
              type="button"
              // eslint-disable-next-line react/jsx-no-duplicate-props
              className={`button-${isOpen ? "danger" : "success"}
               hover:text-gray-700' inline-flex h-full items-center justify-center rounded-r-md  border-gray-100 px-2 text-gray-600 hover:bg-gray-50`}
              onClick={toggling}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={(isOpen ? "content show" : "content", "h-4 w-4")}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
          </div>
          {isOpen && (
            <div className="absolute top-6 right-0 z-10 mt-4 min-w-[200px] origin-top-right rounded-md border border-gray-100 bg-[#2E3036] shadow-lg">
              {options.map((option, i) => (
                <div key={i}>
                  <a
                    href="javascript:void(0)"
                    onClick={onOptionClicked(option)}
                    key={Math.random()}
                    className="block rounded-lg px-4 py-2 text-sm  text-gray-200 no-underline hover:bg-gray-50 hover:text-gray-700"
                  >
                    {option}
                  </a>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ClassDropdown;
