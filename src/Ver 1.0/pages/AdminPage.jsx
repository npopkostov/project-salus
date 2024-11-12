import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import EventsBar from "../components/EventsBar";
import Loading from "../components/Loading";

import axios from "axios";

const AdminPage = () => {
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Auth route* check for token
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/");
    }

    if (token) {
      axios
        .post("/auth/admin-room", { token: token })
        .then((response) => {
          if (response.status === 200) {
            setUsername(response.data.username);
            setLoading(false);
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
          {/* <Overview /> */}
        </div>
      </div>
    </>
  );
};

export default AdminPage;
