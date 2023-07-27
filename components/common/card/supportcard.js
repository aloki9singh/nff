import Image from "next/image";

const SupportCard = ({ className, img, text, icon, href }) => {
  return (
    <a
      href={href}
      className={`${className} flex flex-col text-white items-center bg-[#1F1F1F] border border-[#5F6065] w-full rounded-[20px] px-5 sm:px-10 md:px-[50px] pt-[30px] sm:pt-[40px] md:pt-[50px] pb-[40px] sm:pb-[55px] md:pb-[70px] space-y-4 sm:space-y-6 md:space-y-7 h-[150px] sm:h-[200px] md:h-[250px] `}
    >
      {icon ? (
        icon
      ) : img ? (
        <Image
          src={img}
          alt={"image"}
          width={48}
          height={48}
          className="
				h-6 sm:h-9
				w-6 sm:w-9
				"
        />
      ) : (
        // TODO Here will be the deafult image if the image is not working or not provided. Or for development purpose while you dont want to enter a logo explicitly
        ""
      )}
      <p
        className="font-Inter text-sm 
			sm:text-lg xl:text-2xl"
      >
        {text}
      </p>
    </a>
  );
};

export default SupportCard;
