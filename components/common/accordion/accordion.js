//verified 1 by Raviraj Kumar
import React, { useState, useEffect, useRef } from "react";
import styles from "../../../styles/componentsstyling/accordion/accordion.module.css";
import { AiOutlineDown } from "react-icons/ai";
import Link from "next/link";

const Accordion = ({ title, desc, course }) => {
	const [toggle, setToggle] = useState(false);
	const [heightEl, setHeightEl] = useState();
  console.log(toggle)
	const refHeight = useRef();

	// useEffect(() => {
	//   // console.log(refHeight);
	//   setHeightEl(`${refHeight.current.scrollHeight}px`);
	// }, []);

	const toggleState = () => {
		setToggle(!toggle);
	};

	// console.log(toggle);
	return (
		<div className="my-4  border border-[#728095] rounded-xl bg-[#2D2E35] relative">
			<button
				onClick={toggleState}

				className="` border-[#2D2E35] w-full text-white cursor-pointer flex justify-between items-center px-6 py-6 text-left` "
			>
				<span className="text-left">{title}</span>
				<AiOutlineDown />
			</button>

			<p
				className={`${
					toggle ? "py-4 max-h-[500px]" : "max-h-0"
				}  px-4 rounded-xl w-full   z-20 bg-[#2D2E35] overflow-hidden duration-300`}
			>
        {desc}
				{/* <p aria-hidden={toggle ? "true" : "false"} className="rounded-b-xl ">
					{desc}
				</p> */}
			</p>
		</div>
	);
};

export default Accordion;
