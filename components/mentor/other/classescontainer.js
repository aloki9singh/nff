// Verified by Pradhumn
const ClassesContainer = () => {
    const classes = [
      {
        id: 1,
  
        time: '2:30',
        name: 'User Experience Design',
      },
      {
        id: 2,
        time: '4:30',
        name: 'User Experience Design',
      },
    ];
  
    return (
      <div className=" p-3 w-full shrink-0 text-xl text-gray-200">
        <div className="font-medium ml-3 mb-2">Upcoming Classes</div>
        <div className="flex flex-col items-start justify-between text-base text-white">
          {classes.map((item) => (
            <div key={item.id} className="flex flex-row items-start w-full p-2">
              <div className="rounded-md bg-[#E1348B] shrink-0 p-2">4:30</div>
                <div className="flex flex-col justify-center ml-2 text-lg">
                <div className="text-sm">{item.name}</div>
                <p className="text-xs">Online .Zoom Meeting</p>
              </div>
            </div>
          ))}
  
        </div>
      </div>
    );
  };
  
  
  export default ClassesContainer;
  
  