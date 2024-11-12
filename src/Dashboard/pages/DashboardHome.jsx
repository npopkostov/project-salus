import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../../context/AppContext";
import Navbar from "../components/Navbar";
import Toolbar from "../components/Toolbar";
import DashboardOverviewElement from "../components/DashboardOverviewElement";
import DashboardStatisticsElement from "../components/DashboardStatisticsElement";
import { HomeContext } from "../../context/HomeContext";
import Loading from "../components/Loading";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const DashboardHome = () => {
  const { dashboardPage } = useContext(AppContext);
  const { dashboardHome } = useContext(HomeContext);
  const [events, setEvents] = useState();
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  //Token auth
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

  // Set events.data
  useEffect(() => {
    if (dashboardHome.eventsObj) {
      setEvents(dashboardHome.eventsObj);
    }
  }, [dashboardHome.eventsObj]);

  useEffect(() => {
    setLoading(false);
  }, [events]);

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
        {/* Navbar */}
        <Navbar />

        {/* Toolbar and Page Content Wrapper */}
        <div
          className={
            dashboardPage.isNightMode === false
              ? "flex flex-col bg-white h-full"
              : "flex flex-col bg-[#2A3447] h-full"
          }
        >
          {/* Toolbar */}
          <Toolbar />

          {/* Page Content */}
          {loading === true ? (
            <Loading />
          ) : (
            <div
              className={
                dashboardPage.isNightMode === false
                  ? "flex-grow flex flex-col bg-white p-3"
                  : "flex-grow flex flex-col bg-[#2A3447] p-3"
              }
            >
              <DashboardOverviewElement events={events} />
              <DashboardStatisticsElement events={events} />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default DashboardHome;
