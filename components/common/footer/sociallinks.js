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
         <Link href="https://discord.gg/q7ARXUQcbx" target="_blank">
            <FaDiscord className="text-[22px] md:text-[24px] xl:text-[38px] cursor-pointer" />
         </Link>
         <Link href="https://www.linkedin.com/showcase/neatskills-tech/" target="_blank">
            <AiOutlineLinkedin className="text-[22px] md:text-[24px] xl:text-[38px] cursor-pointer" />
         </Link>
         <Link href="https://www.instagram.com/neatskills.tech/" target="_blank">
         <AiOutlineInstagram className="text-[22px] md:text-[24px] xl:text-[38px] cursor-pointer" />
         
         </Link>
         <Link href="https://twitter.com/neatskills" target="_blank">
            <AiOutlineTwitter className="text-[22px] md:text-[24px] xl:text-[38px] cursor-pointer" />
         </Link>
         {/* <Link href="/">
         <AiOutlineGithub className="text-[22px] md:text-[24px] xl:text-[38px] cursor-pointer" />            
         </Link> */}
      </div>
   );
};

export default SocialLinks;
