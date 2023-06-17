//verified 1 by Raviraj Kumar
import React, { useState, useEffect, useRef } from 'react';
import styles from '../../../styles/componentsstyling/accordion/accordion.module.css';
import { AiOutlineDown } from 'react-icons/ai';
import Link from 'next/link';

const Accordion = ({ title, desc, course }) => {
  const [toggle, setToggle] = useState(false);
  const [heightEl, setHeightEl] = useState();

  const refHeight = useRef();

  useEffect(() => {
    // console.log(refHeight);
    setHeightEl(`${refHeight.current.scrollHeight}px`);
  }, []);

  const toggleState = () => {
    setToggle(!toggle);
  };

  // console.log(toggle);
  return (
    <div className="my-4  border border-[#728095] rounded-xl">
      <button
        onClick={toggleState}
        className={
          toggle
            ? `${styles.accordionVisible} rounded-t-xl`
            : `${styles.accordionVisible} rounded-xl`
        }
      >
        <span>{title}</span>
        <AiOutlineDown />
      </button>

      <div
        className={
          toggle
            ? `${styles.accordionToggle} ${styles.animated}`
            : `${styles.accordionToggle} rounded-xl`
        }
        style={{ height: toggle ? `${heightEl}` : '0px' }}
        ref={refHeight}
      >
        <p aria-hidden={toggle ? 'true' : 'false'} className="rounded-b-xl">
          {desc}
        </p>
      </div>
    </div>
  );
};

export default accordion;
