import React from 'react';
import SchoolLoginComp from '../components/School/schLoginComp';

function schoolLogin() {
    return (
        <div className={
            "w-screen h-screen bg-blu flex flex-col md:flex-row "
        }>
            <SchoolLoginComp />
        </div>
    );
}

export default schoolLogin;
