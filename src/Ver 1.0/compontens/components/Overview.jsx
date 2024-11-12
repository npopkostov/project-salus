import React, { useEffect, useState } from "react";
import EventsCounter from "./EventsCounter";
import MapDiv from "./MapDiv";

const Overview = () => {
  return (
    <>
      <div className="bg-[rgb(247,247,248)]  w-full p-10">
        <EventsCounter />
        <div className="pt-10">
          <MapDiv />
        </div>
      </div>
    </>
  );
};

export default Overview;
