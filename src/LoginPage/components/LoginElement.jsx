import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AppContext } from "../../context/AppContext";

const LoginElement = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { dashboardPage } = useContext(AppContext);
  const navigate = useNavigate();

  // Handle user login
  const handleSubmit = async () => {
    try {
      const userData = { username: username, password: password };
      axios
        .post(`https://project-salus.onrender.com/auth/login/${username}`, userData)
        .then((response) => {
          localStorage.setItem("token", response.data.token);
          dashboardPage.setUserName(response.data.username);
          dashboardPage.setUserRole(response.data.role);
          if (response.data.role === "admin") {
            dashboardPage.setIsAdmin(true);
          } else {
            dashboardPage.setIsAdmin(false);
          }
          navigate("/dashboard/home", { state: { username: response.data.username } });
        })
        .catch((error) => {
          alert("Please enter valid username and password");
          console.error("Error", error);
        });
    } catch (error) {
      console.log("Server error", error);
      alert("Server error. Failed to login. Please try again later");
    }
  };
  return (
    <>
      <form
        className="mt-4 w-2/3 space-y-2"
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit(e);
        }}
      >
        <div className="flex flex-col w-full">
          <div className="mb-1 text-sm font-bold"> Username</div>
          <input
            className="border rounded-md py-2"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="flex flex-col w-full">
          <div className="mb-1 text-sm font-bold"> Password</div>
          <input
            className="border rounded-md py-2"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <div
            className="flex justify-end text-sm text-blue-500 cursor-pointer mt-2"
            onClick={() => {
              navigate("/auth/forgot-password");
            }}
          >
            Forgot Password?
          </div>
          <button
            className="flex items-center justify-center w-full border h-10 rounded-md text-sm text-white bg-blue-500 hover:bg-blue-600 transition duration-300 mt-2 cursor-pointer"
            type="submit"
          >
            {" "}
            Sign In
          </button>
          <div className="flex items-center mt-2 gap-2">
            <div className="font-bold">New to Salus?</div>
            <div
              className="text-sm text-blue-500 cursor-pointer"
              onClick={() => {
                navigate("/auth/register");
              }}
            >
              {" "}
              Create an account
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export default LoginElement;
