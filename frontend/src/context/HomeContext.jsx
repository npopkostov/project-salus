import React, { createContext, useEffect, useState } from "react";
import axios from "axios";

const HomeContext = createContext();

const HomeProvider = ({ children }) => {
  // DATA
  // Events detailed obj
  const [eventsObj, setEventsObj] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        await axios
          .get("/data/dashboard/home")
          .then((response) => {
            if (response.status === 200) {
              setEventsObj(response.data.dataObj);
            }
          })
          .catch((error) => {
            console.log("Error fetching data", error);
          });
      } catch (error) {
        console.log("Server error", error);
      }
    };
    fetchData();
  }, []);

  return (
    <HomeContext.Provider
      value={{
        dashboardHome: { eventsObj },
      }}
    >
      {children}
    </HomeContext.Provider>
  );
};

export { HomeProvider, HomeContext };
