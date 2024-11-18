import React, { useState, useEffect, useContext } from "react";
import { AppContext } from "../../context/AppContext";
import LeafletMap from "./LeafletMap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHashtag,
  faLocationCrosshairs,
  faFire,
  faCalendarDays,
  faInfo,
  faFireExtinguisher,
  faCarBurst,
  faPills,
  faHandcuffs,
  faDog,
  faGun,
  faTrafficLight,
  faBurst,
  faPersonCircleQuestion,
  faSackDollar,
  faExclamation,
  faCopy,
  faShieldCat,
  faIdCard,
  faPersonFallingBurst,
} from "@fortawesome/free-solid-svg-icons";
import CountUp from "react-countup";
import { EventsContext } from "../../context/EventsContext";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { HomeContext } from "../../context/HomeContext";

const MapElementEvents = ({ data }) => {
  const { dashboardPage } = useContext(AppContext);
  const { dashboardHome } = useContext(HomeContext);
  const { dashboardEvents } = useContext(EventsContext);
  const [loading, setLoading] = useState(true);
  const [isInfoClicked, setIsInfoClicked] = useState(false);
  const [isChangeDateBtnClicked, setIsChangeBtnClicked] = useState(false);
  const [date, setDate] = useState(new Date());
  const [day, setDay] = useState();
  const [month, setMonth] = useState();
  const [year, setYear] = useState();
  const [maxDate, setMaxDate] = useState();

  const handleDateChange = (date) => {
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    setDay(day);
    setMonth(month);
    setYear(year);

    setLoading(true);
  };

  useEffect(() => {
    const latestDate = new Date(dashboardHome.eventsObj.latestDate);
    setMaxDate(latestDate.toLocaleDateString("en-US"));

    dashboardEvents.setDay(day);
    dashboardEvents.setMonth(month);
    dashboardEvents.setYear(year);
  }, [date]);

  useEffect(() => {
    if (data) {
      const [day, month, year] = dashboardHome.eventsObj.latestDate.split("/");
      const latestDate = new Date(`${year}-${month}-${day}`);
      setMaxDate(latestDate);
      setLoading(false);
    }
  }, [data]);

  return (
    <>
      <div className="flex flex-col h-full w-full space-y-5 p-3  ">
        <div
          className={
            dashboardPage.isNightMode === false
              ? "flex border rounded-md shadow items-center justify-around p-4"
              : "flex border border-[#333F55] rounded-md shadow items-center justify-around p-4 text-[#6F809B]"
          }
        >
          <div className="flex gap-2 items-center">
            {" "}
            <FontAwesomeIcon icon={faCalendarDays} className="h-4 text-[#615DFF]" />
            Date:{" "}
            {loading === false ? (
              <div className="">
                {`${dashboardEvents.day}/${dashboardEvents.month}/${dashboardEvents.year}`}
              </div>
            ) : (
              <div className="animate-pulse">fetching date</div>
            )}
          </div>
          <div
            className={
              dashboardPage.isNightMode === false
                ? "border-r h-full border-black"
                : "border-r h-full  border-[#333F55]"
            }
          ></div>{" "}
          {/* TotalEvents */}
          <div className="flex items-center gap-1">
            <FontAwesomeIcon icon={faHashtag} className="h-4 text-[#608AFF]" />
            <div className="flex gap-2">
              Total Events:{" "}
              {loading === false ? (
                <CountUp start={1} end={data.length} duration={2} />
              ) : (
                <div>
                  <div className="animate-pulse">fetching...</div>
                </div>
              )}
            </div>{" "}
          </div>
          {/* End */}
          {/* TotalEvents */}
          <div className="flex items-center gap-1">
            <FontAwesomeIcon icon={faFire} className="h-4 text-[#FA896B]" />
            <div className="flex items-center gap-2">
              High Activity Area:{" "}
              {loading === false ? (
                <div> {dashboardEvents.mostFrequentLocation} </div>
              ) : (
                <div>
                  <div className="animate-pulse">calculating...</div>
                </div>
              )}
            </div>{" "}
          </div>
          {/* End */}
          {/* TotalEvents */}
          <div className="flex items-center gap-1">
            <FontAwesomeIcon icon={faLocationCrosshairs} className="h-4 text-[#4ABEFF]" />
            <div className="flex items-center gap-2">
              Avg Confidence Score:{" "}
              {loading === false ? (
                <div>
                  {" "}
                  <CountUp start={1} end={dashboardEvents.avgConfidenceScore} duration={2} />%{" "}
                </div>
              ) : (
                <div>
                  <div className="animate-pulse">fetching...</div>
                </div>
              )}{" "}
            </div>{" "}
          </div>
          {/* End */}
          <div
            className={
              dashboardPage.isNightMode === false
                ? "border-r h-full border-black"
                : "border-r h-full border-[#333F55]"
            }
          ></div>{" "}
          <button
            className={
              dashboardPage.isNightMode === false
                ? "bg-white text-[#5D87FF] hover:bg-[#5D87FF] hover:text-white border p-1 rounded-md"
                : "bg-[#253662] text-[#5D87FF] hover:bg-[#5D87FF] hover:text-white border-[#5D87FF] border p-1 rounded-md"
            }
            onClick={() => {
              setIsChangeBtnClicked((prev) => !prev);
            }}
          >
            Change Date
          </button>
          <div
            className={
              isChangeDateBtnClicked === false
                ? "hidden"
                : `${
                    dashboardPage.isNightMode === false
                      ? "flex items-center justify-center absolute border shadow-lg top-[135px] right-[150px] w-[350px] h-[330px] bg-white p-5 z-50 rounded-md"
                      : "flex items-center justify-center absolute border shadow-lg top-[135px] right-[150px] w-[350px] h-[330px] bg-[#253662] text-[#5D87FF] border border-[#5D87FF] rounded-md p-5 z-50"
                  }`
            }
          >
            <Calendar
              className={
                dashboardPage.isNightMode === false
                  ? "!border-none !shadow-none"
                  : "!border-none !shadow-none !bg-[#253662]"
              }
              minDate={new Date("2015-02-28")}
              maxDate={new Date(maxDate)}
              value={date}
              onChange={(newDate) => {
                setDate(newDate);
                handleDateChange(newDate);
              }}
            />
          </div>
          {/* legend/key */}
          <button className="">
            {" "}
            <FontAwesomeIcon
              icon={faInfo}
              className={
                dashboardPage.isNightMode === false
                  ? `rounded-xl ${
                      isInfoClicked === true ? "bg-[#ECF2FF] text-[#5D87FF] " : "bg-white"
                    } hover:bg-[#ECF2FF] hover:text-[#5D87FF] p-1 px-2`
                  : `rounded-xl hover:bg-[#253662] ${
                      isInfoClicked === true ? "bg-[#253662] text-[#FFFFFF] " : ""
                    }  p-1 px-2`
              }
              onClick={() => {
                setIsInfoClicked((prev) => !prev);
              }}
            />
            <div
              className={
                isInfoClicked === true
                  ? dashboardPage.isNightMode === false
                    ? "block absolute border shadow-xl rounded-md top-1/4 right-12 w-[300px] h-[600] bg-white shadow-2xl z-40"
                    : "block absolute border-[#333F55] border  top-1/4 shadow-xl rounded-md  right-12 w-[300px] h-[600] bg-[#2A3447] shadow-2xl z-40"
                  : "hidden"
              }
            >
              <div className="text-center text-lg  pt-5 shadow-sm pb-3"> Info:</div>
              <div className="flex flex-col p-5">
                <div className="p-5 space-y-2">
                  {/* ELEMENT START */}
                  <div className="flex">
                    <div className="flex items-center justify-center rounded-xl bg-[#f87171] w-6 h-6 ">
                      <FontAwesomeIcon className="h-4 text-white" icon={faFireExtinguisher} />
                    </div>
                    <div className="ml-2"> Fire event</div>
                  </div>
                  {/* ELEMENT END */}
                  {/* ELEMENT START */}
                  <div className="flex">
                    <div className="flex items-center justify-center rounded-xl bg-[#fdba74] w-6 h-6 ">
                      <FontAwesomeIcon className="h-4 text-white" icon={faCarBurst} />
                    </div>
                    <div className="ml-2"> Traffic accident</div>
                  </div>
                  {/* ELEMENT END */}
                  {/* ELEMENT START */}
                  <div className="flex">
                    <div className="flex items-center justify-center rounded-xl bg-[#64748b] w-6 h-6 ">
                      <FontAwesomeIcon className="h-4 text-white" icon={faPills} />
                    </div>
                    <div className="ml-2"> Drugs</div>
                  </div>
                  {/* ELEMENT END */}
                  {/* ELEMENT START */}
                  <div className="flex">
                    <div className="flex items-center justify-center rounded-xl bg-[#f87171] w-6 h-6 ">
                      <FontAwesomeIcon className="h-4 text-white" icon={faHandcuffs} />
                    </div>
                    <div className="ml-2"> Arrest</div>
                  </div>
                  {/* ELEMENT END */}
                  {/* ELEMENT START */}
                  <div className="flex">
                    <div className="flex items-center justify-center rounded-xl bg-[#facc15] w-6 h-6 ">
                      <FontAwesomeIcon className="h-4 text-white" icon={faDog} />
                    </div>
                    <div className="ml-2"> Bites</div>
                  </div>
                  {/* ELEMENT END */}
                  {/* ELEMENT START */}
                  <div className="flex">
                    <div className="flex items-center justify-center rounded-xl bg-[#000000] w-6 h-6 ">
                      <FontAwesomeIcon className="h-4 text-white" icon={faGun} />
                    </div>
                    <div className="ml-2"> Shooting</div>
                  </div>
                  {/* ELEMENT END */}
                  {/* ELEMENT START */}
                  <div className="flex">
                    <div className="flex items-center justify-center rounded-xl bg-[#d946ef] w-6 h-6 ">
                      <FontAwesomeIcon className="h-4 text-white" icon={faBurst} />
                    </div>
                    <div className="ml-2"> Physical violence</div>
                  </div>
                  {/* ELEMENT END */}
                  {/* ELEMENT START */}
                  <div className="flex">
                    <div className="flex items-center justify-center rounded-xl bg-[#3b82f6] w-6 h-6 ">
                      <FontAwesomeIcon className="h-4 text-white" icon={faTrafficLight} />
                    </div>
                    <div className="ml-2"> Traffic sanctions</div>
                  </div>
                  {/* ELEMENT END */}
                  {/* ELEMENT START */}
                  <div className="flex">
                    <div className="flex items-center justify-center rounded-xl bg-[#fbbf24] w-6 h-6 ">
                      <FontAwesomeIcon className="h-4 text-white" icon={faPersonCircleQuestion} />
                    </div>
                    <div className="ml-2"> Missing person</div>
                  </div>
                  {/* ELEMENT END */}
                  {/* ELEMENT START */}
                  <div className="flex">
                    <div className="flex items-center justify-center rounded-xl bg-[#3b82f6] w-6 h-6 ">
                      <FontAwesomeIcon className="h-4 text-white" icon={faSackDollar} />
                    </div>
                    <div className="ml-2"> Robbery</div>
                  </div>
                  {/* ELEMENT END */}
                  {/* ELEMENT START */}
                  <div className="flex">
                    <div className="flex items-center justify-center rounded-xl bg-[#7360f2] w-6 h-6 ">
                      <FontAwesomeIcon className="h-4 text-white" icon={faCopy} />
                    </div>
                    <div className="ml-2"> Forgery</div>
                  </div>
                  {/* ELEMENT END */}
                  {/* ELEMENT START */}
                  <div className="flex">
                    <div className="flex items-center justify-center rounded-xl bg-[#008000] w-6 h-6 ">
                      <FontAwesomeIcon className="h-4 text-white" icon={faShieldCat} />
                    </div>
                    <div className="ml-2"> Illegal hunting</div>
                  </div>
                  {/* ELEMENT END */}
                  {/* ELEMENT START */}
                  <div className="flex">
                    <div className="flex items-center justify-center rounded-xl bg-[#dc9e43] w-6 h-6 ">
                      <FontAwesomeIcon className="h-4 text-white" icon={faIdCard} />
                    </div>
                    <div className="ml-2"> Identity theft</div>
                  </div>
                  {/* ELEMENT END */}
                  {/* ELEMENT START */}
                  <div className="flex">
                    <div className="flex items-center justify-center rounded-xl bg-[#7F171F] w-6 h-6 ">
                      <FontAwesomeIcon className="h-4 text-white" icon={faPersonFallingBurst} />
                    </div>
                    <div className="ml-2"> Accidents</div>
                  </div>
                  {/* ELEMENT END */}
                  {/* ELEMENT START */}
                  <div className="flex">
                    <div className="flex items-center justify-center rounded-xl bg-[#f87171] w-6 h-6 ">
                      <FontAwesomeIcon className="h-4 text-white" icon={faExclamation} />
                    </div>
                    <div className="ml-2"> Unknown event</div>
                  </div>
                  {/* ELEMENT END */}
                </div>
              </div>
            </div>
          </button>
          {/* end */}
        </div>
        <div className="flex flex-grow w-full">
          <LeafletMap data={data} />
        </div>
      </div>
    </>
  );
};

export default MapElementEvents;
