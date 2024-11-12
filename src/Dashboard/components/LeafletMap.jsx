import React, { useState, useEffect, useContext } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import ReactDOMServer from "react-dom/server";
import "leaflet/dist/leaflet.css";
import { AppContext } from "../../context/AppContext";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
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
  faBuilding,
  faLocationDot,
  faLocationCrosshairs,
  faFlag,
  faCloudSun,
} from "@fortawesome/free-solid-svg-icons";
import MarkerElement from "./MarkerElement";

const LeafletMap = ({ data }) => {
  const { dashboardPage } = useContext(AppContext);
  const [markers, setMarkers] = useState();

  // const felonyObj = [
  //   { fire: "fire", details: { icon: faFireExtinguisher, color: `#f87171` } },
  //   { "traffic accident": "traffic accident", details: { icon: faCarBurst, color: `#fdba74` } },
  //   { drugs: "drugs", details: { icon: faPills, color: `#64748b` } },
  //   { arrest: "arrest", details: { icon: faHandcuffs, color: `#f87171` } },
  //   { bites: "bites", details: { icon: faDog, color: `#facc15` } },
  //   { shooting: "shooting", details: { icon: faGun, color: `#000000` } },
  //   { "physical violence": "physical violence", details: { icon: faBurst, color: `#d946ef` } },
  //   {
  //     "traffic sanctions": "traffic sanctions",
  //     details: { icon: faTrafficLight, color: `#3b82f6` },
  //   },
  //   {
  //     "missing person": "missing person",
  //     details: { icon: faPersonCircleQuestion, color: `#fbbf24` },
  //   },
  //   { robbery: "robbery", details: { icon: faSackDollar, color: `#3b82f6` } },
  //   { forgery: "forgery", details: { icon: faCopy, color: `#7360f2` } },
  //   { "illegal hunting": "illegal hunting", details: { icon: faShieldCat, color: `#008000` } },
  //   { "identity theft": "identity theft", details: { icon: faIdCard, color: `#dc9e43` } },
  //   { accidents: "accidents", details: { icon: faPersonFallingBurst, color: `#7F171F` } },
  //   { unknown: "unknown", details: { icon: faExclamation, color: `#f87171` } },
  // ];

  // Create offset of coordinates
  // const createOffSet = (lat, lon) => {
  //   const latOffSet = (Math.random() - 0.5) * 0.0045;
  //   const lonOffset = (Math.random() - 0.5) * 0.0045;

  //   return [lat + latOffSet, lon + lonOffset];
  // };

  //Create icon for LeafletMap in accordance to the felony
  // const createIcon = (object) => {
  //   const type = object.felony;
  //   const felonyType = felonyObj.find((felony) => felony[type]);

  //   const bg = felonyType.details.color;
  //   const icon = felonyType.details.icon;

  //   return L.divIcon({
  //     className: "custom-div-icon",
  //     html: ReactDOMServer.renderToString(
  //       <div
  //         className={`flex justify-center items-center text-white rounded-full`}
  //         style={{
  //           width: "30px",
  //           height: "30px",
  //           backgroundColor: bg,
  //         }}
  //       >
  //         <FontAwesomeIcon icon={icon} className="h-4" />
  //       </div>
  //     ),
  //     iconSize: [20, 20],
  //     iconAnchor: [10, 20],
  //   });
  // };

  // Handle Flag Event
  // const handleFlagAction = async (action, eventId) => {
  //   const token = localStorage.getItem("token");
  //   const eventElement = { token: token, _id: eventId, action: action };
  //   try {
  //     axios
  //       .post("/data/dashboard/events/flag/event", eventElement)
  //       .then((response) => {
  //         if (response.status === 200) {
  //           setIsFlagged((prev) => !prev);
  //         }
  //       })
  //       .catch((error) => {
  //         if (error.status === 403) {
  //           alert("You must be a member to flag an event");
  //         } else {
  //           alert(error);
  //           console.log("Error", error);
  //         }
  //       });
  //   } catch (error) {
  //     console.log("Server error", error);
  //   }
  // };

  // Create marker for each event
  // const createMarker = (sample) => {
  //   let type = sample.felony;
  //   let felonyType = felonyObj.find((felony) => felony[type]);
  //   let icon = felonyType.details.icon;
  //   // const [isFlagged, setIsFlagged] = useState(sample.flagged === true ? true : false);

  //   return (
  //     <Marker
  //       key={sample._id}
  //       position={
  //         sample.coordinates.lat && sample.coordinates.lon
  //           ? createOffSet(sample.coordinates.lat, sample.coordinates.lon)
  //           : [41.6086, 21.7453]
  //       }
  //       icon={createIcon(sample)}
  //     >
  //       <Popup>
  //         <div className=" rounded-md space-y-2">
  //           <div className="flex space-x-2">
  //             <div className="">Felony: {sample.felony}</div>
  //             <FontAwesomeIcon className="h-4" icon={icon} />
  //           </div>
  //           <div className="flex space-x-2">
  //             <FontAwesomeIcon className="h-4" icon={faBuilding} />
  //             <div className=""> {sample.department_region}</div>
  //           </div>
  //           <div className="flex space-x-2">
  //             <FontAwesomeIcon className="h-4" icon={faLocationDot} /> <div> {sample.location}</div>
  //           </div>
  //           {sample.weather.weatherObj ? (
  //             <div className="flex border-2">
  //               <div className="flex w-full justify-around">
  //                 <div className="flex flex-col items-center justify-center w-full">
  //                   <FontAwesomeIcon className="h-4" icon={faCloudSun} />
  //                   <div>Weather:</div>
  //                 </div>

  //                 <div className="flex flex-col text-xs border w-full">
  //                   <div className="text-[10px]">Avg. temp:</div>
  //                   <div className="text-center text-[12px]">
  //                     {sample.weather.weatherObj.tavg}°C
  //                   </div>
  //                 </div>

  //                 <div className="flex flex-col text-xs border w-full">
  //                   <div className="text-[10px]">Max. temp:</div>
  //                   <div className="text-center text-[12px]">
  //                     {sample.weather.weatherObj.tmax}°C
  //                   </div>
  //                 </div>

  //                 <div className="flex flex-col text-xs border w-full">
  //                   <div className="text-[10px]">Min. temp:</div>
  //                   <div className="text-center text-[12px]">
  //                     {sample.weather.weatherObj.tmin}°C
  //                   </div>
  //                 </div>

  //                 <div className="flex flex-col text-xs border w-full">
  //                   <div className="text-[10px]">Wind spd.:</div>
  //                   <div className="text-center text-[12px]">
  //                     {sample.weather.weatherObj.wspd}km/h
  //                   </div>
  //                 </div>
  //               </div>
  //             </div>
  //           ) : (
  //             ""
  //           )}

  //           <div className="flex space-x-2">
  //             <FontAwesomeIcon className="h-4 animate-bounce" icon={faLocationCrosshairs} />
  //             <div className=""> Confidence score: {sample.confidenceScore * 100 + "%"}</div>
  //           </div>
  //           <div className="flex space-x-2">
  //             <div> Info: {sample.event}</div>
  //           </div>

  //           <div
  //             className={
  //               isFlagged === true
  //                 ? "flex space-x-2 text-red-500"
  //                 : "flex space-x-2 hover:text-red-500"
  //             }
  //           >
  //             <FontAwesomeIcon className="h-4" icon={faFlag} />
  //             <button
  //               className={
  //                 isFlagged === true
  //                   ? "text-sm font-light text-red-500"
  //                   : "text-sm font-light hover:text-red-500"
  //               }
  //               onClick={() => {
  //                 handleFlagAction(isFlagged === true ? "unflag" : "flag", sample._id);
  //               }}
  //             >
  //               {isFlagged === true ? "Problem Reported" : "Report problem"}
  //             </button>
  //           </div>
  //         </div>
  //       </Popup>
  //     </Marker>
  //   );
  // };

  // useEffect(() => {
  //   if (data) {
  //     const newMarkers = Object.entries(data).map(([key, event]) => createMarker(event));
  //     setMarkers(newMarkers);
  //   }
  // }, [data]);

  useEffect(() => {
    if (data) {
      const newMarkers = Object.entries(data).map(([key, event]) => (
        <MarkerElement sample={event} />
      ));
      setMarkers(newMarkers);
    }
  }, [data]);

  //

  return (
    <>
      <MapContainer
        center={[41.6510446, 21.7367036]}
        zoom={9}
        scrollWheelZoom={true}
        zoomControl={false}
        className="h-full w-full z-10 rounded-md"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url={
            dashboardPage.isNightMode === false
              ? "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              : "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
          }
        />
        {markers}
      </MapContainer>
    </>
  );
};

export default LeafletMap;
