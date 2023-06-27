import Plan from "../School/Plan";

const ChoosePlan = ({updatePage}) => {
    const plan = [
        {
          id: 1,
          title: "Monthly Plan",
          price: "299",
          from: "from-[#000000]",
          to: "to-[#000000]",
          duration: "Month",
          description: [
            "Get Access To All The Courses",
            "Live Classes With Mentors",
            "Study Material & More",
          ],
        },
        {
          id: 2,
          title: "Quarterly Plan",
          price: "899",
          from: "from-[#ff348bcf]",
          to: "to-[#ee8ebee3]",
          duration: "Quarterly",
          description: [
            "Get Access To All The Courses",
            "Live Classes With Mentors",
            "Study Material & More",
          ],
        },
        {
          id: 3,
          title: "Yearly Plan",
          price: "3599",
          from: "from-[#000000]",
          to: "to-[#000000]",
          duration: "Year",
          description: [
            "Get Access To All The Courses",
            "Live Classes With Mentors",
            "Study Material & More",
          ],
        },
      ];
  return (
    <>
        <h1 className="text-3xl md:text-5xl font-semibold mb-2">Choose Your Plan</h1>
        <h2 className="text-base md:text-xl mb-2 font-semibold">
          Transparent <span className="text-[#A145CD]">Pricing</span> For You
        </h2>
        <p className="text-[9px] md:text-[14px] mb-4">Start With Free Plan And Get Access To Beginner Courses.</p>
        <div className="flex flex-col md:flex-row justify-center w-[90%]">
          {plan.map((item, ind) => (
            <Plan
              key={item.id}
              title={item.title}
              price={item.price}
              duration={item.duration}
              description={item.description}
              from={item.from}
              to={item.to}
              updatePage={updatePage}
              ind={ind}
            />
          ))}
        </div>
    </>
  )
}

export default ChoosePlan