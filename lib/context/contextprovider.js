import React, { createContext, useState } from "react";

export const adddata = createContext("");
export const adddate = createContext("");
export const selectSch = createContext("");

const ContextProvider = ({ children }) => {
  const [data, setdata] = useState({
    islog: false,
    email: "",
  });
  const [date, setdate] = useState("");
  const [scheduleSelect, setScheduleSelect] = useState({
    e: "",
  });
  return (
    <adddata.Provider value={{ data, setdata }}>
      <selectSch.Provider value={{ scheduleSelect, setScheduleSelect }}>
        <adddate.Provider value={{ date, setdate }}>
          {children}
        </adddate.Provider>
      </selectSch.Provider>
    </adddata.Provider>
  );
};

export default ContextProvider;
