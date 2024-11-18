import React, { useState, useEffect, useContext } from "react";
import { MapContainer, TileLayer } from "react-leaflet";

import "leaflet/dist/leaflet.css";
import { AppContext } from "../../context/AppContext";

import MarkerElement from "./MarkerElement";

const LeafletMap = ({ data }) => {
  const { dashboardPage } = useContext(AppContext);
  const [markers, setMarkers] = useState();

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
