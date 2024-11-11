import React from "react";
import Logo from "../assets/Logo.png";
import logoOnly from "../assets/Logo Only.png";

const HeroLogin = () => {
  return (
    <>
      <div className="flex flex-col h-screen bg-[#F2F4FC]">
        <div className="flex h-[5%] items-center mt-5 ml-6">
          <img src={logoOnly} className="h-8" />
          <div className="ml-2 mb-2 text=lg text-sans font-bold"> The Salus Project</div>
        </div>
        <div className="flex h-screen items-center justify-center">
          <img className="h-28" src={Logo} />
        </div>
      </div>
    </>
  );
};

export default HeroLogin;
