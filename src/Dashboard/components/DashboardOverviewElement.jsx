import React, { useState, useEffect, useContext } from "react";
import Loading from "./Loading";
import { AppContext } from "../../context/AppContext";
import CountUp from "react-countup";
import { LineChart, Line, ResponsiveContainer, PieChart, Pie, Cell, Label } from "recharts";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHashtag,
  faMagnifyingGlassLocation,
  faLocationCrosshairs,
  faMagnifyingGlassPlus,
} from "@fortawesome/free-solid-svg-icons";

const DashboardOverviewElement = ({ events }) => {
  const { dashboardPage } = useContext(AppContext);
  const [loading, setLoading] = useState(true);
  const [totalEvents, setTotalEvents] = useState("");
  const [totalEventsPercent, setTotalEventsPercent] = useState(null);
  const [totalEventsData, setTotalEventsData] = useState("");
  const [notLocatedEventsData, setNotLocatedEventsData] = useState("");
  const [notLocatedEventsPercent, setNotLocatedEventsPercent] = useState("");
  const [avgConfidenceScore, setAvgConfidenceScore] = useState("");
  const [totalFelonies, setTotalFelonies] = useState(null);
  const [totalIdentifiedFelonies, setTotalIdentifiedFelonies] = useState(null);
  const [unknownFelonies, setUnknownFelonies] = useState(null);

  useEffect(() => {
    if (events.reports) {
      try {
        const eventsObj = [
          { category: "2015", events: events.year.events2015 },
          { category: "2016", events: events.year.events2016 },
          { category: "2017", events: events.year.events2017 },
          { category: "2018", events: events.year.events2018 },
          { category: "2019", events: events.year.events2019 },
          { category: "2020", events: events.year.events2020 },
          { category: "2021", events: events.year.events2021 },
          { category: "2022", events: events.year.events2022 },
          { category: "2023", events: events.year.events2023 },
          { category: "2024", events: events.year.events2024 },
        ];
        setTotalEvents(events.total + events.notLocated);
        setTotalEventsData(eventsObj);
        setNotLocatedEventsData(events.notLocated);

        const locatedEventsPercentage = parseFloat(
          (events.total / (events.total + events.notLocated)) * 100
        ).toFixed(2);
        setTotalEventsPercent(Number(locatedEventsPercentage));

        const notLocatedEventsPercentage = parseFloat(
          (events.notLocated / (events.total + events.notLocated)) * 100
        ).toFixed(2);
        setNotLocatedEventsPercent(Number(notLocatedEventsPercentage));

        setAvgConfidenceScore(events.avgScore.toString().slice(0, 4));
        const sumOfFelonies = Object.values(events.type).reduce((acc, value) => acc + value, 0);
        setTotalFelonies(sumOfFelonies);
        setUnknownFelonies(events.type.unknown);
        setTotalIdentifiedFelonies(sumOfFelonies - events.type.unknown);

        setLoading(false);
      } catch (error) {
        console.log("Error while updating events for Dashboard/Home", error);
      }
    }
  }, [events]);

  const dataPie = [
    { name: "Total", value: totalEventsPercent },
    { name: "Not Located", value: notLocatedEventsPercent },
  ];
  const colorsPie = ["#FFAE1F", "#608AFF"];

  const avgScorePie = [
    { name: "Total", value: 100 - Number(avgConfidenceScore) },
    { name: "Average Confidence Score", value: Number(avgConfidenceScore) },
  ];
  const avgScoreColors = ["#4ABEFF", "#608AFF"];

  const feloniesPie = [
    { name: "Total Identified Felonies", value: totalIdentifiedFelonies },
    { name: "Unknown Felonies", value: unknownFelonies },
  ];
  const feloniesColors = ["#FA896B", "#FFAE1F"];

  return (
    <div
      className={
        dashboardPage.isNightMode === false
          ? "flex bg-white rounded-lg  mb-2 p-2"
          : "flex bg-[#2A3447] rounded-lg p-2 mb-2"
      }
    >
      {/* //Ovreflow */}
      <div className="flex justify-evenly w-full gap-5 p-5 ">
        {/* //Total Events  */}
        <div
          className={
            dashboardPage.isNightMode === false
              ? "flex-col w-full rounded-md mt-5 bg-[#ECF2FF]"
              : "flex-col w-full rounded-md mt-5 bg-[#253662]"
          }
        >
          <div className="p-5 text-[#608AFF]">
            <div className="flex w-full justify-between ">
              <div className="flex-col">
                <div className=" text-xl font-thin"> Total Events</div>
                <div className="text-center text-3xl font-bold">
                  {loading === false ? (
                    <div>
                      <CountUp start={1} end={totalEvents} duration={2} />
                    </div>
                  ) : (
                    <div className="animate-pulse text-[20px] font-thin">fetching data</div>
                  )}
                </div>
              </div>
              <div>
                {" "}
                <FontAwesomeIcon icon={faHashtag} className={"h-20 opacity-30"} />
              </div>
            </div>
            {/* chart start */}
            <div className="flex items-center justify-center w-full h-[100px]">
              {loading === true ? (
                <Loading />
              ) : (
                <div className="w-full">
                  <LineChart
                    width={250}
                    height={100}
                    data={totalEventsData}
                    margin={{ top: 10, right: 20, left: 20, bottom: 1 }}
                  >
                    <Line type="monotone" dataKey="events" stroke="#608AFF" />
                  </LineChart>
                </div>
              )}
            </div>
            {/* chart end */}
          </div>
        </div>
        {/* end */}
        {/* //Total Identified Events */}
        <div
          className={
            dashboardPage.isNightMode === false
              ? "flex-col w-full rounded-md mt-5 bg-[#FEF5E5]"
              : "flex-col w-full rounded-md mt-5 bg-[#4D3A2A]"
          }
        >
          <div className="p-5 text-[#FFAE1F]">
            <div className="flex w-full justify-between ">
              <div className="flex-col">
                <div className=" text-xl font-thin"> Total Identified Events:</div>
                <div className="text-3xl font-bold">
                  {loading === false ? (
                    <div>
                      <CountUp start={1} end={totalEvents - notLocatedEventsData} duration={2} />
                    </div>
                  ) : (
                    <div className="animate-pulse text-[20px] font-thin">fetching data</div>
                  )}
                </div>
              </div>
              <div>
                {" "}
                <FontAwesomeIcon icon={faMagnifyingGlassLocation} className={"h-20 opacity-30"} />
              </div>
            </div>
            {/* chart start */}
            <div className="flex items-center justify-center w-full h-[100px]">
              {loading === true ? (
                <Loading />
              ) : (
                <div className="w-full">
                  <ResponsiveContainer width={250} height={100}>
                    <PieChart>
                      <Pie
                        data={dataPie}
                        cx="50%" // Center x position
                        cy="50%" // Center y position
                        outerRadius={50} // Outer radius of the pie
                        paddingAngle={5} // Padding between slices
                        dataKey="value"
                        stroke="none"
                        label
                      >
                        {dataPie.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={colorsPie[index % colorsPie.length]} />
                        ))}
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              )}
            </div>
            {/* chart end */}
          </div>
        </div>
        {/* end */}
        {/* //Average Confidence Score */}
        <div
          className={
            dashboardPage.isNightMode === false
              ? "flex-col w-full rounded-md mt-5 bg-[#E8F7FF]"
              : "flex-col w-full rounded-md mt-5 bg-[#1C455D]"
          }
        >
          <div className="p-5 text-[#4ABEFF]">
            <div className="flex w-full justify-between ">
              <div className="flex-col">
                <div className=" text-xl font-thin"> Avg Confidence Score:</div>
                <div className=" text-3xl font-bold">
                  {loading === false ? (
                    <div>
                      <CountUp start={1} end={avgConfidenceScore} duration={2} />%
                    </div>
                  ) : (
                    <div className="animate-pulse text-[20px] font-thin">fetching data</div>
                  )}
                </div>
              </div>
              <div>
                {" "}
                <FontAwesomeIcon icon={faLocationCrosshairs} className={"h-20 opacity-30"} />
              </div>
            </div>
            {/* chart start */}
            <div className="flex items-center justify-center w-full h-[100px]">
              {loading === true ? (
                <Loading />
              ) : (
                <div className="w-full">
                  <ResponsiveContainer width={250} height={100}>
                    <PieChart>
                      <Pie
                        data={avgScorePie}
                        cx="50%" // Center x position
                        cy="50%" // Center y position
                        innerRadius={35}
                        outerRadius={50}
                        fill="#4ABEFF"
                        paddingAngle={0}
                        dataKey="value"
                        stroke="none"
                      >
                        {avgScorePie.map((entry, index) => (
                          <Cell
                            key={`cell-${index}`}
                            fill={avgScoreColors[index % avgScoreColors.length]}
                          />
                        ))}
                        <Label
                          value={`${avgConfidenceScore}%`}
                          position="center"
                          fontSize="16"
                          fill="#4ABEFF"
                          fontWeight="bold" // Set the font weight to bold
                        />
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              )}
            </div>
            {/* chart end */}
          </div>
        </div>
        {/* end */}
        {/* //Felonies identified vs unknown */}
        <div
          className={
            dashboardPage.isNightMode === false
              ? "flex-col w-full rounded-md mt-5 bg-[#FDEDE8]"
              : "flex-col w-full rounded-md mt-5 bg-[#4B313D]"
          }
        >
          <div className="p-5 text-[#FA896B]">
            <div className="flex w-full justify-between ">
              <div className="flex-col">
                <div className=" text-xl font-thin"> Felonies Identified: </div>
                <div className="text-3xl font-bold">
                  {loading === false ? (
                    <div>
                      <CountUp start={1} end={totalIdentifiedFelonies} duration={2} />
                    </div>
                  ) : (
                    <div className="animate-pulse text-[20px] font-thin">fetching data</div>
                  )}
                </div>
              </div>
              <div>
                {" "}
                <FontAwesomeIcon icon={faMagnifyingGlassPlus} className={"h-20 opacity-30"} />
              </div>
            </div>
            {/* chart start */}
            <div className="flex items-center justify-center w-full h-[100px]">
              {loading === true ? (
                <Loading />
              ) : (
                <div className="w-full">
                  <ResponsiveContainer width={250} height={105}>
                    <PieChart>
                      <Pie
                        data={feloniesPie}
                        cx="50%" // Center x position
                        cy="51%" // Center y position
                        innerRadius={35}
                        outerRadius={50}
                        fill="#4ABEFF"
                        paddingAngle={3}
                        dataKey="value"
                        stroke="none"
                        label
                      >
                        {feloniesPie.map((entry, index) => (
                          <Cell
                            key={`cell-${index}`}
                            fill={feloniesColors[index % feloniesColors.length]}
                          />
                        ))}
                        <Label
                          value={`${(
                            (totalIdentifiedFelonies /
                              (unknownFelonies + totalIdentifiedFelonies)) *
                            100
                          ).toFixed(1)}%`}
                          position="center"
                          fontSize="16"
                          fill="#FA896B"
                          fontWeight="bold" // Set the font weight to bold
                        />
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              )}
            </div>
            {/* chart end */}
          </div>
        </div>
        {/* end */}
      </div>
    </div>
  );
};

export default DashboardOverviewElement;
