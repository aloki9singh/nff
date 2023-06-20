//verified by Shreyas Sahoo
import Link from "next/link";

const LinksList = ({ heading, links, className }) => {
   return (
      <div className={`${className} text-white space-y-[7px] 
      md:
      xl:space-y-[25px]`}>
         <h4 className="font-ral text-sm
          md:text-lg
          xl:text-xl font-semibold 
           md:font-normal whitespace-nowrap
           ">{heading}</h4>
         <div className="font-Inter space-y-[5px] 
         md:space-y-[14px]
         xl:space-y-[19px] pl-1">
            {links.map(({ title, link }, index) => {
               return (
                  <Link
                     key={index}
                     href={link}
                     className="block text-[#FFFFFFBA] font-normal
               text-[11px]
               md:text-xs
               xl:text-[15px]
               "
                  >
                     {title}
                  </Link>
               );
            })}
         </div>
      </div>
   );
};

export default LinksList;
