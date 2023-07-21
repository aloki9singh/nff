// import Carousel from "../Mentor/Carousel";
import { GetAllUsers } from "@/lib/exportablefunctions";
import { useState } from "react";
import { useEffect } from "react";
import CarouselComp from "../../carousel/carousel";
import MentorCard from "./MentorCard";
const breakPoints = [
  { width: 1, itemsToShow: 1 },
  { width: 550, itemsToShow: 2 },
  { width: 768, itemsToShow: 3 },
  { width: 1200, itemsToShow: 4 },
];

export default function Mentor() {
  // const mentors = [
  //   {
  //     id: 1,
  //     name: "Preeti Pathak",
  //     designation: "Art Teacher",
  //   },
  //   {
  //     id: 2,
  //     name: "Preeti Pathak",
  //     designation: "Art Teacher",
  //   },
  //   {
  //     id: 3,
  //     name: "Preeti Pathak",
  //     designation: "Art Teacher",
  //   },
  //   {
  //     id: 4,
  //     name: "Preeti Pathak",
  //     designation: "Art Teacher",
  //   },
  // ];

  const [mentors,setMentors]=useState([])
  useEffect(() => {
    async function fetchData() {
      try {
        const users = await GetAllUsers();
        const mentors = users.users.filter((user) => user.role === "mentor");
        setMentors(mentors)
        console.log("All users fetched:", mentors);
      } catch (error) {
        console.log("Error fetching users:", error);
      }
    }

    fetchData();
  }, []);

  return (
    <div className="flex justify-center items-center h-screen md:h-full w-full bg-[#0D0E14] text-white font-raleway ">
      <div className="bg-[#1E1E1E] w-[90%] rounded-2xl px-5 py-9 md:pt-[110px] md:pb-[129px] max-w-[1440px]">
        <div className="flex flex-col md:flex-row justify-center items-center">
          <div className=" text-2xl md:text-3xl flex flex-col items-center bg-[url('/pink_rect.png')] bg-bottom bg-contain bg-no-repeat">
            <h1>Meet Our</h1>
            <h1>Mentors</h1>
            <div class="bg-[#DA2C84] transform -rotate-2 w-full origin-bottom-right h-1 mt-[-10px] ml-[10px]"></div>
          </div>
          <div className="text-sm md:text-base md:w-1/2 pt-4 px-4 md:pl-8">
            Neat Skills offers the world&rsquo;s best classes from the
            world&rsquo;s best practitioners. It&rsquo;s like having a mentor at
            your fingertips - no matter where you are
          </div>
        </div>
        <div>
          <div className="flex items-center justify-center mt-10 p-2">
            <CarouselComp mentors={mentors}  />
          </div>
        </div>
      </div>
    </div>
  );
}
