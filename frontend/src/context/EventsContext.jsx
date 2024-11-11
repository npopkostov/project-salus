import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { HomeContext } from "./HomeContext";

const EventsContext = createContext();

const EventsProvider = ({ children }) => {
  const { dashboardHome } = useContext(HomeContext);
  const [eventsObj, setEventsObj] = useState();
  const [day, setDay] = useState();
  const [month, setMonth] = useState();
  const [year, setYear] = useState();
  const [avgConfidenceScore, setAvgConfidenceScore] = useState();
  const [mostFrequentLocation, setMostFrequentLocation] = useState("");

  // Fetch Events for date
  useEffect(() => {
    if (day && month && year) {
      try {
        axios
          .get("/data/dashboard/events", {
            params: {
              day,
              month,
              year,
            },
          })
          .then((response) => {
            if (response.status === 200) {
              setEventsObj(response.data.events);

              setAvgConfidenceScore(Number(response.data.avgConfidenceScore) * 100);
              setMostFrequentLocation(response.data.mostFrequentLocation);
            }
          })
          .catch((error) => {
            console.log("Error fetching events", error);
          });
      } catch (error) {
        console.log("Server error", error);
      }
    }
  }, [day, month, year]);

  return (
    <EventsContext.Provider
      value={{
        dashboardEvents: {
          day,
          setDay,
          month,
          setMonth,
          year,
          setYear,
          eventsObj,
          avgConfidenceScore,
          mostFrequentLocation,
        },
      }}
    >
      {children}
    </EventsContext.Provider>
  );
};

export { EventsProvider, EventsContext };
