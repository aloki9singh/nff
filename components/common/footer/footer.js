//verified by Shreyas Sahoo
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

export default function Footer({background}) {
   const CompanyInformationLinks = [
      {
         title: "About Us",
         link: "/alpha/aboutus",
      },
      {
         title: "Help",
         link: "/alpha/helpandsupport",
      },
      {
         title: "Privacy Policy",
         link: "/alpha/privacypolicy",
      },
      {
         title: "Terms and Conditions",
         link: "/alpha/termsandconditions",
      },
   ];
   const PopularCoursesLink = [
      {
         title: "Ux Fundamentals",
         link: "/beta/courseoverview",
      },
      {
         title: "Python Coading",
         link: "/beta/courseoverview",
      },
      {
         title: "Maths",
         link: "/beta/courseoverview",
      },
      {
         title: "Introduction to C++",
         link: "/beta/courseoverview",
      },
   ];
   const ExploreLinks = [
      {
         title: "Courses",
         link: "/beta/courseoverview",
      },
      {
         title: "Community",
         link: "https://discord.gg/q7ARXUQcbx",
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

      <div className={`${background ? background : "bg-black "} flex flex-col items-center w-full`}>
         <div className="w-full max-w-[1440px] px-3 py-5  lg:px-7 lg:py-11 md:flex md:flex-row md:justify-between">
            <div className="w-full px-2 md:w-auto flex justify-between mb-[50px]">
               <Link href="/" className="">
                  <Image
                     src="/componentsgraphics/common/homepage/footer/neatskillslogosample.svg"
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

         <div className="w-full text-white text-sm text-center pb-2">
            <a href="https://www.provokedev.tech/team">
            &copy; neatskills.tech managed by Provoke Developers Private Limited
            </a>
             </div>
      </div>
   );
}
