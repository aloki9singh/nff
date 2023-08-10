import React from "react";

export default function LeaderBoardMentor({ data }) {


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
                  No statistics found.
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
