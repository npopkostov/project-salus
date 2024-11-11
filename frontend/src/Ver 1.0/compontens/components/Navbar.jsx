import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import user from "../assets/user.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSortDown,
  faMap,
  faChartSimple,
  faHammer,
  faRightToBracket,
} from "@fortawesome/free-solid-svg-icons";

const Navbar = ({ userName }) => {
  const navigate = useNavigate();

  // Handle logout and remove token ?? (do i have to remove token?)
  const handleLogout = function () {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <>
      <nav
        id="nav-bar"
        className="flex flex-col bg-gradient-to-b from-[rgb(20,30,27)] to-[rgb(61,61,68)]"
      >
        <div id="nav-div" className="flex items-center justify-center">
          <div id="logo-div" className="flex w-[200px] p-3 border-b">
            <img className="flex h-8 items-center justify-center" src={logo} />

            <div
              id="logo-text-div"
              className="flex flex-col pt-1 pl-5 items-center justifty-center text-white font-normal text-m"
            >
              EVENTS MAP
            </div>
          </div>
        </div>

        <div id="user-div" className="flex items-center justify-center pt-2">
          <div id="logo-div" className="flex items-center justify-center w-full p-3 pb-4 border-b">
            <img className="flex h-10 items-center justify-center " src={user} />
            <div
              id="logo-text-div"
              className="flex flex-col pl-5 items-center justifty-center text-white font-light text-m"
            >
              {userName ? userName : "Visitor"}
            </div>
            <button className="text-white w-[30px] pb-2 pl-2 hover:text-[rgb(52,142,237)]">
              {" "}
              {/* <FontAwesomeIcon icon={faSortDown} /> FUTURE UPDATE */}
            </button>
          </div>
        </div>

        <nav className="flex flex-col gap-2 text-white p-2 font-extralight items-left hover:cursor-pointer">
          <NavLink
            className={({ isActive }) =>
              isActive
                ? "flex items-center justufy-center p-3 rounded-md bg-[rgb(52,142,237)]"
                : "flex items-center justufy-center p-3 rounded-md hover:bg-[rgb(52,142,237)]"
            }
            to="/homepage"
          >
            <FontAwesomeIcon icon={faMap} className="pr-2 h-6" />{" "}
            <p className="text-l pl-2"> Overview</p>
          </NavLink>
          <div>
            <NavLink
              className={({ isActive }) =>
                isActive
                  ? "flex items-center justufy-center p-3 rounded-md bg-[rgb(52,142,237)]"
                  : "flex items-center justufy-center p-3 rounded-md hover:bg-[rgb(52,142,237)]"
              }
              to="/statistics"
            >
              <FontAwesomeIcon icon={faChartSimple} className="pr-2 h-6" />
              <p className="text-l pl-2"> Statistics</p>
            </NavLink>
          </div>
          <div>
            <NavLink
              className={({ isActive }) =>
                isActive
                  ? "flex items-center justufy-center p-3 rounded-md bg-[rgb(52,142,237)]"
                  : "flex items-center justufy-center p-3 rounded-md hover:bg-[rgb(52,142,237)]"
              }
              to="/admin-room"
            >
              <FontAwesomeIcon icon={faHammer} className="pr-2 h-6" />{" "}
              <p className="text-l pl-2"> Admin Room</p>
            </NavLink>
          </div>
        </nav>
        <div className="flex items-center text-white justufy-center mt-auto mb-2 ml-2 mr-2 p-2 rounded-md ">
          <NavLink className="flex items-center justift-center mb-2" onClick={handleLogout}>
            <FontAwesomeIcon icon={faRightToBracket} className="pr-2 h-6" />
            <p className="text-l pl-2"> Logout</p>
          </NavLink>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
