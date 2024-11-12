import React, { useState, useEffect, useContext } from "react";
import Navbar from "../components/Navbar";
import StatisticsOverview from "../components/StatisticsOverview";
import EventsBar from "../components/EventsBar";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Loading from "../components/Loading";

const Statistics = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState("");

  // Auth route* check for token
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/");
    }

    if (token) {
      axios
        .post("/auth/statistics", { token: token })
        .then((response) => {
          if (response.status === 200) {
            setLoading(false);
            setUsername(response.data.username);
          } else {
            console.log("Response was not successful. Status:", response.status);
            navigate("/access-denied");
          }
        })
        .catch((error) => {
          if (error.status === 403) {
            navigate("/access-denied");
          } else {
            console.log("Error", error);
          }
        });
    }
  }, []);

  return loading === true ? (
    <div>
      <Loading />
    </div>
  ) : (
    <>
      <div className="grid grid-cols-[250px_minmax(900px,_1fr)] h-screen">
        <Navbar userName={username} />
        <div>
          {/* <EventsBar /> */}
          <StatisticsOverview />
        </div>
      </div>
    </>
  );
};

export default Statistics;
