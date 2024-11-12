import React, { useState, useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import user from "../assets/user.jpg";
import logo from "../../LoginPage/assets/Logo Only.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGlobe,
  faChartSimple,
  faMapLocationDot,
  faNoteSticky,
  faFileLines,
  faScrewdriverWrench,
  faAddressCard,
  faPowerOff,
} from "@fortawesome/free-solid-svg-icons";
import { AppContext } from "../../context/AppContext";

const Navbar = () => {
  const { dashboardPage } = useContext(AppContext);
  const [showLogoutPopup, setShowLogoutPopup] = useState(false);
  const [showHomePopup, setShowHomePopup] = useState(false);
  const [showEventsPopup, setShowEventsPopup] = useState(false);
  const [showStatisticsPopup, setShowStatisticsPopup] = useState(false);
  const [showNotesPopup, setShowNotesPopup] = useState(false);
  const [showDocumentsPopup, setShowDocumentsPopup] = useState(false);
  const [showMyProfilePopup, setShowMyProfilePopup] = useState(false);
  const [showAdminSectionPopup, setShowAdminSectionPopup] = useState(false);

  const navigate = useNavigate();

  // Handle logout and remove token
  const handleLogout = function () {
    localStorage.removeItem("token");
    navigate("/auth/login");
  };

  if (dashboardPage.isMinimized === false) {
    return (
      <>
        <div
          className={
            dashboardPage.isNightMode === false
              ? "flex flex-col justify-between border-r bg-white"
              : "flex flex-col justify-between border-r border-[#333F55]  bg-[#2A3447] text-[#6F809B]"
          }
        >
          <div>
            {" "}
            <div
              className={
                dashboardPage.isNightMode === false
                  ? `"flex flex-col  items-center"`
                  : `"flex flex-col bg-[#2A3447] text-[#6F809B]  items-center"`
              }
            >
              {/* logo */}
              <div className="flex pt-3 pb-3 w-full items-center justify-center">
                {" "}
                <img src={logo} className="mt-2 h-8 w-8" />
                <div className="ml-2 font-extrabold text-2xl">Salus</div>
                <div className="bg-[#615DFF]  rounded-full p-1 h-2 mt-5 "></div>
              </div>
              {/* home/apps */}
              <div className="w-full pr-5 pl-5 mt-10 space-y-2">
                {/* Links */}
                <div className="font-bold text-xs">PAGES</div>
                <NavLink
                  className={
                    dashboardPage.isNightMode === false
                      ? ({ isActive }) =>
                          `flex items-center h-10 rounded-lg pl-2 ${
                            isActive
                              ? "bg-[#5D87FF] text-[#FFFFFF]"
                              : "hover:bg-[#ECF2FF] hover:text-[#5D87FF]"
                          }`
                      : ({ isActive }) =>
                          `flex items-center h-10 rounded-lg pl-2 ${
                            isActive
                              ? "bg-[#5D87FF] text-[#FFFFFF]"
                              : "hover:bg-[#253662] hover:text-[#4868C4]"
                          }`
                  }
                  to="/dashboard/home"
                >
                  {" "}
                  <FontAwesomeIcon icon={faGlobe} className="pr-2" />
                  <div className=""> Home</div>
                </NavLink>
                <NavLink
                  className={
                    dashboardPage.isNightMode === false
                      ? ({ isActive }) =>
                          `flex items-center h-10 rounded-lg pl-2 ${
                            isActive
                              ? "bg-[#5D87FF] text-[#FFFFFF]"
                              : "hover:bg-[#ECF2FF] hover:text-[#5D87FF]"
                          }`
                      : ({ isActive }) =>
                          `flex items-center h-10 rounded-lg pl-2 ${
                            isActive
                              ? "bg-[#5D87FF] text-[#FFFFFF]"
                              : "hover:bg-[#253662] hover:text-[#4868C4]"
                          }`
                  }
                  to="/dashboard/events"
                >
                  {" "}
                  <FontAwesomeIcon icon={faMapLocationDot} className="pr-2" />
                  <div className=""> Events</div>
                </NavLink>
                <NavLink
                  className={
                    dashboardPage.isNightMode === false
                      ? ({ isActive }) =>
                          `flex items-center h-10 rounded-lg pl-2 ${
                            isActive
                              ? "bg-[#5D87FF] text-[#FFFFFF]"
                              : "hover:bg-[#ECF2FF] hover:text-[#5D87FF]"
                          }`
                      : ({ isActive }) =>
                          `flex items-center h-10 rounded-lg pl-2 ${
                            isActive
                              ? "bg-[#5D87FF] text-[#FFFFFF]"
                              : "hover:bg-[#253662] hover:text-[#4868C4]"
                          }`
                  }
                  to="/dashboard/statistics"
                >
                  {" "}
                  <FontAwesomeIcon icon={faChartSimple} className="pr-2" />
                  <div className=""> Statistics</div>
                </NavLink>
                <NavLink
                  className={
                    dashboardPage.isNightMode === false
                      ? ({ isActive }) =>
                          `flex items-center h-10 rounded-lg pl-2 ${
                            isActive
                              ? "bg-[#5D87FF] text-[#FFFFFF]"
                              : "hover:bg-[#ECF2FF] hover:text-[#5D87FF]"
                          }`
                      : ({ isActive }) =>
                          `flex items-center h-10 rounded-lg pl-2 ${
                            isActive
                              ? "bg-[#5D87FF] text-[#FFFFFF]"
                              : "hover:bg-[#253662] hover:text-[#4868C4]"
                          }`
                  }
                  to="/dashboard/notes"
                >
                  {" "}
                  <FontAwesomeIcon icon={faNoteSticky} className="pr-2" />
                  <div className=""> Notes</div>
                </NavLink>
                <NavLink
                  className={
                    dashboardPage.isNightMode === false
                      ? ({ isActive }) =>
                          `flex items-center h-10 rounded-lg pl-2 ${
                            isActive
                              ? "bg-[#5D87FF] text-[#FFFFFF]"
                              : "hover:bg-[#ECF2FF] hover:text-[#5D87FF]"
                          }`
                      : ({ isActive }) =>
                          `flex items-center h-10 rounded-lg pl-2 ${
                            isActive
                              ? "bg-[#5D87FF] text-[#FFFFFF]"
                              : "hover:bg-[#253662] hover:text-[#4868C4]"
                          }`
                  }
                  to="/dashboard/project-info"
                >
                  {" "}
                  <FontAwesomeIcon icon={faFileLines} className="pr-2" />
                  <div className=""> Project Info</div>
                </NavLink>
                <div className="font-bold text-xs">USER</div>
                <NavLink
                  className={
                    dashboardPage.isNightMode === false
                      ? ({ isActive }) =>
                          `flex items-center h-10 rounded-lg pl-2 ${
                            isActive
                              ? "bg-[#5D87FF] text-[#FFFFFF]"
                              : "hover:bg-[#ECF2FF] hover:text-[#5D87FF]"
                          }`
                      : ({ isActive }) =>
                          `flex items-center h-10 rounded-lg pl-2 ${
                            isActive
                              ? "bg-[#5D87FF] text-[#FFFFFF]"
                              : "hover:bg-[#253662] hover:text-[#4868C4]"
                          }`
                  }
                  to={`/dashboard/profile/${dashboardPage.userName}`}
                >
                  {" "}
                  <FontAwesomeIcon icon={faAddressCard} className="pr-2" />
                  <div className=""> My Profile</div>
                </NavLink>
                <div className="font-bold text-xs">TOOLS</div>
                <NavLink
                  className={
                    dashboardPage.isAdmin === true
                      ? dashboardPage.isNightMode === false
                        ? ({ isActive }) =>
                            `flex items-center h-10 rounded-lg pl-2 ${
                              isActive
                                ? "bg-[#5D87FF] text-[#FFFFFF]"
                                : "hover:bg-[#ECF2FF] hover:text-[#5D87FF]"
                            }`
                        : ({ isActive }) =>
                            `flex items-center h-10 rounded-lg pl-2 ${
                              isActive
                                ? "bg-[#5D87FF] text-[#FFFFFF]"
                                : "hover:bg-[#253662] hover:text-[#4868C4]"
                            }`
                      : dashboardPage.isNightMode === false
                      ? "flex items-center h-10 rounded-lg pl-2 text-slate-500 hover:cursor-not-allowed"
                      : "flex items-center h-10 rounded-lg pl-2 text-slate-500 hover:cursor-not-allowed"
                  }
                  to={dashboardPage.isAdmin === true && "/dashboard/admin-section"}
                >
                  {" "}
                  <FontAwesomeIcon icon={faScrewdriverWrench} className="pr-2" />
                  <div className=""> Admin Section</div>
                </NavLink>
              </div>
            </div>
          </div>
          {/* ID START */}
          <div className="flex items-center justify-center w-full">
            <div
              className={
                dashboardPage.isNightMode === false
                  ? "flex m-2 rounded-md h-16 items-center justify-evenly  w-full bg-[#E8F7FF]"
                  : "flex m-2 rounded-md h-16 items-center justify-evenly w-full bg-[#1C455D]"
              }
            >
              {" "}
              <div>
                {" "}
                <img
                  src={user}
                  className={
                    dashboardPage.isNightMode === false
                      ? "border p-1 rounded-full h-14"
                      : "p-2 h-14 rounded-full "
                  }
                />
              </div>
              <div>
                <div className="flex-col items-center justify-center">
                  <div
                    className={
                      dashboardPage.isNightMode === false
                        ? "font-bold text-black"
                        : "font-bold text-white"
                    }
                  >
                    {" "}
                    {dashboardPage.userName && dashboardPage.userName}
                  </div>
                  <div
                    className={
                      dashboardPage.isNightMode === false
                        ? "font-light text-xs text-black"
                        : "font-light text-xs text-[#6D7F99]"
                    }
                  >
                    {" "}
                    {dashboardPage.userRole && dashboardPage.userRole}
                  </div>
                </div>
              </div>
              <div className="flex-col">
                <div>
                  {" "}
                  {showLogoutPopup && (
                    <>
                      <div className="absolute -mt-[25px] -ml-[15px]  px-2 py-1 bg-slate-500 text-white text-xs rounded-xl shadow-lg ">
                        Logout
                      </div>
                    </>
                  )}
                </div>
                <div>
                  {" "}
                  <FontAwesomeIcon
                    icon={faPowerOff}
                    className="p-1 mr-1 h-4 rounded-full hover:bg-[#5D87FF] hover:text-white"
                    onClick={handleLogout}
                    onMouseEnter={() => {
                      setShowLogoutPopup(true);
                    }}
                    onMouseLeave={() => {
                      setShowLogoutPopup(false);
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  } else {
    return (
      <>
        <div
          className={
            dashboardPage.isNightMode === false
              ? "flex flex-col bg-white border items-center"
              : "flex flex-col bg-[#2A3447] text-[#6F809B] border-[#333F55] items-center"
          }
        >
          {/* logo */}
          <div className="flex pt-3 pb-3 w-full items-center justify-center">
            {" "}
            <img src={logo} className="mt-2 h-8 w-8" />
          </div>
          {/* home/apps */}
          <div className="flex flex-col items-center w-full pr-5 pl-5 mt-10 space-y-2">
            {/* Links */}
            <div className="font-bold text-xs">PAGES</div>
            {showHomePopup && (
              <>
                <div className="absolute px-2 py-1 bg-slate-500 text-white text-xs rounded-xl shadow-lg ">
                  Home
                </div>
              </>
            )}
            <NavLink
              className={
                dashboardPage.isNightMode === false
                  ? ({ isActive }) =>
                      `flex items-center h-10 rounded-lg pl-2 ${
                        isActive
                          ? "bg-[#5D87FF] text-[#FFFFFF]"
                          : "hover:bg-[#ECF2FF] hover:text-[#5D87FF]"
                      }`
                  : ({ isActive }) =>
                      `flex items-center h-10 rounded-lg pl-2 ${
                        isActive
                          ? "bg-[#5D87FF] text-[#FFFFFF]"
                          : "hover:bg-[#253662] hover:text-[#4868C4]"
                      }`
              }
              to="/dashboard/home"
              onMouseEnter={() => {
                setShowHomePopup(true);
              }}
              onMouseLeave={() => {
                setShowHomePopup(false);
              }}
            >
              {" "}
              <FontAwesomeIcon icon={faGlobe} className="pr-2" />
              <div className=""></div>
            </NavLink>
            {showEventsPopup && (
              <>
                <div className="absolute -top-[-150px] px-2 py-1 bg-slate-500 text-white text-xs rounded-xl shadow-lg ">
                  Events
                </div>
              </>
            )}
            <NavLink
              className={
                dashboardPage.isNightMode === false
                  ? ({ isActive }) =>
                      `flex items-center h-10 rounded-lg pl-2 ${
                        isActive
                          ? "bg-[#5D87FF] text-[#FFFFFF]"
                          : "hover:bg-[#ECF2FF] hover:text-[#5D87FF]"
                      }`
                  : ({ isActive }) =>
                      `flex items-center h-10 rounded-lg pl-2 ${
                        isActive
                          ? "bg-[#5D87FF] text-[#FFFFFF]"
                          : "hover:bg-[#253662] hover:text-[#4868C4]"
                      }`
              }
              to="/dashboard/events"
              onMouseEnter={() => {
                setShowEventsPopup(true);
              }}
              onMouseLeave={() => {
                setShowEventsPopup(false);
              }}
            >
              {" "}
              <FontAwesomeIcon icon={faMapLocationDot} className="pr-2" />
              <div className=""></div>
            </NavLink>
            {showStatisticsPopup && (
              <>
                <div className="absolute -top-[-200px] px-2 py-1 bg-slate-500 text-white text-xs rounded-xl shadow-lg ">
                  Statistics
                </div>
              </>
            )}
            <NavLink
              className={
                dashboardPage.isNightMode === false
                  ? ({ isActive }) =>
                      `flex items-center h-10 rounded-lg pl-2 ${
                        isActive
                          ? "bg-[#5D87FF] text-[#FFFFFF]"
                          : "hover:bg-[#ECF2FF] hover:text-[#5D87FF]"
                      }`
                  : ({ isActive }) =>
                      `flex items-center h-10 rounded-lg pl-2 ${
                        isActive
                          ? "bg-[#5D87FF] text-[#FFFFFF]"
                          : "hover:bg-[#253662] hover:text-[#4868C4]"
                      }`
              }
              to="/dashboard/statistics"
              onMouseEnter={() => {
                setShowStatisticsPopup(true);
              }}
              onMouseLeave={() => {
                setShowStatisticsPopup(false);
              }}
            >
              {" "}
              <FontAwesomeIcon icon={faChartSimple} className="pr-2" />
              <div className=""></div>
            </NavLink>
            {showNotesPopup && (
              <>
                <div className="absolute -top-[-250px] px-2 py-1 bg-slate-500 text-white text-xs rounded-xl shadow-lg ">
                  Notes
                </div>
              </>
            )}
            <NavLink
              className={
                dashboardPage.isNightMode === false
                  ? ({ isActive }) =>
                      `flex items-center h-10 rounded-lg pl-2 ${
                        isActive
                          ? "bg-[#5D87FF] text-[#FFFFFF]"
                          : "hover:bg-[#ECF2FF] hover:text-[#5D87FF]"
                      }`
                  : ({ isActive }) =>
                      `flex items-center h-10 rounded-lg pl-2 ${
                        isActive
                          ? "bg-[#5D87FF] text-[#FFFFFF]"
                          : "hover:bg-[#253662] hover:text-[#4868C4]"
                      }`
              }
              to="/dashboard/notes"
              onMouseEnter={() => {
                setShowNotesPopup(true);
              }}
              onMouseLeave={() => {
                setShowNotesPopup(false);
              }}
            >
              {" "}
              <FontAwesomeIcon icon={faNoteSticky} className="pr-2" />
              <div className=""></div>
            </NavLink>
            {showDocumentsPopup && (
              <>
                <div className="absolute -top-[-300px] left-[1px] px-2 py-1 bg-slate-500 text-white text-xs rounded-xl shadow-lg ">
                  Project Info
                </div>
              </>
            )}
            <NavLink
              className={
                dashboardPage.isNightMode === false
                  ? ({ isActive }) =>
                      `flex items-center h-10 rounded-lg pl-2 ${
                        isActive
                          ? "bg-[#5D87FF] text-[#FFFFFF]"
                          : "hover:bg-[#ECF2FF] hover:text-[#5D87FF]"
                      }`
                  : ({ isActive }) =>
                      `flex items-center h-10 rounded-lg pl-2 ${
                        isActive
                          ? "bg-[#5D87FF] text-[#FFFFFF]"
                          : "hover:bg-[#253662] hover:text-[#4868C4]"
                      }`
              }
              to="/dashboard/project-info"
              onMouseEnter={() => {
                setShowDocumentsPopup(true);
              }}
              onMouseLeave={() => {
                setShowDocumentsPopup(false);
              }}
            >
              {" "}
              <FontAwesomeIcon icon={faFileLines} className="pr-2" />
              <div className=""> </div>
            </NavLink>
            <div className="font-bold text-xs">USER</div>
            {showMyProfilePopup && (
              <>
                <div className="absolute -top-[-360px] left-1 w-18 px-2 py-1 bg-slate-500 text-white text-xs rounded-xl shadow-lg ">
                  My Profile
                </div>
              </>
            )}
            <NavLink
              className={
                dashboardPage.isNightMode === false
                  ? ({ isActive }) =>
                      `flex items-center h-10 rounded-lg pl-2 ${
                        isActive
                          ? "bg-[#5D87FF] text-[#FFFFFF]"
                          : "hover:bg-[#ECF2FF] hover:text-[#5D87FF]"
                      }`
                  : ({ isActive }) =>
                      `flex items-center h-10 rounded-lg pl-2 ${
                        isActive
                          ? "bg-[#5D87FF] text-[#FFFFFF]"
                          : "hover:bg-[#253662] hover:text-[#4868C4]"
                      }`
              }
              to={`/dashboard/profile/${dashboardPage.userName}`}
              onMouseEnter={() => {
                setShowMyProfilePopup(true);
              }}
              onMouseLeave={() => {
                setShowMyProfilePopup(false);
              }}
            >
              {" "}
              <FontAwesomeIcon icon={faAddressCard} className="pr-2" />
              <div className=""></div>
            </NavLink>
            <div className="font-bold text-xs">TOOLS</div>
            {showAdminSectionPopup && (
              <>
                <div className="absolute -top-[-430px] left-1 w-18 px-2 py-1 bg-slate-500 text-white text-xs rounded-xl shadow-lg ">
                  Admin Section
                </div>
              </>
            )}
            <NavLink
              className={
                dashboardPage.isAdmin === true
                  ? dashboardPage.isNightMode === false
                    ? ({ isActive }) =>
                        `flex items-center h-10 rounded-lg pl-2 ${
                          isActive
                            ? "bg-[#5D87FF] text-[#FFFFFF]"
                            : "hover:bg-[#ECF2FF] hover:text-[#5D87FF]"
                        }`
                    : ({ isActive }) =>
                        `flex items-center h-10 rounded-lg pl-2 ${
                          isActive
                            ? "bg-[#5D87FF] text-[#FFFFFF]"
                            : "hover:bg-[#253662] hover:text-[#4868C4]"
                        }`
                  : dashboardPage.isNightMode === false
                  ? "flex items-center h-10 rounded-lg pl-2  text-slate-500 hover:cursor-not-allowed"
                  : "flex items-center h-10 rounded-lg pl-2  text-slate-500 hover:cursor-not-allowed"
              }
              to={dashboardPage.isAdmin === true && "/dashboard/admin-section"}
              onMouseEnter={() => {
                setShowAdminSectionPopup(true);
              }}
              onMouseLeave={() => {
                setShowAdminSectionPopup(false);
              }}
            >
              {" "}
              <FontAwesomeIcon icon={faScrewdriverWrench} className="pr-2" />
              <div className=""></div>
            </NavLink>
          </div>

          <div className="flex items-end justify-center mb-5 h-full w-full pr-5 pl-5">
            <div className="flex-col text-center items-center justify-center w-full">
              <div>
                {showLogoutPopup && (
                  <>
                    <div className="absolute -mt-[25px] -ml-[15px] mb-1 px-2 py-1 bg-slate-500 text-white text-xs rounded-xl shadow-lg ">
                      Logout
                    </div>
                  </>
                )}
              </div>
              <div>
                {" "}
                <FontAwesomeIcon
                  icon={faPowerOff}
                  className="p-1 h-4 rounded-full hover:bg-[#5D87FF] hover:text-white"
                  onClick={handleLogout}
                  onMouseEnter={() => {
                    setShowLogoutPopup(true);
                  }}
                  onMouseLeave={() => {
                    setShowLogoutPopup(false);
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
};

export default Navbar;
