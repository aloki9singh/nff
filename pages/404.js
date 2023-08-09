import Image from "next/image";

export default function Custom404() {
  return (
    <div>
      <div className="bg-[#1E1E1E] p-10">
        <div className="h-screen bg-[#455A64] flex justify-center flex-col rounded-lg">
          <div className="flex items-center justify-center mb-5">
            <Image
              src="/pagesgraphics/common/errors/404.svg"
              alt="404"
              height={500}
              width={500}
            />
          </div>

          <div className="flex justify-center text-white text-xl">
            Page does not exist
          </div>

          <div className=" flex justify-center">
            <div className="flex flex-col md:flex-row  item-center  md:justify-center mt-10 gap-5">
              <div className="w-32  ml-2 md:w-36 h-10 flex items-center justify-center bg-transparent border-2 rounded-lg text-white">
                Refresh
              </div>

              <div className="w-36 md:w-44  h-10 flex items-center justify-center bg-[#A145CD] rounded-lg text-white">
                Back to Home
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
