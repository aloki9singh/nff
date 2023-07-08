// Verified by Pradhumn
export default function BasicDetails() {
    return (
      <div className="">
        <div className="lg:grid lg:grid-cols-3 text-center gap-5  text-white  my-5 mt-10 ">
          <div className="bg-gradient-to-r from-[#A145CD] to-[#E1348B] rounded-2xl  lg:h-32 py-10 my-4 md:my-0">
            <p>30 min</p>
            <p>Until next class</p>
          </div>
          <div className="bg-gradient-to-r from-[#A145CD] to-[#E1348B] rounded-2xl  lg:h-32 py-10 my-4 md:my-0">
            <p>15 / 20</p>
            <p>Homework Checked</p>
          </div>
          <div className="bg-gradient-to-r from-[#A145CD] to-[#E1348B] rounded-2xl  lg:h-32 py-10 my-4 md:my-0">
            <p>3 / 5</p>
            <p>Material Prepared</p>
          </div>
        </div>
      </div>
    );
  }
  