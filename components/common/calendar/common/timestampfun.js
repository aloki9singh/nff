export const timestampfunc = (timestamp) => {
    const dateStr = new Date(timestamp);
    const date = new Date(dateStr);
    const year = date.getFullYear();
    const monthIndex = date.getMonth();
    const day = date.getDate();
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    const month = monthNames[monthIndex];
  
    return  year+"-"+month+"-"+day ;
  };
  
  export const getMonthName = (month) => {
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    return monthNames[month - 1];
  };
  