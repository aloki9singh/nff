//verifedS by Shreyas Sahoo
import React from 'react';
import SchoolSignupComp from '@/components/school/signup/signup';
import Layout from '@/components/common/Layout/Layout';


function SchoolSignup() {
    return (
        <Layout pageTitle="Signup">
        <div className={
            "w-screen h-screen bg-blu flex flex-col md:flex-row "
        }>
            <SchoolSignupComp />
        </div>
        </Layout>
    );
}

export default SchoolSignup;
