//verifed by Shreyas Sahoo
import Link from "next/link";
import { FaDiscord } from "react-icons/fa";
import {
   AiOutlineLinkedin,
   AiOutlineGithub,
   AiOutlineTwitter,
   AiOutlineInstagram,
} from "react-icons/ai";

const SocialLinks = ({className}) => {
   return (
      <div className={`${className} flex space-x-[12px] md:space-x-[24px] xl:space-x-[55px] text-white `}>
         <Link href="/">
            <FaDiscord className="text-[22px] md:text-[24px] xl:text-[38px] cursor-pointer" />
         </Link>
         <Link href="/">
            <AiOutlineLinkedin className="text-[22px] md:text-[24px] xl:text-[38px] cursor-pointer" />
         </Link>
         <Link href="/">
            <AiOutlineGithub className="text-[22px] md:text-[24px] xl:text-[38px] cursor-pointer" />
         </Link>
         <Link href="/">
            <AiOutlineTwitter className="text-[22px] md:text-[24px] xl:text-[38px] cursor-pointer" />
         </Link>
         <Link href="/">
            <AiOutlineInstagram className="text-[22px] md:text-[24px] xl:text-[38px] cursor-pointer" />
         </Link>
      </div>
   );
};

export default SocialLinks;
