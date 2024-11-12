import React from "react";
import profilePic from "../assets/ProfilePic.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { NavLink } from "react-router-dom";

const Info = () => {
  return (
    <div className="block absolute top-13 right-0 w-[550px] h-full bg-white shadow-2xl">
      <div className="text-center text-lg  pt-5 shadow-sm pb-3"> Info:</div>
      <div className=" p-5 space-y-4">
        {/* START ELEMENT */}
        <div className="">
          <div className="text-center text-sm font-light text-red-800">
            {" "}
            Attention! All events/markers on the map are geolocated approximately.
            <ul className="text-black">
              Confidence score:
              <li>100% : radius of 200-500m </li>
              <li>90% : radius of 500-1000m </li>
              <li>60% : radius of 1000-1500m </li>
              <li>50% : radius of 10km </li>
              <li>30% : radius of 20km </li>
            </ul>
          </div>
          <div className="mt-2 text-md font-bold"> About the project: </div>
          <div className="mt-2 text-sm text-black font-light text-justify">
            {" "}
            EventsMap is my first project developed using the MERN (MongoDB, Express, React,
            Node.js) stack. The goal of this interactive web application is to provide users with an
            intuitive platform to explore events that have occurred across Macedonia since 2015.
            Users can easily browse through various events, filter by date, and access detailed
            information about each event, including location, type and weather data. The application
            uses web scraper that is gathering data from "https://mvr.gov.mk/dnevni-bilteni",
            processes each event to determine where the event happened, what happened and gather
            weather data for that location for that particular date.
          </div>
        </div>
        {/* element end */}
        {/* element start */}
        <div className="">
          <div className="mt-2 text-md font-bold"> Planned updates: </div>
          <div className="mt-2 text-sm text-black font-light text-justify">
            {" "}
            The Statistics feature will allow users to conduct detailed searches in the database to
            generate statistical data. Users will be able to perform various analyses, such as:
            <ul className="text-black">
              <li>
                <div className="flex font-bold">· Comparison Analysis:</div>Evaluating relationships
                between car crash events and weather conditions.
              </li>
              <li>
                <div className="flex font-bold">· Occurrence Analysis:</div>Assessing how often
                specific types of events, like drug-related incidents, occur in particular locations
                (e.g., drug events in Skopje/Aerodrom).
              </li>
              <li>
                <div className="flex font-bold">· Per Capita Analysis:</div>Calculating the rates of
                incidents (e.g., drug-related events, missing persons, animal bites) per capita for
                each region, municipality, location, city, or village in Macedonia.
              </li>
            </ul>
          </div>
        </div>

        {/* END ELEMENT */}
        {/* START ELEMENT */}
        <div className="border p-4">
          <div>Author </div>
          <div className="flex mt-4">
            <div>
              <img src={profilePic} className="h-20" />
            </div>
            <div className="ml-4">
              <div className="text-black font-light text-lg"> Nikola Pop-Kostov</div>
              <div className="flex space-x-2">
                <FontAwesomeIcon className="h-8 text-black" icon={faLinkedin} />
                <NavLink to="https://github.com/npopkostov">
                  <FontAwesomeIcon className="h-8 text-black" icon={faGithub} />
                </NavLink>
              </div>
            </div>
          </div>
        </div>
        {/* END ELEMENT */}
      </div>
    </div>
  );
};

export default Info;
