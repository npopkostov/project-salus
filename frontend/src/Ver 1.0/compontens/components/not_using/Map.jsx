import React, { useState, useEffect, useContext } from "react";
import { AppContext } from "../../context/AppContext";
import { Map, Marker, ZoomControl } from "pigeon-maps";

const PigeonMap = () => {
  const { data } = useContext(AppContext);
  const [events, setEvents] = useState([]);
  const [loadMarker, setLoadMarker] = useState(false);

  useEffect(() => {
    if (data && data.events) {
      console.log(data);
      setEvents(data.events);
      setLoadMarker(true);
    }
  }, [data]);
  // Set the position [latitude, longitude]
  const position = [41.3178225632779, 22.5635200829388]; // Change to your desired coordinates

  return (
    <Map center={position} zoom={9} height={600} width="100%">
      {loadMarker &&
        events.map((event, index) => {
          return (
            <Marker
              key={index}
              width={30}
              anchor={
                event.coordinates && event.coordinates.lat && event.coordinates.lon
                  ? [event.coordinates.lat, event.coordinates.lon]
                  : position
              }
            />
          );
        })}

      <ZoomControl />
    </Map>
  );
};

export default PigeonMap;
