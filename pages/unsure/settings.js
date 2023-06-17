
import SchoolProfileTopbar from "../components/Navbar/SchoolProfileTopbar";
import { useState } from "react";
import { MdOutlinePersonOutline } from "react-icons/md";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { BsEnvelopeOpen } from "react-icons/bs";
import Profile from "../components/settingspart/Profile";
import { MdOutlinePrivacyTip } from "react-icons/md";
import Subscription from "../components/settingspart/subscription";
import Notification from "../components/settingspart/Notification";
import Privacy from "../components/settingspart/Privacy";
import Schoolsidebar from "../components/Sidebar/Schoolsidebar";

function settings() {



  let [NotificationState, setNotificationState] = useState(true);
  let NotificationFun = () => {
    setNotificationState(true);
    setSubscriptionState(false);
    setPrivacyState(false);
  };
  let [SubscriptionState, setSubscriptionState] = useState(false);
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
    <div className=" h-full  text-base bg-black">
      <div className="flex overflow-y-hidden">
        
      <div className="lg:col-span-1 hidden lg:grid">
                        {" "}
                        <Schoolsidebar  />
                    </div>
        {/* sidebar with a div of discord community must be added once made */}
        <div className="w-full h-[100vh] rounded-tl-[8%] mx-auto rounded-bl-[5%] bg-[#2D2E35] col-span-6 md:col-span-5 lg:col-span-4 md:rounded-l-[50px] pt-2 ">
        <SchoolProfileTopbar heading={"Settings"} />
          <hr className="hidden lg:block opacity-50  "/>
          <div className="flex min-h-screen rounded-2xl p-2  md:p-4 mx-2 my-8 md:mx-4  justify-between md:my-auto ">
            <div className="md:grid  md:grid-cols-6 md:w-full md:my-auto self-start">{/* self-start only for sm */}
              <div className=" w-full  md:col-span-1 p-2 my-4 md:my-auto flex justify-between gap-x-3 md:block">
              <div className="my-auto md:my-9 hover:opacity-80 flex-1">
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
                      <div className="text-sm flex justify-center">Privacy</div>
                    </div>
                  ) : (
                    <div
                      className="mx-auto w-auto min-w-fit md:w-40 rounded-2xl  py-2 text-white bg-[#373a41] cursor-pointer md:px-8 md:py-4"
                      onClick={PrivacyFun}
                    >
                      <div className=" flex justify-center text-4xl">
                        <MdOutlinePrivacyTip></MdOutlinePrivacyTip>
                      </div>
                      <div className="text-sm flex justify-center">Privacy</div>
                    </div>
                  )}
                </div>
              </div>
              <div className="col-span-5  flex justify-center md:my-auto ">
                <div className="w-[100%] md:w-[80%]">
                

                  {NotificationState ? <Notification></Notification> : <></>}
                  {SubscriptionState ? <Subscription></Subscription> : <></>}
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

export default settings;
