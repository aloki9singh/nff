// Verified by Satyabrat Ojha

import Image from "next/image";

function Profile() {
  return (
    <>
      <div className="p-4 text-white">
        <div className="mb-4">
          <h3 className="text-2xl">Personal info</h3>
          <p className="text-sm opacity-50">
            Update your details and personal photo here
          </p>
        </div>
        <div className=" flex justify-between my-2">
          <div className=" font-bold">Name</div>
          <div className="py-2 px-4 bg-[#2E3036] rounded-lg">
            <input
              className="bg-[#2E3036] outline-none"
              placeholder="first name"
            ></input>
          </div>
          <div className="py-2 px-4 bg-[#2E3036] rounded-lg">
            <input
              className="bg-[#2E3036] outline-none"
              placeholder="last name"
            ></input>
          </div>
        </div>
        <div className="w-full border border-black my-10"></div>
        <div className=" flex justify-between my-2">
          <div className=" font-bold">Email</div>
          <div className="py-2 px-4 bg-[#2E3036] rounded-lg w-1/2 -translate-x-7">
            <input
              className="bg-[#2E3036] outline-none w-full"
              placeholder="firstname@gmail.com"
            ></input>
          </div>
        </div>
        <div className="w-full border border-black my-10"></div>

        <div className=" flex justify-between my-2">
          <div className="">
            <div className="font-bold">Your Photo</div>
            <p className="text-sm opacity-50">
              This photo will display on your profile
            </p>
          </div>
          <div className="h-24 w-24 overflow-clip rounded-full  flex items-center justify-center">
            <Image
              src={"/Female.png"}
              width="100"
              className=""
              height={"100"}
              alt="profile"
            ></Image>
          </div>
          <div className=" px-8 bg-[#2E3036] rounded-lg">
            <div className="flex items-center justify-center w-full">
              <label
                htmlFor="dropzone-file"
                className="flex flex-col items-center justify-center w-full  rounded-lg cursor-pointer "
              >
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <svg
                    aria-hidden="true"
                    className="w-10 h-10 mb-3 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                    ></path>
                  </svg>
                  <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                    <span className="font-semibold">Click to upload</span> or
                    drag and drop
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    SVG, PNG, JPG or GIF (MAX. 800x400px)
                  </p>
                </div>
                <input id="dropzone-file" type="file" className="hidden" />
              </label>
            </div>
          </div>
        </div>
        <div className="w-full border border-black my-10"></div>
        <div className=" flex justify-between my-2">
          <div className=" font-bold">State</div>
          <div className="py-2 px-4 bg-[#2E3036] rounded-lg w-1/2 -translate-x-7">
            {/* <input
              className="bg-[#2E3036] outline-none w-full"
              placeholder="firstname@gmail.com"
            ></input> */}
            <select
              id="countries"
              className="  text-sm rounded-lg bg-[#2E3036] block w-full outline-none"
            >
              <option className="text-opacity-50" selected>
                Choose a country
              </option>
              <option value="US">United States</option>
              <option value="CA">Canada</option>
              <option value="FR">France</option>
              <option value="DE">Germany</option>
            </select>
          </div>
        </div>
      </div>
    </>
  );
}
// style={{ clipPath: "circle(50% at 50% 50%)" }}
export default Profile;
