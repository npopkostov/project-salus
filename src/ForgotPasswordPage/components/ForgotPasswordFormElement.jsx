import React, { useState, useContext } from "react";
import axios from "axios";
import { AppContext } from "../../context/AppContext";
import { useNavigate } from "react-router-dom";

const ForgotPasswordFormElement = () => {
  const { loginPage } = useContext(AppContext);
  const [userEmail, setUserEmail] = useState("");

  const navigate = useNavigate();

  // Handle forgot password request
  const handleForgotPassword = async function (e) {
    e.preventDefault();

    try {
      const userData = { email: userEmail };
      axios
        .post("https://project-salus.onrender.com/auth/forgot-password", userData)
        .then((response) => {
          if (response.status === 200) {
            loginPage.setRequestSuccesfull(true);
          }
        })
        .catch((error) => console.error("Failed to send password change request", error));
    } catch (error) {
      console.log("Network error", error);
      alert("Failed to password change request. Please try again later");
    }
  };

  return (
    <>
      <form className="mt-4 w-2/3 space-y-2 w-full" onSubmit={handleForgotPassword}>
        <div className="flex flex-col w-full">
          <div className="mb-1 mt-4 text-sm font-bold"> Email Address</div>
          <input
            className="border rounded-md py-2"
            type="email"
            value={userEmail}
            onChange={(e) => setUserEmail(e.target.value)}
            required
          />
          <button
            className="flex items-center justify-center w-full border h-10 rounded-md text-sm text-white bg-blue-500 hover:bg-blue-600 transition duration-300 mt-4 cursor-pointer"
            type="submit"
          >
            {" "}
            Forgot Password
          </button>
          <button
            className="flex items-center justify-center w-full border h-10 rounded-md text-sm text-white bg-blue-300 hover:bg-blue-500 transition duration-300 mt-2 cursor-pointer"
            onClick={() => navigate("/auth/login")}
          >
            {" "}
            Back to Login
          </button>
        </div>
      </form>
    </>
  );
};

export default ForgotPasswordFormElement;
