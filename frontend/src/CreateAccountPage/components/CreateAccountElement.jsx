import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AppContext } from "../../context/AppContext";

const CreateAccountForm = () => {
  const { loginPage } = useContext(AppContext);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  // Handle submit for new account creation
  const handleSubmit = async function (e) {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Paswords dont match");
      return;
    }

    const userData = { email, username, password };

    try {
      axios
        .post("/auth/register", userData)
        .then((response) => {
          console.log(response);
          if (response.status === 201) {
            loginPage.setNewAccReqSuccesfull(true);
          }
        })
        .catch((error) => {
          alert("Username or Email is already used");
          console.error("Error", error);
        });
    } catch (error) {
      console.log("Network error", error);
      alert("Failed to create account. Please try again later");
    }
  };

  return (
    <>
      <form className="mt-4 w-2/3 space-y-2" onSubmit={handleSubmit}>
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
          <div className="mb-1 text-sm font-bold"> Email Address</div>
          <input
            className="border rounded-md py-2"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
          <div className="flex flex-col w-full">
            <div className="mb-1 text-sm font-bold"> Confirm Password</div>
            <input
              className="border rounded-md py-2"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>

          <button
            className="flex items-center justify-center w-full border h-10 rounded-md text-sm text-white bg-blue-500 hover:bg-blue-600 transition duration-300 mt-2 cursor-pointer"
            type="submit"
          >
            {" "}
            Sign Up
          </button>
          <div className="flex items-center mt-2 gap-2">
            <div className="font-bold">Already have an account?</div>
            <div
              className="text-sm text-blue-500 cursor-pointer"
              onClick={() => {
                navigate("/auth/login");
              }}
            >
              {" "}
              Sign In
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export default CreateAccountForm;
