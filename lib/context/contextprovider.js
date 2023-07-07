import React, { createContext, useState } from "react";

export const adddata = createContext("");
export const adddate = createContext("");  
export const selectSch = createContext("");
export const Loading = createContext("");

const ContextProvider = ({ children }) => {
  const [data, setdata] = useState({
    islog: false,
    email: "",
  });
  const [loading, setLoading] = useState(false);
  const [date, setdate] = useState("");
  const [scheduleSelect, setScheduleSelect] = useState({
    e: "",
  });
  return (
    <adddata.Provider value={{ data, setdata }}>
      <selectSch.Provider value={{ scheduleSelect, setScheduleSelect }}>
      <adddate.Provider value={{ date, setdate }}>
        <Loading.Provider value={{ loading, setLoading }}>
          {children}
        </Loading.Provider>
      </adddate.Provider>
      </selectSch.Provider>
    </adddata.Provider>
  );
};

export default ContextProvider;
