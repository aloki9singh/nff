import Image from "next/image";
import { FaDiscord } from "react-icons/fa";
import {
   AiOutlineLinkedin,
   AiOutlineGithub,
   AiOutlineTwitter,
   AiOutlineInstagram,
} from "react-icons/ai";
import Link from "next/link";
import LinksList from "./linkslist";
import SocialLinks from "./sociallinks";

export default function Footer() {
   const CompanyInformationLinks = [
      {
         title: "About Us",
         link: "/",
      },
      {
         title: "Help",
         link: "/",
      },
      {
         title: "Privacy Policy",
         link: "/",
      },
      {
         title: "Terms and Conditions",
         link: "/",
      },
   ];
   const PopularCoursesLink = [
      {
         title: "Ux Fundamentals",
         link: "/",
      },
      {
         title: "Python Coading",
         link: "/",
      },
      {
         title: "Maths",
         link: "/",
      },
      {
         title: "Introduction to C++",
         link: "/",
      },
   ];
   const ExploreLinks = [
      {
         title: "Courses",
         link: "/",
      },
      {
         title: "Community",
         link: "/",
      },
   ];
   const LearningLinks = [
      {
         title: "Track",
         link: "/",
      },
      {
         title: "Roadmap",
         link: "/",
      },
   ];

   return (

      <div className="flex flex-col items-center w-full bg-black">
         <div className="w-full max-w-[1440px] px-3 py-5  lg:px-7 lg:py-11 md:flex md:flex-row md:justify-between">
            <div className="w-full px-2 md:w-auto flex justify-between mb-[50px]">
               <Link href="/" className="">
                  <Image
                     src="/componentsgraphics/common/homepage/footer/neatskillslogosample.png"
                     alt="logo"
                     className="object-contain w-[116px] md:w-48 lg:w-64 flex-shrink-0 
                  "
                     width={100}
                     height={100}
                  />
               </Link>
               <SocialLinks className={"md:hidden"} />
            </div>
            <div
               className="pl-5 grid 
            grid-cols-2
            gap-x-14 gap-y-6 md:gap-x-[92px] md:gap-y-0 my-[50px] md:mt-[100px] md:mb-0 md:px-5 lg:px-10"
            >
               <LinksList
                  className={"whitespace-nowrap"}
                  heading={"Company Information"}
                  links={CompanyInformationLinks}
               />
               <LinksList
                  className="md:hidden"
                  heading={"Explore"}
                  links={ExploreLinks}
               />
               <LinksList
                  heading={"Popular Courses"}
                  links={PopularCoursesLink}
               />
               <LinksList
                  className="md:hidden"
                  heading={"Learning"}
                  links={LearningLinks}
               />
            </div>
            <div className="hidden md:flex flex-col justify-end">
               <p className="text-white text-inter text-sm lg:text-xl mb-4 ">
                  Follow Us
               </p>
               <SocialLinks className={"hidden md:flex"} />
            </div>
         </div>
      </div>
   );
}
