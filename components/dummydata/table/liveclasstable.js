export const Column = [
    {
      Header: "Student name",
      accessor: "Student name",
    },
    {
      Header: "Student ID",
      accessor: "Student ID",
    },
    {
      Header: "Group",
      accessor: "Group",
    },
    {
      Header: "Submission Date",
      accessor: "Submission Date",
    },
    {
      Header: "Status",
      accessor: "Status",
    },
    {
      Header: "Assignment",
      accessor: "name",
      Cell: ({ cell }) => (
        <button className="inline-flex items-center mt-2 py-[10px]  px-[14px] font-raleway text-[#FFFFFF] text-xs  bg-[#E1348B] rounded-lg ">
          CHECK
        </button>
      )
    },
  ];
  