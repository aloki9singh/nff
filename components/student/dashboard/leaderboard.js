const LeaderBoard = () => {
    const Leaderboard = [
      //Dummy Data for LeaderBoard
      {
        id: 1,
        rank: "1st",
        image: "",
        name: "Mehul Jain",
        percentage: 99.2,
      },
      {
        id: 2,
        rank: "2nd",
        image: "",
        name: "Mehul Jain",
        percentage: 98.3,
      },
      {
        id: 3,
        rank: "3rd",
        image: "",
        name: "Mehul Jain",
        percentage: 97.4,
      },
    ];
  
    return (
      <div className="  mt-7 rounded-2xl bg-[#373A41] text-white pt-5 pb-1">
        <div className="flex justify-between px-5  items-center">
          <h1 className="text-xl">Leaderboard</h1>
          <button>
            <h1 className="text-[#728095] text-xs">View All</h1>
          </button>
        </div>
        {Leaderboard.map((item) => (
          <div key={item.id} className="text-white flex my-5 items-center p-2 md:text-sm">
            <h1 className="flex-1 flex justify-center">{item.rank}</h1>
            <div className="flex-1 flex justify-center">
              <div className="border rounded-full h-10 w-10 flex justify-center"></div>
            </div>
            <h1 className="flex-[2_2_0%] flex justify-center">{item.name}</h1>
            <h1 className="flex-1 flex justify-center">{item.percentage}</h1>
          </div>
        ))}
      </div>
    );
  };
  
  export default LeaderBoard;
  