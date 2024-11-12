import React, { useState, useEffect, useContext } from "react";
import { AppContext } from "../context/AppContext";
import logo from "../assets/logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfo, faChevronDown, faTimeline } from "@fortawesome/free-solid-svg-icons";

const EventsBar = () => {
  const { ui, query, mapSettings } = useContext(AppContext);

  const handleSelected = (position, coords, zoom) => {
    mapSettings.setPosition(coords);
    mapSettings.setZoomLevel(zoom);
    mapSettings.setIsSelected(position);
  };

  return (
    <>
      <div className="flex w-full h-14 bg-white border h-14 text-l  hover:cursor-pointer">
        <div className="flex pl-10 items-center justify-left w-1/2">
          <div
            className="flex items-center"
            onClick={() => {
              ui.setSearch((prev) => !prev);
              ui.setShowInfo(false), ui.setShowKey(false);
            }}
          >
            <img className="flex h-8 items-center justify-center" src={logo} />
            <div className="flex items-center justify-center pl-5 ">
              <div className="flex items-center ">
                <div className="flex text-blue-800  text-sm w-[90px]">
                  <div className="">Chosen Date:</div>
                </div>
                <p className="font-bold text-sm w-[80px]">{query.queryDate || "date"}</p>
              </div>
            </div>
          </div>
          <div className="flex gap-3 ml-6">
            <div className="border"></div>
            <button
              className={
                mapSettings.isSelected === "Macedonia"
                  ? "flex items-center justify-center text-white mt-1 h-8  px-1 bg-[rgb(52,142,237)]   rounded"
                  : "flex items-center justify-center hover:text-white text-[rgb(52,142,237)] mt-1 h-8  px-1 hover:bg-[rgb(52,142,237)]   rounded"
              }
              onClick={() => {
                handleSelected("Macedonia", [41.627933960801556, 21.777213112005363], 9);
              }}
            >
              Macedonia
            </button>
            <div className="border"></div>
            <button
              className={
                mapSettings.isSelected === "Skopje"
                  ? "flex items-center justify-center text-white mt-1 h-8  px-1 bg-[rgb(52,142,237)]   rounded"
                  : "flex items-center justify-center hover:text-white text-[rgb(52,142,237)] mt-1 h-8  px-1 hover:bg-[rgb(52,142,237)]   rounded"
              }
              onClick={() => {
                handleSelected("Skopje", [41.99610065892659, 21.431763763844394], 12);
              }}
            >
              Skopje
            </button>
            <div className="border"></div>
            <button
              className={
                mapSettings.isSelected === "Stip"
                  ? "flex items-center justify-center text-white mt-1 h-8  px-1 bg-[rgb(52,142,237)]   rounded"
                  : "flex items-center justify-center hover:text-white text-[rgb(52,142,237)] mt-1 h-8  px-1 hover:bg-[rgb(52,142,237)]   rounded"
              }
              onClick={() => {
                handleSelected("Stip", [41.7423748729134, 22.19777917541876], 13);
              }}
            >
              Stip
            </button>
            <div className="border"></div>
            <button
              className={
                mapSettings.isSelected === "Bitola"
                  ? "flex items-center justify-center text-white mt-1 h-8  px-1 bg-[rgb(52,142,237)]   rounded"
                  : "flex items-center justify-center hover:text-white text-[rgb(52,142,237)] mt-1 h-8  px-1 hover:bg-[rgb(52,142,237)]   rounded"
              }
              onClick={() => {
                handleSelected("Bitola", [41.02899039872671, 21.328967456685533], 13);
              }}
            >
              Bitola
            </button>

            <div className="border"></div>
            <button
              className={
                mapSettings.isSelected === "Tetovo"
                  ? "flex items-center justify-center text-white mt-1 h-8  px-1 bg-[rgb(52,142,237)]   rounded"
                  : "flex items-center justify-center hover:text-white text-[rgb(52,142,237)] mt-1 h-8  px-1 hover:bg-[rgb(52,142,237)]   rounded"
              }
              onClick={() => {
                handleSelected("Tetovo", [42.00553213724956, 20.969297755125904], 13);
              }}
            >
              Tetovo
            </button>
            <div className="border"></div>
          </div>
        </div>
        <div className=" flex pr-12 w-1/2 items-center justify-end gap-7">
          <button
            className="flex items-center hover:text-[rgb(52,142,237)]"
            onClick={() => {
              ui.setSearch((prev) => !prev);
              ui.setShowInfo(false), ui.setShowKey(false);
            }}
          >
            <FontAwesomeIcon
              icon={faTimeline}
              className="pr-1 h-5 text-[rgb(52,142,237)] hover:text-[rgb(22,66,112)] "
            />
            <div className="flex items-center justify-center pl-2">
              <p className=" ">Choose date</p>
            </div>
          </button>

          <button
            className="flex items-center"
            onClick={() => {
              ui.setShowKey((prev) => !prev);
              ui.setShowInfo(false);
              ui.setSearch(false);
            }}
          >
            <FontAwesomeIcon
              icon={faChevronDown}
              className="pr-1 h-5 text-[rgb(52,142,237)] hover:text-[rgb(22,66,112)]"
            />
            <p className=" hover:text-[rgb(52,142,237)]  py-1 px-1  rounded">Key</p>
          </button>
          <button
            onClick={() => {
              ui.setShowInfo((prev) => !prev);
              ui.setSearch(false);
              ui.setShowKey(false);
            }}
          >
            {" "}
            <FontAwesomeIcon
              icon={faInfo}
              className="pr-1 h-5 text-[rgb(52,142,237)] hover:text-[rgb(22,66,112)] hover:cursor-pointer animate-bounce"
            />
          </button>
        </div>
      </div>
    </>
  );
};

export default EventsBar;
