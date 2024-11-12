import React, { useState, useEffect, useContext } from "react";
import { AppContext } from "../context/AppContext";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import ReactDOMServer from "react-dom/server";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
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

const App = () => {
  const { data, query, mapSettings } = useContext(AppContext);
  const [events, setEvents] = useState("");
  const [loading, setLoading] = useState(true);
  const [position, setPosition] = useState(mapSettings.position);
  const [zoomLevel, setZoomLevel] = useState(mapSettings.zoomLevel);
  const [markers, setMarkers] = useState([]);

  const felonyObj = [
    { fire: "fire", details: { icon: faFireExtinguisher, color: `#f87171` } },
    { "traffic accident": "traffic accident", details: { icon: faCarBurst, color: `#fdba74` } },
    { drugs: "drugs", details: { icon: faPills, color: `#64748b` } },
    { arrest: "arrest", details: { icon: faHandcuffs, color: `#f87171` } },
    { bites: "bites", details: { icon: faDog, color: `#facc15` } },
    { shooting: "shooting", details: { icon: faGun, color: `#000000` } },
    { "physical violence": "physical violence", details: { icon: faBurst, color: `#d946ef` } },
    {
      "traffic sanctions": "traffic sanctions",
      details: { icon: faTrafficLight, color: `#3b82f6` },
    },
    {
      "missing person": "missing person",
      details: { icon: faPersonCircleQuestion, color: `#fbbf24` },
    },
    { robbery: "robbery", details: { icon: faSackDollar, color: `#3b82f6` } },
    { forgery: "forgery", details: { icon: faCopy, color: `#7360f2` } },
    { "illegal hunting": "illegal hunting", details: { icon: faShieldCat, color: `#008000` } },
    { "identity theft": "identity theft", details: { icon: faIdCard, color: `#dc9e43` } },
    { accidents: "accidents", details: { icon: faPersonFallingBurst, color: `#7F171F` } },
    { unknown: "unknown", details: { icon: faExclamation, color: `#f87171` } },
  ];

  //Create icon for LeafletMap in accordance to the felony
  const createIcon = (object) => {
    let type = object.felony;
    let felonyType = felonyObj.find((felony) => felony[type]);

    let bg = felonyType.details.color;
    let icon = felonyType.details.icon;

    return L.divIcon({
      className: "custom-div-icon",
      html: ReactDOMServer.renderToString(
        <div
          className={`flex justify-center items-center text-white rounded-full`}
          style={{
            width: "30px",
            height: "30px",
            backgroundColor: bg,
          }}
        >
          <FontAwesomeIcon icon={icon} className="h-4" />
        </div>
      ),
      iconSize: [20, 20],
      iconAnchor: [10, 20],
    });
  };

  // Create offset of coordinates
  const createOffSet = (lat, lon) => {
    const latOffSet = (Math.random() - 0.5) * 0.0045;
    const lonOffset = (Math.random() - 0.5) * 0.0045;

    return [lat + latOffSet, lon + lonOffset];
  };

  // Handle flag marker if something is wrong with the data
  const handleFlaggedMarker = (action, eventId) => {
    const token = localStorage.getItem("token");
    const eventElement = { token: token, _id: eventId, action: action };

    if (action === "flag") {
      try {
        axios
          .post("/data/flag/event", eventElement)
          .then((response) => {
            if (response.status === 200) {
              query.setChange((prev) => prev + 1);
            }
          })
          .catch((error) => {
            if (error.status === 403) {
              alert("You must be a member to flag an event");
            } else {
              alert(error);
              console.log("Error", error);
            }
          });
      } catch (error) {
        console.log("Server error", error);
      }
    } else {
      axios
        .post("/data/flag/event", eventElement)
        .then((response) => {
          if (response.status === 200) {
            query.setChange((prev) => prev + 1);
          }
        })
        .catch((error) => {
          alert(error);
          console.log("Error", error);
        });
    }
  };

  // Create marker for each event
  const createMarker = (sample) => {
    let type = sample.felony;
    let felonyType = felonyObj.find((felony) => felony[type]);
    let bg = felonyType.details.color;
    let icon = felonyType.details.icon;

    return (
      <Marker
        key={sample._id}
        position={
          sample.coordinates.lat && sample.coordinates.lon
            ? createOffSet(sample.coordinates.lat, sample.coordinates.lon)
            : [41.6086, 21.7453]
        }
        icon={createIcon(sample)}
      >
        <Popup>
          <div className=" rounded-md space-y-2">
            <div className="flex space-x-2">
              <div className="">Felony: {sample.felony}</div>
              <FontAwesomeIcon className="h-4" icon={icon} />
            </div>
            <div className="flex space-x-2">
              <FontAwesomeIcon className="h-4" icon={faBuilding} />
              <div className=""> {sample.department_region}</div>
            </div>
            <div className="flex space-x-2">
              <FontAwesomeIcon className="h-4" icon={faLocationDot} /> <div> {sample.location}</div>
            </div>
            {sample.weather.weatherObj ? (
              <div className="flex border-2">
                <div className="flex w-full justify-around">
                  <div className="flex flex-col items-center justify-center w-full">
                    <FontAwesomeIcon className="h-4" icon={faCloudSun} />
                    <div>Weather:</div>
                  </div>

                  <div className="flex flex-col text-xs border w-full">
                    <div className="text-[10px]">Avg. temp:</div>
                    <div className="text-center text-[12px]">
                      {sample.weather.weatherObj.tavg}°C
                    </div>
                  </div>

                  <div className="flex flex-col text-xs border w-full">
                    <div className="text-[10px]">Max. temp:</div>
                    <div className="text-center text-[12px]">
                      {sample.weather.weatherObj.tmax}°C
                    </div>
                  </div>

                  <div className="flex flex-col text-xs border w-full">
                    <div className="text-[10px]">Min. temp:</div>
                    <div className="text-center text-[12px]">
                      {sample.weather.weatherObj.tmin}°C
                    </div>
                  </div>

                  <div className="flex flex-col text-xs border w-full">
                    <div className="text-[10px]">Wind spd.:</div>
                    <div className="text-center text-[12px]">
                      {sample.weather.weatherObj.wspd}km/h
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              ""
            )}

            <div className="flex space-x-2">
              <FontAwesomeIcon className="h-4 animate-bounce" icon={faLocationCrosshairs} />
              <div className=""> Confidence score: {sample.confidenceScore * 100 + "%"}</div>
            </div>
            <div className="flex space-x-2">
              <div> Info: {sample.event}</div>
            </div>

            <div
              className={
                sample.flagged === true
                  ? "flex space-x-2 text-red-500"
                  : "flex space-x-2 hover:text-red-500"
              }
            >
              <FontAwesomeIcon className="h-4" icon={faFlag} />
              <button
                className={
                  sample.flagged === true
                    ? "text-sm font-light text-red-500"
                    : "text-sm font-light hover:text-red-500"
                }
                onClick={() => {
                  if (sample.flagged !== true) {
                    handleFlaggedMarker("flag", sample._id);
                  } else {
                    handleFlaggedMarker("unflag", sample._id);
                  }
                }}
              >
                {sample.flagged === true ? "Problem Reported" : "Report problem"}
              </button>
            </div>
          </div>
        </Popup>
      </Marker>
    );
  };

  // Update data/events
  useEffect(() => {
    if (data && data.events) {
      setEvents(data.events);
      setLoading(false);
    }
  }, [data]);

  // Render map markers
  useEffect(() => {
    if (events.length > 1) {
      setMarkers([]);
      const newMarkers = events.map((event) => createMarker(event));
      setMarkers((prevMarkers) => [...prevMarkers, ...newMarkers]);
    }
  }, [events]);

  // Update map position & zoom
  const MapUpdater = () => {
    const map = useMap();

    useEffect(() => {
      if (mapSettings.position !== position || mapSettings.zoomLevel !== zoomLevel) {
        map.setView(mapSettings.position, mapSettings.zoomLevel);
        setPosition(mapSettings.position);
        setZoomLevel(mapSettings.zoomLevel);
      }
    }, [mapSettings.position, mapSettings.zoomLevel, map, position, zoomLevel]);

    return null;
  };

  return (
    <MapContainer center={position} zoom={zoomLevel} style={{ height: "600px", width: "100%" }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <MapUpdater />
      {markers.map((marker) => {
        return marker;
      })}
    </MapContainer>
  );
};

export default App;
