////main body CSS and nav bar needed to be fixed with responsiveness
//bottom nav is missing

import { useState, useEffect } from "react";
import Dashboardnav from "@/components/common/navbar/dashboardnav";
import Footer from "@/components/common/footer/footer";
import Link from "next/link";
import CourseoverviewSidebar from "@/components/common/sidebar/courseoverview";
import { useMediaQuery } from "react-responsive";
import Layout from "@/components/common/Layout/Layout";


export default function Privacy() {
  const isMediumScreen = useMediaQuery({ minWidth: 768 });
  const isMobileScreen = useMediaQuery({ maxWidth: 767 });
  const [showSideBar, setShowSideBar] = useState(false);
  const [SideBarState, sendSideBarState] = useState(false);
  useEffect(() => {
    if (isMediumScreen) {
      sendSideBarState(false);
    }
  }, [isMediumScreen]);
  function toggleSideBar() {
    setShowSideBar(!showSideBar);
    sendSideBarState(showSideBar);
  }
  return (
    <Layout pageTitle="Privacy Policy">
      <div className="flex">
      {isMobileScreen && (
            <div
              className={`fixed right-0 ${
                SideBarState ? "block" : "hidden"
              } w-[281px] h-screen bg-[#25262C]  rounded-l-[40px] z-10`}
            >
              <CourseoverviewSidebar toggleSideBar={toggleSideBar} />
            </div>
          )}

          {/* Second Sidebar - Visible on Desktop */}
          {!isMobileScreen && (
            <div className={`md:block  hidden w-[221px] bg-[#141518] z-10`}>
              <CourseoverviewSidebar toggleSideBar={toggleSideBar} />
            </div>
          )}
        <div className="w-full h-full flex flex-col bg-[#2D2E35] space-y-4 max-[768px]:rounded-none ">
          <Dashboardnav heading="Privacy Policy" toggleSideBar={toggleSideBar}/>
          <div className=" justify-start items-center text-center text-white pt-10">
            <h1 className="text-center w-full font-semibold text-5xl max-[565px]:text-4xl">
              Privacy Policy
            </h1>
            <h1 className="text-[#E1348B] text-center w-full font-semibold text-lg mt-4 max-[565px]:text-sm">
              Last updated on 7th of May 2023
            </h1>
          </div>
          <div className="mx-24 max-[1140px]:mx-6 pb-10">
            <div className="md:m-6 m-3 text-white space-y-4">
              <p className="text-[#FFFFFFCC]">
                This Privacy Policy {`("Policy")`} governs the manner in which we
                collect, use, and disclose personal information on our skill
                development platform web-app “neatskills.tech” . This Policy is a
                legally binding agreement between you and us. By using our
                Platform, you agree to the collection, use, and disclosure of
                information in accordance with this Policy.
              </p>
            </div>
            <div className="md:m-6 m-3 text-white space-y-4">
              <h1 className="font-semibold md:text-2xl text-xl">
                Collection of Information
              </h1>
              <p className="text-[#FFFFFFCC]">
                We may collect personal information when you sign up for an
                account on our Platform, use our services, or communicate with us.
                The personal information we collect may include your name, email
                address, location, and any other information you provide to us. We
                may also collect non-personal information, such as your browser
                type and operating system, to improve our Platform and better
                understand our {`users'`} needs.
              </p>
            </div>
            <div className="md:m-6 m-3 text-white space-y-4">
              <h1 className="font-semibold md:text-2xl text-xl">
                Use of Information
              </h1>
              <p></p>
            </div>
            <div className="md:m-6 m-3 text-white space-y-4">
              <h1 className="font-semibold md:text-2xl text-xl"></h1>
              <p className="text-[#FFFFFFCC]">
                We may use your personal information to provide and improve our
                services, personalize your experience, and communicate with you.
                We may also use non-personal information to improve our Platform
                and better understand our {`users'`} needs.
              </p>
              <p className="text-[#FFFFFFCC]">
                We may use cookies and other tracking technologies to collect
                information about your activities on our Platform and to
                personalize your experience. You can disable cookies in your
                browser settings, but this may limit your ability to use certain
                features of our Platform.
              </p>
            </div>
            <div className="md:m-6 m-3 text-white space-y-4">
              <h1 className="font-semibold md:text-2xl text-xl">
                Disclosure of Information
              </h1>
              <p className="text-[#FFFFFFCC]">
                We may disclose your personal information to third-party service
                providers who help us operate our Platform and provide services to
                you. These service providers are contractually obligated to
                maintain the confidentiality of your information and are
                prohibited from using it for any other purpose.
              </p>
              <p className="text-[#FFFFFFCC]">
                We may also disclose your personal information if required by law
                or in connection with a legal proceeding.
              </p>
              <p className="text-[#FFFFFFCC]">
                We may disclose aggregated and de-identified information that does
                not identify you to third parties for any purpose, including
                marketing and advertising.
              </p>
            </div>
            <div className="md:m-6 m-3 text-white space-y-4">
              <h1 className="font-semibold md:text-2xl text-xl">Security</h1>
              <p className="text-[#FFFFFFCC]">
                We take reasonable measures to protect your personal information
                from unauthorized access, use, or disclosure. We use
                industry-standard security technologies and procedures to protect
                your personal information. However, no security system is perfect,
                and we cannot guarantee the security of your information.
              </p>
            </div>
            <div className="md:m-6 m-3 text-white space-y-4">
              <h1 className="font-semibold md:text-2xl text-xl">
                {`Children's`} Privacy
              </h1>
              <p className="text-[#FFFFFFCC]">
                Our Platform is not intended for use by children under the age of
                13 without parental/guardian guidance. We do not knowingly collect
                personal information from children under the age of 13. If we
                become aware that we have collected personal information from a
                child under the age of 13, we will take steps to delete it as soon
                as possible.
              </p>
            </div>
            <div className="md:m-6 m-3 text-white space-y-4">
              <h1 className="font-semibold md:text-2xl text-xl">
                Retention of Information
              </h1>
              <p className="text-[#FFFFFFCC]">
                We retain your personal information for as long as necessary to
                provide you with our services and to comply with our legal
                obligations. We may also retain your personal information to
                resolve disputes, enforce our agreements, and for other legitimate
                business purposes.
              </p>
            </div>
            <div className="md:m-6 m-3 text-white space-y-4">
              <h1 className="font-semibold md:text-2xl text-xl">Your Rights</h1>
              <p className="text-[#FFFFFFCC]">
                You have the right to access, rectify, or delete your personal
                information that we hold. You also have the right to object to or
                restrict our processing of your personal information. To exercise
                these rights, please contact us at [insert contact information].
              </p>
            </div>
            <div className="md:m-6 m-3 text-white space-y-4">
              <h1 className="font-semibold md:text-2xl text-xl">
                Marketing Communications
              </h1>
              <p className="text-[#FFFFFFCC]">
                We may send you marketing communications about our products and
                services. You can opt-out of receiving these communications by
                following the unsubscribe instructions in the communication or by
                contacting us at &nbsp;
                <span className="font-semibold">
                  <Link href="mailto:support@neatskills.tech">
                    support@neatskills.tech
                  </Link>
                </span>
                .
              </p>
            </div>
            <div className="md:m-6 m-3 text-white space-y-4">
              <h1 className="font-semibold md:text-2xl text-xl">
                Changes to this Policy
              </h1>
              <p className="text-[#FFFFFFCC]">
                We may update this Policy from time to time. We will notify you of
                any changes by posting the new policy on our Platform. You are
                advised to review this Policy periodically for any changes.
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer background="bg-[#2D2E35]" />
    </Layout>
  );
}
