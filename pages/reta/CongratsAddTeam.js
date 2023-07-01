import React from "react";

const CongratsAddTeam = () => {
  const glass = {
    background: "rgba( 255, 255, 255, 0.25 )",
    boxShadow: "0 8px 32px 0 rgba( 31, 38, 135, 0.37 )",
    backdropFilter: "blur( 4px )",
    borderRadius: "10px",
    border: "1px solid rgba( 255, 255, 255, 0.18 )",
    display: "flex",
  };
  return (
    <>
      <div
        className="d-flex items-center justify-center w-[85%] sm:w-[1350px] h-[724px] rounded-xl bg-[#1E1E1E] m-12"
        style={{
          backgroundImage: "url('/pagesgraphics/admin/AddTeam/Frame.svg')",
          display: "flex",
        }}
      >
        <div
          href="#"
          class="block max-w-xl p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
          style={glass}
        >
          <div className="d-flex justify-center">
            <div className="text-container text-center">
              <h5 class="mb-2 text-2xl font-bold tracking-tight text-white dark:text-white">
                Congratulations
              </h5>
              <h6 className="text-white font-normal sm:text-2xl text-xl">
                New team made successfully!
              </h6>
            </div>

            <div className="button-container text-center">
              <button className="d-flex h-11 px-6 text-white sm:m-4 justify-center items-center gap-2 rounded-xl bg-[#E1348B] my-6">
                View team details
              </button>

              <button className="d-flex text-white sm:m-4 h-11 px-6 justify-center items-center gap-2 rounded-xl bg-[#E1348B] my-4">
                Create another team
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CongratsAddTeam;
