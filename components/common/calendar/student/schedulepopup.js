//verified 1 by Raviraj Kumar
import { RxCounterClockwiseClock, RxCross2 } from "react-icons/rx";
import { useEffect, useState } from "react";

export default Studentschedulepop = ({ hidefun, popupValue }) => {
  const [meeting, setMeeting] = useState({
    link: "",
    disable: false,
  });

  // Checking with popup time
  const currentTime = new Date();
  const fiveMinutesBefore = new Date(currentTime.getTime() - 5 * 60000);

  const x = popupValue.startTime;
  const y = fiveMinutesBefore.getHours() + ":" + fiveMinutesBefore.getMinutes();

  // Comparing the time values
  // const isWithin5Minutes = new Date(x) >= fiveMinutesBefore;

  useEffect(() => {
    if (isWithin5Minutes) {
      setMeeting((prevState) => ({ ...prevState, disable: true }));
    } else {
      setMeeting((prevState) => ({ ...prevState, disable: false }));
    }
  }, [popupValue.startTime]);

  const handleJoinLink = () => {
    window.location.href = meeting.link;
  };

  const handleMeetingChange = (e) => {
    setMeeting((prevState) => ({ ...prevState, link: e.target.value }));
  };

  const hideschedule = (e) => {
    e.preventDefault();
    hidefun();
  };

  return (
    <>
      {" "}
      <div className="w-screen h-screen top-0 left-0  absolute">
        <div className="w-full h-full flex justify-center  ">
          <div className="text-white text-3xl  my-auto z-10">
            <div
              className="border-l-8 flex p-6 relative"
              style={{ background: "rgba(161, 69, 205, 0.75)" }}
            >
              <button
                className="absolute right-3 top-2 text-xl"
                onClick={hideschedule}
              >
                <RxCross2></RxCross2>
              </button>
              <div className=" rounded-lg ">
                <div className="w-fit px-6 py-3">
                  <p>
                    {popupValue && popupValue.addTitle}(
                    {popupValue && popupValue.addBatch})
                  </p>
                  <p>
                    {popupValue && popupValue.startTime}-
                    {popupValue && popupValue.endTime}
                  </p>
                </div>
                <div>
                  <div className="text-lg">
                    <p>Meeting Link</p>
                  </div>
                  <div className={` relative w-full`}>
                    <input
                      type="text"
                      id="meet"
                      className="bg-transparent  border border-gray-300 text-slate-200 pr-16 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full  p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="join meet..."
                      required
                      value={meeting.link}
                      onChange={handleMeetingChange}
                    />
                    <button
                      className={`flex absolute inset-y-0 right-1 text-lg items-center rounded px-3 py-1 m-1  pointer-events-none`}
                      style={{ background: "#E1348B" }}
                      disabled={disable}
                      onClick={handleJoinLink}
                    >
                      join
                    </button>
                  </div>
                  <p className="text-sm text-slate-400">
                    Join 5 minutes prior to the meeting{" "}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
