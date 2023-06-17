
import React from 'react';
import SignComp from '../components/Student/SignComp';

import styles from '../styles/Auth/authMain.module.css';

function signup() {
  return (
    <div className={
      //styles.mainSignComp
      "w-screen h-screen bg-blu flex flex-col md:flex-row "
    }>
      <SignComp />
    </div>
  );
}

export default signup;
