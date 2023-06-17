import { useState } from "react";

function Notification() {
  let [promotion, setPromotion] = useState(false);
  let promotionFun = () => {
    if (promotion === false) {
      setPromotion(true);
    } else {
      setPromotion(false);
    }
  };

  let [promotionalemails, setpromotionalemails] = useState(false);
  let promotionalemailsFun = () => {
    if (promotionalemails === false) {
      setpromotionalemails(true);
    } else {
      setpromotionalemails(false);
    }
  };

  let [Announcement, setAnnouncement] = useState(false);
  let AnnouncementFun = () => {
    if (Announcement === false) {
      setAnnouncement(true);
    } else {
      setAnnouncement(false);
    }
  };

  let [Examination, setExamination] = useState(false);
  let ExaminationFun = () => {
    if (Examination === false) {
      setExamination(true);
    } else {
      setExamination(false);
    }
  };
  return (
    <>
      <div className="py-8 px-14 text-white">
        <div className="mb-4">
          <h3 className="text-2xl">Email Notification</h3>
          <p className="text-sm opacity-50">when email me:</p>
        </div>
        <div className="my-6">
          <div className=" flex justify-between">
            <div className="">Promotion course recommendation</div>
            <div className="">
              <label className="relative inline-flex items-center mr-5 cursor-pointer">
                <input
                  type="checkbox"
                  value=""
                  className="sr-only peer"
                  checked={promotion}
                />
                <div
                  onClick={promotionFun}
                  className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"
                ></div>
              </label>
            </div>
          </div>
        </div>
        <div className="my-6">
          <div className=" flex justify-between">
            <div className="">Don’t send any promotional emails</div>
            <div className="">
              <label className="relative inline-flex items-center mr-5 cursor-pointer">
                <input
                  type="checkbox"
                  value=""
                  className="sr-only peer"
                  checked={promotionalemails}
                />
                <div
                  onClick={promotionalemailsFun}
                  className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"
                ></div>
              </label>
            </div>
          </div>
        </div>
        <div className="my-6">
          <div className=" flex justify-between">
            <div className="">Announcement of instructor</div>
            <div className="">
              <label className="relative inline-flex items-center mr-5 cursor-pointer">
                <input
                  type="checkbox"
                  value=""
                  className="sr-only peer"
                  checked={Announcement}
                />
                <div
                  onClick={AnnouncementFun}
                  className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"
                ></div>
              </label>
            </div>
          </div>
        </div>
        <div className="my-6">
          <div className=" flex justify-between">
            <div className="">Examination Notice</div>
            <div className="">
              <label className="relative inline-flex items-center mr-5 cursor-pointer">
                <input
                  type="checkbox"
                  value=""
                  className="sr-only peer"
                  checked={Examination}
                />
                <div
                  onClick={ExaminationFun}
                  className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"
                ></div>
              </label>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default Notification;
