import React, { useState, useEffect, useContext } from "react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
  AreaChart,
  Area,
} from "recharts";
import { AppContext } from "../../context/AppContext";
import Loading from "./Loading";

const DashboardStatisticsElement = ({ events }) => {
  const { dashboardPage } = useContext(AppContext);
  const [loading, setLoading] = useState(true);
  const [totalEventsData, setTotalEventsData] = useState("");
  const [eventsByTypeData, setEventsByTypeData] = useState("");
  const [latestDateObj, setLatestDateObj] = useState("");

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

        const eventsByTypeObj = [
          { subject: "Accidents", total: events.type.accidents },
          { subject: "Arrest", total: events.type.arrest },
          { subject: "Bites", total: events.type.bites },
          { subject: "Drugs", total: events.type.drugs },
          { subject: "Fire", total: events.type.fire },
          { subject: "Forgery", total: events.type.fire },
          { subject: "Identity Theft", total: events.type["identity theft"] },
          { subject: "Illegal Hunting", total: events.type["illegal hunting"] },
          { subject: "Missing Person", total: events.type["missing person"] },
          { subject: "Physical Violence", total: events.type["physical violence"] },
          { subject: "Robbery", total: events.type.robbery },
          { subject: "Shooting", total: events.type.shooting },
          { subject: "Traffic Accident", total: events.type["traffic accident"] },
          { subject: "Traffic Sanctions", total: events.type["traffic sanctions"] },
          { subject: "Unknown", total: events.type.unknown },
        ];

        setTotalEventsData(eventsObj);
        setEventsByTypeData(eventsByTypeObj);
        setLatestDateObj(events.latestDate);

        setLoading(false);
      } catch (error) {
        console.log("Error while updating events for Dashboard/Home", error);
      }
    }
  }, [events]);

  return (
    <>
      <div
        className={
          dashboardPage.isNightMode === false
            ? "flex-grow flex gap-5 flex items-center mr-6 ml-6 rounded-md justify-between bg-white"
            : "flex-grow flex gap-5 flex items-center mr-6 ml-6 rounded-md justify-between bg-[#2A3447]"
        }
      >
        <div className="flex flex-col w-full space-y-5 h-full">
          <div
            className={
              dashboardPage.isNightMode === false
                ? " flex w-full h-full gap-5 "
                : " flex w-full h-full gap-5  "
            }
          >
            {" "}
            <div
              className={
                dashboardPage.isNightMode === false
                  ? "flex flex-col w-full h-full border rounded-md "
                  : "flex flex-col  w-full h-full border border-[#333F55] rounded-md "
              }
            >
              <div className="p-5">
                <div
                  className={
                    dashboardPage.isNightMode === false
                      ? "font-bold text-2xl"
                      : "font-bold text-2xl text-white"
                  }
                >
                  {" "}
                  Events Per Year
                </div>
                <div
                  className={
                    dashboardPage.isNightMode === false
                      ? "flex font-light text-sm"
                      : "flex font-light text-sm text-white"
                  }
                >
                  {" "}
                  28/02/2015 -{" "}
                  {loading === false ? (
                    latestDateObj
                  ) : (
                    <div className="animate-pulse">loading...</div>
                  )}
                </div>
              </div>
              <div className="flex items-center justify-center">
                {loading === true ? (
                  <div className="flex items-center justify-center w-[750px] h-[400px]">
                    {" "}
                    <Loading />
                  </div>
                ) : (
                  <div className="w-full max-w-[750px] h-[400px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart
                        width={750}
                        height={400}
                        data={totalEventsData}
                        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                        style={{ marginTop: "20px" }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="category" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Area
                          type="monotone"
                          dataKey="events"
                          stroke="#6C19FF"
                          fill="#608AFF"
                          dot={{ fill: "#FFFFFF", stroke: "#608AFF", r: 4 }}
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        {/* Events by type */}
        <div className="flex flex-col w-full space-y-5 h-full">
          <div
            className={
              dashboardPage.isNightMode === false
                ? " flex w-full h-full gap-5 "
                : " flex w-full h-full gap-5  "
            }
          >
            {" "}
            <div
              className={
                dashboardPage.isNightMode === false
                  ? "flex flex-col w-full h-full border rounded-md "
                  : "flex flex-col  w-full h-full border border-[#333F55] rounded-md "
              }
            >
              <div className="p-5">
                <div
                  className={
                    dashboardPage.isNightMode === false
                      ? "font-bold text-2xl"
                      : "font-bold text-2xl text-white"
                  }
                >
                  {" "}
                  Events By Type
                </div>
                <div
                  className={
                    dashboardPage.isNightMode === false
                      ? "flex font-light text-sm"
                      : "flex font-light text-sm text-white"
                  }
                >
                  {" "}
                  28/02/2015 -{" "}
                  {loading === false ? (
                    latestDateObj
                  ) : (
                    <div className="animate-pulse">loading...</div>
                  )}
                </div>
              </div>
              <div className="flex items-center justify-center">
                {loading === true ? (
                  <div className="flex items-center justify-center w-[750px] h-[400px]">
                    {" "}
                    <Loading />
                  </div>
                ) : (
                  <div className="w-full max-w-[750px] h-[400px] ">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={eventsByTypeData}
                        margin={{ top: 10, right: 30, left: 20, bottom: 40 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis
                          dataKey="subject"
                          tick={{ fontSize: 10 }}
                          angle={-45}
                          textAnchor="end"
                        />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="total" fill="#608AFF" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DashboardStatisticsElement;
