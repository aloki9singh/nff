import Plan from './plan-dy';


const ChoosePlan = ({ clickEvent, trial, updatePage, updatePrice}) => {



  //plans
  const plan = [
    {
      id: 1,
      title: 'Monthly Plan',
      price: '299',
      from: 'from-[#000000]',
      to: 'to-[#000000]',
      duration: 'Month',
      description: [
        'Get Access To All The Courses',
        'Live Classes With Mentors',
        'Study Material & More',
      ],
    },
    {
      id: 2,
      title: 'Quarterly Plan',
      price: '899',
      from: 'from-[#ff348bcf]',
      to: 'to-[#ee8ebee3]',
      duration: 'Quarterly',
      description: [
        'Get Access To All The Courses',
        'Live Classes With Mentors',
        'StudyupdatePage Material & More',
      ],
    },
    {
      id: 3,
      title: 'Yearly Plan',
      price: '3599',
      from: 'from-[#000000]',
      to: 'to-[#000000]',
      duration: 'Yearly',
      description: [
        'Get Access To All The Courses',
        'Live Classes With Mentors',
        'Study Material & More',
      ],
    },
  ];
  return (
    <>

    {trial ? <>

    <div className={`relative text-wrapper text-center `}>

      <h1 className="text-xl md:text-xl font-semibold ">
        Try 1 week <span className="text-[#E1348B]">
           Free
          </span>
      </h1>

   
      <p className="text-[9px] p-1">

        Cancel Anytime
      </p>
      </div>
    </> : <> 
    <div> <h2 className="text-base md:text-xl mb-2 font-semibold">
        Transparent <span className="text-[#A145CD]">Pricing</span> For You
      </h2> </div>
    </>
    }
      <div className="flex flex-col md:flex-row justify-center w-[90%] pb-20">
        {plan.map((item, ind) => (
          <Plan
            odd={ind % 2 == 0 ? "oddcard" : "evencard"}
            key={item.id}
            title={item.title}
            price={item.price}
            duration={item.duration}
            description={item.description}
            from={item.from}
            to={item.to}
            updatePage={(e) => clickEvent(e)}
            ind={ind}
            trial={trial}
            updateHook={(e)=>updatePage(e)}

            updatePrice={updatePrice}

          />
        ))}
      </div>
    </>
  );
};

export default ChoosePlan;
