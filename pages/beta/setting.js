import { useEffect, useState } from "react";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { BsEnvelopeOpen } from "react-icons/bs";
import { MdOutlinePrivacyTip } from "react-icons/md";
import SubscriptionData from "@/components/student/subscription";
import Notification from "@/components/student/setting/notification";
import Privacy from "@/components/student/setting/privacy";
import Dashboardnav from "@/components/common/navbar/dashboardnav";
import CourseoverviewSidebar from "@/components/common/sidebar/courseoverview";
import { useRouter } from "next/router";
import { useMediaQuery } from "react-responsive";
import withStudentAuthorization from "@/lib/HOC/withStudentAuthorization";
import Layout from "@/components/common/Layout/Layout";

function Settings() {
  const router = useRouter();
  // hook for privacy state management 
  let [PrivacyState, setPrivacyState] = useState(false);
  //hook for subscription state
  let [SubscriptionState, setSubscriptionState] = useState(false);
  let [NotificationState, setNotificationState] = useState(true);

  //medium screen and navbar states 
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

  let NotificationFun = () => {
    setNotificationState(true);
    setSubscriptionState(false);
    setPrivacyState(false);
  };
  let SubscriptionFun = () => {
    setSubscriptionState(true);
    setNotificationState(false);
    setPrivacyState(false);
  };

  let PrivacyFun = () => {
    setPrivacyState(true);
    setNotificationState(false);
    setSubscriptionState(false);
  };
 
  
  return (
    <Layout pageTitle="Settings">
      <div className=" h-full text-base bg-black">
        <div className="flex overflow-y-hidden">
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
          {/* sidebar with a div of discord community must be added once made */}
          <div className="w-full h-screen mx-auto rounded-l-[40px] bg-[#2D2E35] col-span-6 md:col-span-5 lg:col-span-4 ">
            <Dashboardnav heading="Settings" toggleSideBar={toggleSideBar} />
            <hr className="hidden lg:block opacity-50" />
            <div className="flex my-auto p-2 md:p-4 mx-2 md:mx-8 mt-[7%]">
              <div className="md:grid md:grid-cols-6 my-5 md:w-full max-[860px]:my-2 self-start">
                {/* self-start only for sm */}
                <div className="w-full md:col-span-1 p-2 flex justify-between gap-x-3 md:block">
                  <div className="my-9 max-[485px]:my-0 hover:opacity-80 flex-1">
                    {NotificationState ? (
                      <div
                        className="mx-auto w-auto md:w-40 min-w-fit rounded-2xl py-2 text-white bg-gradient-to-r from-[#A145CD] to-[#E1348B] cursor-pointer md:px-8 md:py-4"
                        onClick={NotificationFun}
                      >
                        <div className=" flex justify-center text-4xl">
                          <BsEnvelopeOpen></BsEnvelopeOpen>
                        </div>
                        <div className="text-sm flex justify-center">
                          Notification
                        </div>
                      </div>
                    ) : (
                      <div
                        className="mx-auto w-auto min-w-fit md:w-40 rounded-2xl py-2  text-white bg-[#373a41] cursor-pointer md:px-8 md:py-4"
                        onClick={NotificationFun}
                      >
                        <div className=" flex justify-center text-4xl">
                          <BsEnvelopeOpen></BsEnvelopeOpen>
                        </div>
                        <div className="text-sm flex justify-center">
                          Notification
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="my-9 max-[485px]:my-0 hover:opacity-80 flex-1">
                    {SubscriptionState ? (
                      <div
                        className="mx-auto  w-auto md:w-40 min-w-fit rounded-2xl  py-2 text-white bg-gradient-to-r from-[#A145CD] to-[#E1348B] cursor-pointer md:px-8 md:py-4"
                        onClick={SubscriptionFun}
                      >
                        <div className="flex justify-center text-4xl">
                          <AiOutlineShoppingCart></AiOutlineShoppingCart>
                        </div>
                        <div className="text-sm flex justify-center">
                          Subscription
                        </div>
                      </div>
                    ) : (
                      <div
                        className="mx-auto w-auto min-w-fit md:w-40 rounded-2xl  py-2 text-white bg-[#373a41] cursor-pointer md:px-8 md:py-4"
                        onClick={SubscriptionFun}
                      >
                        <div className=" flex justify-center text-4xl">
                          <AiOutlineShoppingCart></AiOutlineShoppingCart>
                        </div>
                        <div className="text-sm flex justify-center">
                          Subscription
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="my-9 max-[485px]:my-0 hover:opacity-80 flex-1">
                    {PrivacyState ? (
                      <div
                        className="mx-auto  w-auto md:w-40 min-w-fit rounded-2xl  py-2 text-white bg-gradient-to-r from-[#A145CD] to-[#E1348B] cursor-pointer md:px-8 md:py-4"
                        onClick={PrivacyFun}
                      >
                        <div className=" flex justify-center text-4xl">
                          <MdOutlinePrivacyTip></MdOutlinePrivacyTip>
                        </div>
                        <div className="text-sm flex justify-center">
                          Privacy
                        </div>
                      </div>
                    ) : (
                      <div
                        className="mx-auto w-auto min-w-fit md:w-40 rounded-2xl  py-2 text-white bg-[#373a41] cursor-pointer md:px-8 md:py-4"
                        onClick={PrivacyFun}
                      >
                        <div className=" flex justify-center text-4xl">
                          <MdOutlinePrivacyTip></MdOutlinePrivacyTip>
                        </div>
                        <div className="text-sm flex justify-center">
                          Privacy
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                <div className="col-span-5  flex justify-center md:my-auto ">
                  <div className="w-[100%] md:w-[80%]">
                    {NotificationState ? <Notification></Notification> : <></>}
                    {SubscriptionState ? <SubscriptionData /> : <></>}
                    {PrivacyState ? <Privacy></Privacy> : <></>}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

// export default (Settings);
export default withStudentAuthorization(Settings);
