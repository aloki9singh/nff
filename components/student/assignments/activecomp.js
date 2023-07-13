import React from 'react';

import MyCourses from '../courses/mycourses';
import HomeworkProgress from './progress';

const ActiveComp = () => {
  return (
    <div className=" h-full">
      <div>
        <MyCourses />
      </div>
      <HomeworkProgress />
    </div>
  );
};

export default ActiveComp;
