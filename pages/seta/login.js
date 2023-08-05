//verifedS by Shreyas Sahoo
import React from 'react';
import SchoolLoginComp from '@/components/school/login/login';
import Layout from '@/components/common/Layout/Layout';

function SchoolLogin() {
    return (
        <Layout pageTitle="Login">
        <div className={
            "w-screen h-screen bg-blu flex flex-col md:flex-row "
        }>
            <SchoolLoginComp />
        </div>
        </Layout>
    );
}

export default SchoolLogin;
