import React, { useEffect, useContext } from "react";
import Navbar from "../components/Navbar";
import Toolbar from "../components/Toolbar";
import { AppContext } from "../../context/AppContext";
import toolBox from "../assets/toolBox.png";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Admin = () => {
  const { dashboardPage } = useContext(AppContext);
  const navigate = useNavigate();

  // Token auth
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/auth/login");
    }

    if (token) {
      axios
        .post("https://project-salus.onrender.com/auth/dashboard/admin-room", { token: token })
        .then((response) => {
          if (response.status === 200) {
            dashboardPage.setUserName(response.data.username);
            dashboardPage.setUserRole(response.data.role);
            dashboardPage.setUserMail(response.data.mail);
            dashboardPage.setIsAdmin(response.data.role === "admin" ? true : false);
            dashboardNotes.setFetchNotes((prev) => prev + 1);
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
              ? "flex flex-col bg-white"
              : "flex flex-col bg-[#2A3447]"
          }
        >
          <Toolbar />
          <div className="flex flex-grow ">
            <div className="flex flex-col w-full items-center justify-center">
              <img src={toolBox} className="h-[150px] w-[150px]" />
              <div
                className={
                  dashboardPage.isNightMode === false
                    ? "text-2xl font-bold"
                    : "text-2xl font-bold text-white"
                }
              >
                {" "}
                Under Construction{" "}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Admin;
