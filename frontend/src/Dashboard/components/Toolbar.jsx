import React, { useState, useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faMoon, faSun, faAddressCard } from "@fortawesome/free-solid-svg-icons";
import { faEnvelope } from "@fortawesome/free-regular-svg-icons";
import { AppContext } from "../../context/AppContext";
import user from "../assets/user.jpg";
const Toolbar = () => {
  const { dashboardPage } = useContext(AppContext);
  const navigate = useNavigate();
  const [showUserProfile, setShowUserProfile] = useState(false);

  const handleMenuClicked = () => {
    dashboardPage.setIsMinimized((prev) => !prev);
  };

  const handleThemeClicked = () => {
    dashboardPage.setIsNightMode((prev) => !prev);
  };

  // Handle logout and remove token
  const handleLogout = function () {
    localStorage.removeItem("token");
    navigate("/auth/login");
  };

  return (
    <div
      className={
        dashboardPage.isNightMode === false
          ? "flex justify-between h-16 bg-white border-b"
          : "flex justify-between h-16 bg-[#2A3447] text-[#6F809B] border-b border-[#333F55]"
      }
    >
      {/* leftDiv */}
      <button className="flex items-center ml-10">
        <FontAwesomeIcon
          icon={faBars}
          className={
            dashboardPage.isNightMode === false
              ? "bg-white rounded-full p-3 hover:bg-[#ECF2FF] hover:text-[#5D87FF]"
              : "rounded-full p-3 hover:bg-[#253662] hover:text-[#4868C4]"
          }
          onClick={handleMenuClicked}
        />
      </button>
      {/* rightDiv */}
      <button className="flex items-center mr-10 space-x-5">
        <div>
          {dashboardPage.isNightMode === false ? (
            <FontAwesomeIcon
              icon={faMoon}
              className="bg-white rounded-full p-3 hover:bg-[#ECF2FF] hover:text-[#5D87FF]"
              onClick={handleThemeClicked}
            />
          ) : (
            <FontAwesomeIcon
              icon={faSun}
              className=" rounded-full p-3 hover:bg-[#253662] hover:text-[#4868C4]"
              onClick={handleThemeClicked}
            />
          )}
        </div>
        <div className="">
          <img
            src={user}
            className="border p-1 rounded-full h-12 hover:bg-[#ECF2FF] hover:border-0"
            onClick={() => {
              setShowUserProfile((prev) => !prev);
            }}
          />
          {showUserProfile && (
            <div
              className={
                dashboardPage.isNightMode === false
                  ? "absolute right-[40px] top-[60px] w-[300px] h-[300px] border rounded-lg shadow-lg flex-col bg-white z-50"
                  : "absolute right-[40px] top-[60px] w-[300px] h-[300px] border border-[#333F55] rounded-lg shadow-3xl flex-col bg-[#2A3447] z-50"
              }
            >
              <div className="flex flex-col p-5 h-full">
                <div
                  className={
                    dashboardPage.isNightMode === false
                      ? "flex font-bold text-xl"
                      : "flex text-white font-bold text-xl"
                  }
                >
                  User Profile
                </div>
                <div className="flex mt-5">
                  <div className="flex gap-2 ">
                    <div className="h-18 w-20">
                      <img src={user} className="border p-1 rounded-full h-20" />
                    </div>
                    <div className="flex-col">
                      <div
                        className={
                          dashboardPage.isNightMode === false
                            ? "flex text-black"
                            : " flex text-white"
                        }
                      >
                        {" "}
                        {dashboardPage.userName}
                      </div>
                      <div className="flex text-sm"> {dashboardPage.userRole}</div>
                      <div className="flex items-center gap-2">
                        <FontAwesomeIcon icon={faEnvelope} className="" />
                        <div className="text-xs">{dashboardPage.userMail}</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  className={
                    dashboardPage.isNightMode === false
                      ? "border-b mt-4 mb-4"
                      : "border-b mt-4 mb-4 border-[#333F55]"
                  }
                ></div>
                <NavLink
                  className="flex items-center gap-3"
                  to={`/dashboard/profile/${dashboardPage.userName}`}
                >
                  <div>
                    {" "}
                    <FontAwesomeIcon
                      icon={faAddressCard}
                      className={
                        dashboardPage.isNightMode === false
                          ? "bg-[#ECF2FF] text-[#5D87FF] rounded-md p-3 h-6"
                          : "bg-[#253662] text-[#5D87FF] rounded-md p-3 h-6"
                      }
                    />
                  </div>
                  <div className="flex-col mb-1">
                    <div className="flex hover:text-[#5D87FF]"> My Profile</div>
                    <div className="text-sm"> Account Settings</div>
                  </div>
                </NavLink>
                <div className="flex items-end justify-center h-full w-full ">
                  <button
                    className={
                      dashboardPage.isNightMode === false
                        ? "w-full border p-1 text-sm rounded-md bg-white text-[#5D87FF] hover:bg-[#5D87FF] hover:text-white border-[#5D87FF] text-center"
                        : "w-full border p-1 text-sm rounded-md bg-[#253662] text-[#5D87FF] hover:bg-[#5D87FF] hover:text-white border-[#5D87FF] text-center"
                    }
                    onClick={handleLogout}
                  >
                    {" "}
                    Logout
                  </button>
                </div>
              </div>

              {/* bottom */}
            </div>
          )}
        </div>
      </button>
    </div>
  );
};

export default Toolbar;
