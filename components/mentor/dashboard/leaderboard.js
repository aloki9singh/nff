import React from "react";

export default function LeaderBoardMentor({ data }) {
  // const data = [
  //   { name: "John", group: "A", lastTest: "2022-05-15" },
  //   { name: "Sarah", group: "B", lastTest: "2023-01-10" },
  //   { name: "David", group: "A", lastTest: "2023-06-20" },
  //   { name: "Emily", group: "C", lastTest: "2023-03-05" },
  //   { name: "Michael", group: "B", lastTest: "2023-07-01" },
  // ];

  return (
    <div className="flex flex-col items-center min-h-[94%] mx-auto h-full bg-[#373A41] text-white rounded-2xl mb-8 w-full">
      <h1 className="text-xl p-4">Student Leaderboard</h1>

      <div className="container mx-auto pb-8">
        <table className="table-auto w-full text-sm">
          <thead className="border-y">
            <tr>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Group</th>
              <th className="px-4 py-2">Last Test</th>
            </tr>
          </thead>
          <tbody>
            {data.length == 0 ? (
              <tr>
                <td
                  className="px-4 py-2 text-gray-500 text-center"
                  colSpan="3"
                  height={"200px"}
                >
                  No tasks created yet
                </td>
              </tr>
            ) : (
              data.map((item, index) => (
                <tr key={index}>
                  <td className="px-4 py-2">{item.name}</td>
                  <td className="px-4 py-2">{item.group}</td>
                  <td className="px-4 py-2">{item.lastTest}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
