import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper";

import "swiper/css";
import "swiper/css/scrollbar";
import "swiper/swiper-bundle.css";
import "swiper/css/effect-coverflow";
import "swiper/css/navigation";
import "swiper/css/pagination";
import MentorCard from "./MentorCard";

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
      // <div className="container">
      //   <Swiper
      //     effect={"coverflow"}
      //     grabCursor={true}
      //     centeredSlides={true}
      //     loop={true}
      //     slidesPerView={"auto"}
      //     coverflowEffect={{
      //       rotate: 0,
      //       stretch: 0,
      //       depth: 100,
      //       modifier: 2.5,
      //     }}
      //     pagination={{ el: ".swiper-pagination", clickable: true }}
      //     navigation={{
      //       nextEl: ".swiper-button-next",
      //       prevEl: ".swiper-button-prev",
      //       clickable: true,
      //     }}
      //     modules={[EffectCoverflow, Pagination, Navigation]}
      //     className="swiper_container"
      //   >
      //       <SwiperSlide>
      //       <div className="flex justify-center items-center">
      //         <div className="flex justify-center items-center">
      //           <Item className="flex flex-col h-[200px] w-[150px] sm:h-[300px] sm:w-[200px] md:h-[350px] md:w-[250px] rounded-2xl bg-[url('/Female.png')] bg-cover justify-end border">
      //             <div className="flex flex-col mb-4 py-2 px-4 bg-mentor justify-center items-center">
      //               <div className="text-sm sm:text-lg md:text-xl">
      //                 Preeti Pathak
      //               </div>
      //               <div className="text-xs sm:text-base md:text-lg">Teacher</div>
      //             </div>
      //           </Item>
      //         </div>
      //         <div className="flex justify-center items-center">
      //           <Item className="flex flex-col h-[200px] w-[150px] sm:h-[300px] sm:w-[200px] md:h-[350px] md:w-[250px] rounded-2xl bg-[url('/Female.png')] bg-cover justify-end border">
      //             <div className="flex flex-col mb-4 py-2 px-4 bg-mentor justify-center items-center">
      //               <div className="text-sm sm:text-lg md:text-xl">
      //                 Preeti Pathak
      //               </div>
      //               <div className="text-xs sm:text-base md:text-lg">Teacher</div>
      //             </div>
      //           </Item>
      //         </div>
      //       </div>
      //       </SwiperSlide>
      //       <SwiperSlide>
      //       <div className="flex justify-center items-center">
      //         <div className="flex justify-center items-center">
      //           <Item className="flex flex-col h-[200px] w-[150px] sm:h-[300px] sm:w-[200px] md:h-[350px] md:w-[250px] rounded-2xl bg-[url('/Female.png')] bg-cover justify-end border">
      //             <div className="flex flex-col mb-4 py-2 px-4 bg-mentor justify-center items-center">
      //               <div className="text-sm sm:text-lg md:text-xl">
      //                 Preeti Pathak
      //               </div>
      //               <div className="text-xs sm:text-base md:text-lg">Teacher</div>
      //             </div>
      //           </Item>
      //         </div>
      //         <div className="flex justify-center items-center">
      //           <Item className="flex flex-col h-[200px] w-[150px] sm:h-[300px] sm:w-[200px] md:h-[350px] md:w-[250px] rounded-2xl bg-[url('/Female.png')] bg-cover justify-end border">
      //             <div className="flex flex-col mb-4 py-2 px-4 bg-mentor justify-center items-center">
      //               <div className="text-sm sm:text-lg md:text-xl">
      //                 Preeti Pathak
      //               </div>
      //               <div className="text-xs sm:text-base md:text-lg">Teacher</div>
      //             </div>
      //           </Item>
      //         </div>
      //       </div>
      //       </SwiperSlide>

      //     <div className="slider-controler">
      //       <div className="swiper-button-prev slider-arrow">
      //         <ion-icon name="arrow-back-outline"></ion-icon>
      //       </div>
      //       <div className="swiper-button-next slider-arrow">
      //         <ion-icon name="arrow-forward-outline"></ion-icon>
      //       </div>
      //       <div className="swiper-pagination"></div>
      //     </div>
      //   </Swiper>
      // </div>
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
               <MentorCard name="Preeti Pathak" designation={"Art Teacher"} />
            </div>
         </SwiperSlide>
         <SwiperSlide>
            <div className="w-full h-full flex justify-center items-center">
               <MentorCard name="Preeti Pathak" designation={"Art Teacher"} />
            </div>
         </SwiperSlide>
         <SwiperSlide>
            <div className="w-full h-full flex justify-center items-center">
               <MentorCard name="Preeti Pathak" designation={"Art Teacher"} />
            </div>
         </SwiperSlide>
         <SwiperSlide>
            <div className="w-full h-full flex justify-center items-center">
               <MentorCard name="Preeti Pathak" designation={"Art Teacher"} />
            </div>
         </SwiperSlide>
         <SwiperSlide>
            <div className="w-full h-full flex justify-center items-center">
               <MentorCard name="Preeti Pathak" designation={"Art Teacher"} />
            </div>
         </SwiperSlide>
         <SwiperSlide>
            <div className="w-full h-full flex justify-center items-center">
               <MentorCard name="Preeti Pathak" designation={"Art Teacher"} />
            </div>
         </SwiperSlide>
         <SwiperSlide>
            <div className="w-full h-full flex justify-center items-center">
               <MentorCard name="Preeti Pathak" designation={"Art Teacher"} />
            </div>
         </SwiperSlide>
      </Swiper>
   );
};

export default CarouselComp;
