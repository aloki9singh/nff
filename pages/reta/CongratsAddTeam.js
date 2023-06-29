import React from "react";

const CongratsAddTeam = () => {

    const glass = {
        background: 'rgba( 255, 255, 255, 0.25 )',
        boxShadow: '0 8px 32px 0 rgba( 31, 38, 135, 0.37 )',
        backdropFilter: 'blur( 4px )',
        borderRadius: '10px',
        border: '1px solid rgba( 255, 255, 255, 0.18 )',
        display:'flex'
    }
  return (
    <>
      <div
        className="d-flex items-center justify-center w-[85%] sm:w-[1350px] h-[724px] rounded-xl bg-[#1E1E1E] m-12"
        style={{ backgroundImage: "url('/pagesgraphics/AddTeam/Frame.svg')", display:'flex' }}

      >

        <div className="rounded-3xl h-[319px] w-[90%] sm:w-[838px] d-flex items-center justify-center"
             style={glass}
         >

            <div className="whole justify-center">


            <div className="text-container text-center">

            <h1 className="text-white font-semibold sm:text-4xl text-3xl">Congratulations</h1>
            <h6 className="text-white font-normal sm:text-2xl text-xl">New team made successfully!</h6>
            </div>

            <div className="button-container text-center">
            <button className="d-flex h-11 px-6 text-white m-4 justify-center items-center gap-2 rounded-xl bg-[#E1348B] my-6">
                View team details
              </button>

              <button className="d-flex text-white sm:m-4 h-11 px-6 justify-center items-center gap-2 rounded-xl bg-[#E1348B] my-6">
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
