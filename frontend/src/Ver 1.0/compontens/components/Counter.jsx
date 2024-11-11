import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  faHashtag,
  faLocationCrosshairs,
  faFire,
  faHandcuffs,
} from "@fortawesome/free-solid-svg-icons";

const Counter = ({ type, events }) => {
  const [totalEvents, setTotalEvents] = useState();
  const [heatplace, setHeatplace] = useState();
  const [heatFelony, setHeatFelony] = useState();
  const [avgConfidenceScore, setAvgConfidenceScore] = useState();

  useEffect(() => {
    if (events.length) {
      let sum = 0;
      let cityCounts = {};
      let felonyCounts = {};
      for (let i = 0; i < events.length; i++) {
        sum += events[i].confidenceScore;

        const city = events[i].location;
        cityCounts[city] = (cityCounts[city] || 0) + 1;

        const felony = events[i].felony;
        felonyCounts[felony] = (felonyCounts[felony] || 0) + 1;
      }

      let mostFrequentCity = "";
      let maxCityCount = 0;
      for (let city in cityCounts) {
        if (cityCounts[city] > maxCityCount) {
          mostFrequentCity = city;
          maxCityCount = cityCounts[city];
        }
      }

      let mostFrequentFelony = "";
      let maxFelonyCount = 0;
      for (let felony in felonyCounts) {
        if (felony !== "unknown" && felonyCounts[felony] > maxFelonyCount) {
          mostFrequentFelony = felony;
          maxFelonyCount = felonyCounts[felony];
        }
      }

      const averageScore = (sum / events.length) * 100;
      setTotalEvents(events.length);
      setHeatplace(mostFrequentCity);
      setHeatFelony(mostFrequentFelony);
      setAvgConfidenceScore(averageScore.toString().slice(0, 4));
    }
  }, [events]);

  let icon = null;
  let colorClass = "";
  let text = "";
  let value = null;

  switch (type) {
    case "total":
      icon = faHashtag;
      colorClass = "text-[rgb(255,185,85)]";
      text = "Total Events";
      value = totalEvents;
      break;

    case "heatplace":
      icon = faFire;
      colorClass = "text-[rgb(251,64,75)]";
      text = "High-Activity area";
      value = heatplace;
      break;
    case "felony":
      icon = faHandcuffs;
      colorClass = "text-black";
      text = "Most frequent felony";
      value = heatFelony;
      break;
    case "confidence":
      icon = faLocationCrosshairs;
      colorClass = "text-[rgb(50,128,247)]";
      text = "Average Confidence Score";
      value = avgConfidenceScore + "%";
      break;
  }
  return (
    <>
      <div className="bg-white border w-full hover:cursor-pointer ">
        <div className="flex h-36">
          <div className="flex w-full items-center justify-center">
            <div className="w-1/2 pl-5">
              {" "}
              <FontAwesomeIcon icon={icon} className={`h-14 pl-5 ${colorClass} `} />
            </div>
            <div className="w-1/2 flex flex-col items-end pr-5">
              <text className="font-light text-right"> {text}:</text>
              <text className="text-lg font-bold">{value !== null ? value : "Loading..."}</text>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Counter;
