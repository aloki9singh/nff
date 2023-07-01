
import SignComp from '@/components/common/homepage/signup/signup';
import React from 'react';

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
