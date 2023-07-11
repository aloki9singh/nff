import { useEffect, useState } from "react";
import { MdOutlinePersonOutline } from "react-icons/md";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { BsEnvelopeOpen } from "react-icons/bs";
import Profile from "@/components/student/setting/profile";
import { MdOutlinePrivacyTip } from "react-icons/md";
// import Subscription from "../components/settingspart/subscription";
import Notification from "@/components/student/setting/notification";
import Privacy from "@/components/student/setting/privacy";
import MentorSidebar from "@/components/common/sidebar/mentor";
import MentorTopbar from "@/components/common/navbar/mentortopbar";
import { useRouter } from "next/router";
import { useMediaQuery } from "@/hooks/mediaquery";

function Settings() {
  const router = useRouter();
  let [SubscriptionState, setSubscriptionState] = useState(false);
  let [NotificationState, setNotificationState] = useState(true);
  const isMediumScreen = useMediaQuery({ minWidth: 768 });
  const isMobileScreen = useMediaQuery({ maxWidth: 767 });
  const [showSideBar, setShowSideBar] = useState(false);
  const [SideBarState, sendSideBarState] = useState(false);

  function toggleSideBar() {
    setShowSideBar(!showSideBar);
    sendSideBarState(showSideBar);
  }
  useEffect(() => {
    if (isMediumScreen) {
      sendSideBarState(false);
    }
  }, [isMediumScreen]);

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

  let [PrivacyState, setPrivacyState] = useState(false);
  let PrivacyFun = () => {
    setPrivacyState(true);
    setNotificationState(false);
    setSubscriptionState(false);
  };
  return (
    <>
      <div className="h-full text-base bg-[#2E3036] ">
        <div className="flex">
          {/* First Sidebar - Visible on Mobile */}
          {isMobileScreen && (
            <div
              className={`fixed right-0 ${
                SideBarState ? "block" : "hidden"
              } w-[281px] h-screen bg-[#25262C]  rounded-l-[40px] `}
            >
              <MentorSidebar toggleSideBar={toggleSideBar} />
            </div>
          )}

          {/* Second Sidebar - Visible on Desktop */}
          {!isMobileScreen && (
            <div className={`md:block hidden w-[221px] bg-[#141518]`}>
              <MentorSidebar toggleSideBar={toggleSideBar} />
            </div>
          )}

          <div className="flex-grow">
            <div className="flex justify-between md:bg-[#2E3036] bg-[#141518] top-0 md:border-b-[1px] border-b-[2px] border-[#717378]">
              <MentorTopbar heading="Settings" toggleSideBar={toggleSideBar} />
            </div>

            <div className="flex min-h-screen rounded-2xl p-2  md:p-4 mx-2 md:mx-4 justify-between">
              <div className="md:grid  md:grid-cols-6 md:w-full self-start">
                {/* self-start only for sm */}
                <div className=" w-full  md:col-span-1 p-2 flex justify-between gap-x-3 md:block">
                  <div className=" md:my-9 hover:opacity-80 flex-1">
                    {NotificationState ? (
                      <div
                        className="mx-auto  w-auto md:w-40 min-w-fit rounded-2xl  py-2 text-white bg-gradient-to-r from-[#A145CD] to-[#E1348B] cursor-pointer   md:px-8 md:py-4"
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
                  <div className="my-9 hover:opacity-80 flex-1">
                    {SubscriptionState ? (
                      <div
                        className="mx-auto  w-auto md:w-40 min-w-fit rounded-2xl  py-2 text-white bg-gradient-to-r from-[#A145CD] to-[#E1348B] cursor-pointer md:px-8 md:py-4"
                        onClick={SubscriptionFun}
                      >
                        <div className=" flex justify-center text-4xl">
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

                  <div className="my-9 hover:opacity-80 flex-1">
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
                    {/* {SubscriptionState ? <Subscription></Subscription> : <></>} */}
                    {PrivacyState ? <Privacy></Privacy> : <></>}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Settings;
