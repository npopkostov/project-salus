import React from "react";
import LeafletMap from "./LeafletMap";

const MapDiv = () => {
  return (
    <>
      <div className="bg-white w-full h-full border hover:cursor-pointer">
        <LeafletMap />
      </div>
    </>
  );
};

export default MapDiv;
