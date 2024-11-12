import React, { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Overview from "../components/Overview";
import EventsBar from "../components/EventsBar";
import SearchForm from "../components/SearchForm";
import Key from "../components/Key";
import Info from "../components/Info";
import Loading from "../components/Loading";
import axios from "axios";

import "react-calendar/dist/Calendar.css";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState("");

  const { ui } = useContext(AppContext);

  // Auth route* check for token
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/");
    }

    if (token) {
      axios
        .post("/auth/homepage", { token: token })
        .then((response) => {
          if (response.status === 200) {
            setLoading(false);
            setUsername(response.data.username);
          } else {
            console.log("Response was not successful. Status:", response.status);
          }
        })
        .catch((error) => console.log("Error", error));
    }
  }, []);

  return loading === true ? (
    <div>
      <Loading />
    </div>
  ) : (
    <>
      <div className={`grid grid-cols-[250px_minmax(900px,_1fr)] h-screen`}>
        <Navbar userName={username} />
        <div>
          <EventsBar />

          <div className="relative w-full">
            <Overview />

            {ui.search && (
              <div className="absolute top-0 right-0 z-[9999] ">
                <SearchForm />
              </div>
            )}

            {ui.showKey && (
              <div className="absolute top-0 right-0 z-[9998] bg-white w-[300px] h-full shadow-lg">
                <Key />
              </div>
            )}

            {ui.showInfo && (
              <div className="absolute top-0 right-0 z-[9997] bg-white w-[300px] h-full shadow-lg">
                <Info />
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;
