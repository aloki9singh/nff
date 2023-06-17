
import Link from "next/link";

const Navlink = ({ href, text, className }) => {
   return (
      <Link href="/student" className={`${className} flex items-center`}>
         <div className="h-3.5 w-3.5 mr-1.5  rounded-[3px] bg-white"></div>
         <p>{text}</p>
      </Link>
   );
};

export default Navlink;