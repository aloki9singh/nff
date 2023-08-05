
import Footer from "@/components/common/footer/footer";
import Dashboardnav from "@/components/common/navbar/dashboardnav";
import { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
import CourseoverviewSidebar from "@/components/common/sidebar/courseoverview";
import Link from "next/link";

export default function Terms() {
  const isMediumScreen = useMediaQuery({ minWidth: 768 });
  const isMobileScreen = useMediaQuery({ maxWidth: 767 });
  const [showSideBar, setShowSideBar] = useState(false);
  const [SideBarState, sendSideBarState] = useState(false);
  function toggleSideBar() {
    setShowSideBar(!showSideBar);
    sendSideBarState(showSideBar);
  }
  // console.log(showSideBar, SideBarState);

  useEffect(() => {
    if (isMediumScreen) {
      sendSideBarState(false);
    }
  }, [isMediumScreen]);
  return (
    <Layout pageTitle="Terms & Conditions">
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
        <div className="w-full h-full min-h-screen flex flex-col bg-[#2D2E35] space-y-4 pb-10">
          <Dashboardnav
            heading="Terms and conditions"
            toggleSideBar={toggleSideBar}
          />
          <div className="lg:mx-14 md:mx-10 max-w-[1440px] self-center  font-Inter py-5 px-[25px]">
            <h1 className="font-Inter font-semibold md:text-5xl text-2xl text-white text-center mb-2 md:mt-5">
              Terms & Conditions
            </h1>

            <h1 className="text-[#E1348B] font-semibold md:text-lg text-[9px] text-center">
              Last updated on 7 May 2023
            </h1>
            <div className="text-xs  md:text-lg text-white  font-Inter text-justify my-11">
              <p>
                Welcome to our skill development platform “neatskills.tech”.
                These terms and conditions {`("Terms")`} govern your use of our
                web-app and the services we offer. By accessing or using our
                web-app, you agree to be bound by these Terms. If you do not
                agree to these Terms, you may not use our web-app.
              </p>
            </div>
            <div className="space-y-[40px]">
              <div className="text-white  font-Inter text-justify">
                <h1 className="font-semibold md:text-[30px] text-xl mb-5">
                  1. Use of the Web-App
                </h1>
                <p className="text-xs  md:text-lg text-[#FFFFFF80] leading-[160%]">
                  1.1. Our skill development platform web-app is designed to
                  provide users with access to courses and other learning
                  resources to enhance their skills. You agree to use our
                  web-app only for lawful purposes and in accordance with these
                  Terms. You may not use our web app for any illegal or
                  unauthorized purpose or engage in any activity that violates
                  these Terms.
                </p>
                <p className="text-xs  md:text-lg text-[#FFFFFF80] leading-[160%]">
                  1.2. By using our web-app, you represent and warrant that you
                  have the legal capacity to enter into these Terms.
                </p>
                <p className="text-xs  md:text-lg text-[#FFFFFF80] leading-[160%]">
                  1.3. We reserve the right to modify, suspend, or discontinue
                  any part of our web-app at any time without prior notice or
                  liability.
                </p>
                <p className="text-xs  md:text-lg text-[#FFFFFF80] leading-[160%]">
                  1.4. You are solely responsible for obtaining and maintaining
                  any equipment or ancillary services necessary to access and
                  use our web-app, including without limitation, internet
                  access, hardware, software, and telecommunications equipment.
                </p>
              </div>
              <div className="text-white  font-Inter text-justify">
                <h1 className="font-semibold md:text-[30px] text-xl mb-5">
                  2. User Account
                </h1>
                <p className="text-xs  md:text-lg text-[#FFFFFF80] leading-[160%]">
                  2.1. To use certain features of our web app, you may need to
                  create a user account. When you create a user account, you
                  agree to provide accurate and complete information about
                  yourself. You are responsible for maintaining the
                  confidentiality of your account login credentials and for all
                  activities that occur under your account.
                </p>
                <p className="text-xs  md:text-lg text-[#FFFFFF80] leading-[160%]">
                  2.2. You agree to notify us immediately of any unauthorized
                  use of your account or any other breach of security. We will
                  not be liable for any loss or damage arising from your failure
                  to comply with this provision.
                </p>
                <p className="text-xs  md:text-lg text-[#FFFFFF80] leading-[160%]">
                  2.3. We reserve the right to terminate your account at any
                  time and for any reason, in our sole discretion, without
                  notice or liability.
                </p>
              </div>
              <div className="text-white  font-Inter text-justify">
                <h1 className="font-semibold md:text-[30px] text-xl mb-5">
                  3. Payment and Fees
                </h1>
                <p className="text-xs  md:text-lg text-[#FFFFFF80] leading-[160%]">
                  3.1. Certain features and services on our web app may require
                  payment of fees. By using these features and services, you
                  agree to pay all applicable fees and charges. All fees are
                  non-refundable unless otherwise stated.
                </p>
                <p className="text-xs  md:text-lg text-[#FFFFFF80] leading-[160%]">
                  3.2. You are solely responsible for all charges incurred under
                  your account, including but not limited to applicable taxes,
                  and you agree to pay such charges in accordance with the
                  billing terms in effect at the time the charge was incurred.
                </p>
                <p className="text-xs  md:text-lg text-[#FFFFFF80] leading-[160%]">
                  3.3. We reserve the right to modify our fees and billing
                  methods at any time, with or without notice. If you do not
                  agree to any such changes, your sole remedy is to terminate
                  your account.
                </p>
              </div>
              <div className="text-white  font-Inter text-justify">
                <h1 className="font-semibold md:text-[30px] text-xl mb-5">
                  4. Intellectual Property Rights
                </h1>
                <p className="text-xs  md:text-lg text-[#FFFFFF80] leading-[160%]">
                  4.1. Our web-app and its entire contents, features, and
                  functionality (including but not limited to all information,
                  software, text, displays, images, video, and audio) are owned
                  by us or our licensors and are protected by copyright,
                  trademark, and other intellectual property rights.
                </p>
                <p className="text-xs  md:text-lg text-[#FFFFFF80] leading-[160%]">
                  4.2. You acknowledge and agree that our web-app and its
                  contents are provided for your personal, non-commercial use
                  only. You may not copy, reproduce, distribute, transmit,
                  display, perform, modify, or create derivative works of any
                  portion of our web-app without our prior written consent.
                </p>
                <p className="text-xs  md:text-lg text-[#FFFFFF80] leading-[160%]">
                  4.3. You may not use any automated system or software to
                  extract data from our web app for commercial purposes (screen
                  scraping), nor may you attempt to interfere with the proper
                  working of our web-app.
                </p>
              </div>
              <div className="text-white  font-Inter text-justify">
                <h1 className="font-semibold md:text-[30px] text-xl mb-5">
                  5. User Content
                </h1>
                <p className="text-xs  md:text-lg text-[#FFFFFF80] leading-[160%]">
                  5.1. Our web app allows users to submit and share content,
                  including but not limited to course reviews and comments. By
                  submitting content, you grant us a non-exclusive,
                  transferable, sub-licensable, royalty-free, worldwide license
                  to use
                </p>
              </div>
              <div className="text-xs  md:text-lg text-white  font-Inter text-justify my-11">
							<p>
								If you have any questions or concerns about our Terms and Conditions, please contact our support team at{" "}
								<span className="font-semibold">
									<Link href="mailto:support@skilldevelopmentplatform.com">
										support@skilldevelopmentplatform.com
									</Link>
								</span>
								. We are always here to help.
							</p>
						</div>
            </div>
          </div>
        </div>
      </div>
      <Footer background="bg-[#2D2E35]" />
    </Layout>
  );
}
