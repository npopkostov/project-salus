import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";

import Counter from "./Counter";

const EventsCounter = () => {
  const { data } = useContext(AppContext);

  const [events, setEvents] = useState("");

  useEffect(() => {
    if (data && data.events) {
      setEvents(data.events);
    }
  }, [data]);

  return (
    <>
      <div className="inline-flex w-full gap-5">
        <Counter type={"total"} events={events} />
        <Counter type={"heatplace"} events={events} />
        <Counter type={"felony"} events={events} />
        <Counter type={"confidence"} events={events} />
      </div>
    </>
  );
};

export default EventsCounter;
