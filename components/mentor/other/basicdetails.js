// Verified by Pradhumn
export default function BasicDetails() {
  return (
    <div className="">
      <div className="lg:grid lg:grid-cols-3 text-center gap-5  text-white  my-5 mt-5 ">
        <div className="bg-gradient-to-r from-[#A145CD] to-[#E1348B] rounded-2xl  lg:h-32 py-10 my-4 md:my-0">
          <p>{0} min</p>
          <p>Until next class</p>
        </div>
        <div className="bg-gradient-to-r from-[#A145CD] to-[#E1348B] rounded-2xl  lg:h-32 py-10 my-4 md:my-0">
          <p>{0}</p>
          <p>Homework Checked</p>
        </div>
        <div className="bg-gradient-to-r from-[#A145CD] to-[#E1348B] rounded-2xl  lg:h-32 py-10 my-4 md:my-0">
          <p>{0}</p>
          <p>Material Prepared</p>
        </div>
      </div>
    </div>
  );
}
