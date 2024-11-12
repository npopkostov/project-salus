import React, { useState, useEffect, useContext } from "react";
import Navbar from "../components/Navbar";
import Toolbar from "../components/Toolbar";
import { AppContext } from "../../context/AppContext";
import MapElementEvents from "../components/MapElementEvents";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { EventsContext } from "../../context/EventsContext";
import { HomeContext } from "../../context/HomeContext";

const Events = () => {
  const { dashboardPage } = useContext(AppContext);
  const { dashboardHome } = useContext(HomeContext);
  const { dashboardEvents } = useContext(EventsContext);
  const [events, setEvents] = useState();

  const navigate = useNavigate();

  // Token auth
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/auth/login");
    }

    if (token) {
      axios
        .post("https://project-salus.onrender.com/auth/dashboard", { token: token })
        .then((response) => {
          if (response.status === 200) {
            dashboardPage.setUserName(response.data.username);
            dashboardPage.setUserRole(response.data.role);
            dashboardPage.setUserMail(response.data.mail);
            dashboardPage.setIsAdmin(response.data.role === "admin" ? true : false);
            //
            const lastDateString = dashboardHome.eventsObj.latestDate;
            const [lastDay, lastMonth, lastYear] = lastDateString.split("/");

            dashboardEvents.setDay(lastDay);
            dashboardEvents.setMonth(lastMonth);
            dashboardEvents.setYear(lastYear);
          } else {
            console.log("Response was not successful. Status:", response.status);
            navigate("/auth/login");
          }
        })
        .catch((error) => {
          if (error.status === 403) {
            navigate("/auth/login");
          } else {
            console.log("Error", error);
          }
        });
    }
  }, []);

  useEffect(() => {
    setEvents(dashboardEvents.eventsObj);
  }, [dashboardEvents.eventsObj]);

  return (
    <>
      {/* Main div */}
      <div
        className={
          dashboardPage.isMinimized === false
            ? `grid grid-cols-[15%_85%] w-screen h-screen cursor-pointer transition-all duration-300`
            : `grid grid-cols-[3%_97%] w-screen h-screen cursor-pointer transition-all duration-300`
        }
      >
        {/* navbar */}
        <Navbar />
        {/* dashboard/pages */}
        <div
          className={
            dashboardPage.isNightMode === false
              ? "flex flex-col h-full bg-white"
              : "flex flex-col h-full bg-[#2A3447]"
          }
        >
          <Toolbar />
          <div className="flex-grow ">
            <MapElementEvents data={events} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Events;
