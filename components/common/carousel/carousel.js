import MentorCard from "../homepage/mentor/MentorCard";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper";
import "swiper/css";
import "swiper/css/scrollbar";
import "swiper/swiper-bundle.css";
import "swiper/css/effect-coverflow";
import "swiper/css/navigation";
import "swiper/css/pagination";

const CarouselComp = ({ mentors }) => {
  return (
    <>
      <Swiper
        modules={[Navigation, Pagination, Scrollbar, A11y]}
        spaceBetween={20}
        slidesPerView={1}
        navigation
        loop={true}
        onSwiper={(swiper) =>
          
          
          console.log(swiper)
        
        }
        onSlideChange={() => console.log("slide change")}
        className="h-[217px] md:w-0 md:h-0"
      >
        {mentors.map((e) => (
          <SwiperSlide key={e.uid}>
            <div className="w-full h-full flex justify-center items-center">
              <MentorCard
                key={e.uid}
                name={e.displayName}
                designation={e.details.interest}
                src={e.photoURL}
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <Swiper
        modules={[Navigation, Pagination, Scrollbar, A11y]}
        spaceBetween={20}
        slidesPerView={3}
        navigation
        loop={true}
        onSwiper={(swiper) => console.log(swiper)}
        onSlideChange={() => console.log("slide change")}
        className="h-0 w-0 md:w-auto md:h-[413px]"
      >
        {mentors.map((e) => (
          <SwiperSlide key={e.uid}>
            <div className="w-full h-full flex justify-center items-center">
              <MentorCard
                key={e.uid}
                name={e.displayName}
                designation={e.details.interest}
                src={e.photoURL}
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};

export default CarouselComp;
