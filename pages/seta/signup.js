//verifedS by Shreyas Sahoo
import React from 'react';
import SchoolSignupComp from '@/components/school/signup/signup';


function SchoolSignup() {
    return (
        <div className={
            "w-screen h-screen bg-blu flex flex-col md:flex-row "
        }>
            <SchoolSignupComp />
        </div>
    );
}

export default SchoolSignup;
