import CourseoverviewSidebar from "@/components/common/sidebar/courseoverview";
import Footer from "@/components/common/footer/footer";
import Dashboardnav from "@/components/common/navbar/dashboardnav";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useMediaQuery } from "react-responsive";

export default function Terms() {
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
		<div>
			<div className="flex">
				{isMobileScreen && (
					<div
						className={`fixed right-0 ${SideBarState ? "block" : "hidden"
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
					<Dashboardnav heading="Return and refund policy" toggleSideBar={toggleSideBar} />
					<div className="lg:mx-14 md:mx-10 max-w-[1440px] self-center  font-Inter py-5 px-[25px]">
						<h1 className="font-Inter font-semibold md:text-5xl text-2xl text-white text-center mb-2">
							Return & refund policy
						</h1>

						<h1 className="text-[#E1348B] font-semibold md:text-lg text-[9px] text-center">
							Last updated on 7 May 2023
						</h1>
						<div className="text-xs  md:text-lg text-white  font-Inter text-justify my-11">
							<p>
								Thank you for choosing our skill development platform web-app
								“neatskills.tech”. We understand that sometimes circumstances
								change and you may wish to cancel your subscription, request a
								refund or return our services. We want to ensure that our Refund
								and Return Policy is clear, transparent and in compliance with
								applicable laws.
							</p>
						</div>
						<div className="space-y-[40px]">
							<div className="text-white  font-Inter text-justify">
								<h1 className="font-semibold md:text-[30px] text-xl mb-5">
									1. Refund Policy:
								</h1>
								<p className="text-xs  md:text-lg text-[#FFFFFF80] leading-[160%]">
									We offer a 30-day money-back guarantee for all of our
									subscriptions. If you are not satisfied with our service, you
									may request a refund within 30 days of your purchase. To
									initiate a refund, please contact our support team at &nbsp;
									<span className="font-semibold">
										<Link href="mailto:support@neatskills.tech">
											support@neatskills.tech
										</Link>
									</span>
									. Our support team will process your refund request within 5
									business days. Please note that refunds will be issued to the
									original payment method.
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
									2. Exceptions:
								</h1>
								<p className="text-xs  md:text-lg text-[#FFFFFF80] leading-[160%]">
									We reserve the right to refuse refunds or returns for any
									reason at our discretion. Refunds may be denied if you have
									violated our Terms of Service or if your refund request is
									fraudulent or made in bad faith. We do not offer refunds for
									promotional discounts, bundle purchases, or any other special
									offers that may be in effect from time to time. Additionally,
									we do not offer refunds or returns for any services rendered
									during a trial or free period.
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
									3. Cancellation Policy:
								</h1>
								<p className="text-xs  md:text-lg text-[#FFFFFF80] leading-[160%]">
									You may cancel your subscription at any time. If you choose to
									cancel, your subscription will remain active until the end of
									your current billing period. No refunds will be issued for any
									unused portion of your subscription.
								</p>
							</div>
							<div className="text-white  font-Inter text-justify">
								<h1 className="font-semibold md:text-[30px] text-xl mb-5">
									4. Legal Disclaimers:
								</h1>
								<p className="text-xs  md:text-lg text-[#FFFFFF80] leading-[160%]">
									We make no warranties, express or implied, with respect to our
									services, including but not limited to any implied warranties
									of merchantability or fitness for a particular purpose. In no
									event shall we be liable for any damages arising out of or in
									connection with the use or inability to use our services.
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
									5. Changes to Policy:
								</h1>
								<p className="text-xs  md:text-lg text-[#FFFFFF80] leading-[160%]">
									We reserve the right to update or change our Refund and Return
									Policy at any time. We will notify you of any changes by
									posting the new policy on our website. It is your
									responsibility to review this policy periodically for any
									changes.
								</p>
							</div>
						</div>
						<div className="text-xs  md:text-lg text-white  font-Inter text-justify my-11">
							<p>If you have any questions or concerns about our Refund and Return
								Policy, please contact our support team at {" "}
								<span className="font-semibold">
									<Link href="mailto:support@skilldevelopmentplatform.com">
										support@skilldevelopmentplatform.com
									</Link>
								</span>
								. We are always here to help.</p>
						</div>
					</div>
				</div>
			</div>
			<Footer background="bg-[#2D2E35]" />
		</div>
	);
}
