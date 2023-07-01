import { AiOutlineArrowRight } from "react-icons/ai";
import { useState, useRef, useEffect } from "react";
import { db } from "@/config/firebaseConfig";
import { collection, getDocs, query } from "firebase/firestore";

export default function Advertisement() {
  const [timerDays, setTimerDays] = useState("00");

  const [timerHours, setTimerHours] = useState("00");

  const [timerMinutes, setTimerMinutes] = useState("00");

  const [timerSeconds, setTimerSeconds] = useState("00");

  const [timer, setTimer] = useState([]);

  let interval = useRef();

  const startTimer = () => {
    const countdownDate = new Date("April 30, 2023 00:00:00").getTime();

    interval = setInterval(() => {
      const now = new Date().getTime();

      const distance = countdownDate - now;

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));

      const hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );

      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));

      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      if (distance < 0) {
        // stop timer
        clearInterval(interval.current);
      } else {
        // update timer
        setTimerDays(days);
        setTimerHours(hours);
        setTimerMinutes(minutes);
        setTimerSeconds(seconds);
      }
    }, 1000);
  };

  useEffect(() => {
    startTimer();
    const timerId = interval.current;
    return () => clearInterval(timerId);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const q = query(collection(db, "advertisement"));
      const timerSnapshot = await getDocs(q);
      const timerData = timerSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setTimer(timerData);
    };
    fetchData();
  }, []);

  return (
    <div className="w-full rounded-3xl flex  my-5 text-white pl-8 py-4 bg-gradient-to-r  from-[#E1348B] to-[#CD8BED]">
      <div className="w-full flex">
        <div>
          <div className="text-xs border w-fit md:px-5 px-2 rounded-sm mb-2 bg-gradient-to-r from-[#DBDBDB59] to-[#DBDBDB7A]">
            <div className="flex gap-2">
              <div className="w-25">Expires in</div>
              <span>:</span>
              <section className="flex">
                <p>{timerDays}</p>
                <p>d</p>
              </section>
              <section className="flex">
                <p>{timerHours}</p>
                <p>h</p>
              </section>
              <section className="flex">
                <p>{timerMinutes}</p>
                <p>m</p>
              </section>
              <section className="flex">
                <p>{timerSeconds}</p>
                <p>s</p>
              </section>
            </div>
          </div>
          <div className=" flex flex-row items-center justify-start  text-left text-[36px] font-inter">
            <div className="flex flex-col items-start justify-start md:space-y-2">
              <div className="inline-block   md:text-[30px] text-sm shrink-0">
                <b>{`10% `}</b>
                <b className="font-raleway">off on Annual Subscription</b>
              </div>
              <div className=" md:text-base  text-sm shrink-0 font-raleway">
                <span >
                  Get unlimited access to all materials just from
                </span>
                <span className="font-medium font-inter">{` ₹400/mo `}</span>
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-center md:w-[100px] w-[100px] m-auto">
          {/* {timer.map((item) => (
            <div className="mb-2" key={item.id}></div>
          ))} */}
          <div className=" border rounded-md bg-[#DBDBDB] lg:flex justify-center items-center text-black text-2xl  h-10" >
            <button className=" p-2">
              <AiOutlineArrowRight />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
