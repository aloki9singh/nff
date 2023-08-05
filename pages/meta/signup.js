// TODO: Signup and login neded to be seperated, was unavailable in FIGMA seperately

import Layout from "@/components/common/Layout/Layout";
import MentorSignupcomp from "@/components/mentor/signup/signup";
import React from "react";

function Signup() {
	return (
		<Layout pageTitle="Signup/Login">
			<MentorSignupcomp />
		</Layout>
	);
}

export default Signup;
