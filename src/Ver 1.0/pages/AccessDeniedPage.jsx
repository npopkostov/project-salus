import React from "react";
import backgroundlogin from "../assets/backgroundLogin.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHand } from "@fortawesome/free-regular-svg-icons";
import { NavLink } from "react-router-dom";

const AccessDeniedPage = () => {
  return (
    <div
      className={`flex items-center justify-center h-screen bg-cover bg-center transition duration-300`}
      style={{ backgroundImage: `url(${backgroundlogin})` }}
    >
      <div className="text-center ">
        <FontAwesomeIcon icon={faHand} className="h-40 animate-pulse" />
        <div className="text-xl font-light">
          <p className="font-bold pt-5"> Access Denied</p>
          <p> You dont have access to this page</p>
        </div>
        <div className="flex gap-5 mt-12 items-center justify-center">
          <NavLink
            className="bg-blue-400 hover:bg-blue-500 text-white p-2 font-light rounded-sm"
            to="/homepage"
          >
            {" "}
            Homepage
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default AccessDeniedPage;
