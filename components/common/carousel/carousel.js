import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper";

import "swiper/css";
import "swiper/css/scrollbar";
import "swiper/swiper-bundle.css";
import "swiper/css/effect-coverflow";
import "swiper/css/navigation";
import "swiper/css/pagination";
import MentorCard from "../homepage/mentor/MentorCard";




const CarouselComp = () => {
   const mentors = [
      {
         id: 1,
         name: "Preeti Pathak",
         designation: "Art Teacher",
      },
      {
         id: 2,
         name: "Preeti Pathak",
         designation: "Art Teacher",
      },
      {
         id: 3,
         name: "Preeti Pathak",
         designation: "Art Teacher",
      },
      {
         id: 4,
         name: "Preeti Pathak",
         designation: "Art Teacher",
      },
   ];
   return (
      <Swiper
         modules={[Navigation, Pagination, Scrollbar, A11y]}
         spaceBetween={20}
         slidesPerView={3}
         navigation
         loop={true}
         onSwiper={(swiper) => console.log(swiper)}
         onSlideChange={() => console.log("slide change")}
         className="h-[141px] md:h-[413px]"
      >
         <SwiperSlide>
            <div className="w-full h-full flex justify-center items-center">
               <MentorCard name="Preeti Pathak" designation={"Art Teacher"}/>
            </div>
         </SwiperSlide>
      </Swiper>
   );
};

export default CarouselComp;
