import Image from 'next/image';

const Card = ({ lessons, level, title, desc }) => {
  return (
    <div>
      <div className="flex justify-center p-2">
        <div className="rounded-[30px] border border-white shadow-lg bg-[#141518] max-w-sm">
          <div className="flex justify-between">
            <div>
              <Image
                src="/laptop.svg"
                width={60}
                height={60}
                alt="f"
                className="ml-4 mt-4"
              ></Image>
            </div>
            <div className="text-xs text-[#E1348B] pr-6 pt-2">
              <span className="mr-2">{`${lessons} Lessons`}</span>
              <span>{level}</span>
            </div>
          </div>
          <a href="#!" data-mdb-ripple="true" data-mdb-ripple-color="light"></a>
          <div class="px-4">
            <h1 class="text-slate-400 text-[8px] font-medium">COURSE</h1>
            <h1 className="text-white text-md font-medium">{title}</h1>
            <p class="text-white text-[10px] mb-4">{desc}</p>
            <div className="flex justify-end">
              <button
                type="button"
                className="mx-4 mb-2 inline-block px-4 py-2 bg-transparent  border-pin border text-white font-medium text-xs leading-tight uppercase  shadow-md hover:bg-pin hover:shadow-lg focus:bg-pin focus:shadow-lg focus:outline-none focus:ring-0 active:bg-pin active:shadow-lg transition duration-150  ease-in-out"
              >
                Explore
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
