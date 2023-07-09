import Image from 'next/image';

export default function Plan({
  title,
  price,
  duration,
  description,
  from,
  to,
  updatePage,
}) {
  return (
    <>
      <div
        className={`w-min-[480px] md:w-[25%] border-[1.3px] rounded-2xl md:mx-4 bg-gradient-to-b ${from} ${to} mt-6 md:mt-0 mx-auto`}
      >
        <div className="border-b border-[#ffffffc0] px-6 pt-8 pb-2">
          <h1 className="text-2xl md:xl lg:text-2xl xl:text-4xl md:mb-2 font-medium">
            {title}
          </h1>
          <h1 className="text-sm md:mb-2">
            <span className="text-base font-medium">&#8377;</span>
            <span className="text-base font-medium">{price}</span>/
            {`${duration}`}
          </h1>
          <h1 className="text-[10px] text-[#ffffff8f]">One time payment</h1>
        </div>
        <div className="px-6 pb-2.5 mt-6 md:mt-10">
          <div className="mb-10 md:mb-28">
            {description.map((item, ind) => (
              <div key={ind} className="flex items-center mt-6">
                <Image
                  src="/componentsgraphics/student/paymentgateway/plan/tick.png"
                  alt="tick"
                  width={10}
                  height={10}
                  className="h-5 w-5 mr-2"
                />
                <p className="text-sm">{item}</p>
              </div>
            ))}
            <button
              className="bg-[#A145CD] text-sm w-full p-[5px] mt-6 rounded-md"
              onClick={() => updatePage(1)}
            >
              Start Free Trial Now
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
