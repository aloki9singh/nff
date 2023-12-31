import { removeDomainFromEmail } from "@/lib/exportablefunctions";
import e from "cors";
import Image from "next/image";

const MentorCard = ({ name, designation ,src}) => {

  return (
    <div className="h-full w-[147px] md:w-[291px] relative rounded-10 overflow-hidden border-2 border-white flex justify-center items-end">
      <Image
        src={src||"/componentsgraphics/common/Anonymousimage/anonymous.png"}
        width={291}
        height={413}
        className="absolute top-0 left-0 h-full w-full object-cover"
        alt="mentorimg"
      />
      <div className="border-[0.2px] text-[#E1348B] border-neutral-300 z-10 flex items-center justify-center flex-col acrylic w-[82px] h-[40px] mb-4 md:w-[186px] md:h-[89px] md:mb-4">
        <h1 className="font-bold text-[9px] md:text-xl md:mb-2 ">{removeDomainFromEmail(name)}</h1>
        <p className="text-[7px] md:text-base">{designation}</p>
      </div>
    </div>
  );
};

export default MentorCard;
