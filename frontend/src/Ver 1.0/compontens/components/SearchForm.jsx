import React, { useState, useContext } from "react";
import Calendar from "react-calendar";
import { AppContext } from "../context/AppContext";

const SearchForm = () => {
  const [chosenDate, setChosenDate] = useState(new Date());
  const { ui, query } = useContext(AppContext);

  const handleDateChange = function (date) {
    const selectedDay = String(date.getDate()).padStart(2, "0");
    const selectedMonth = String(date.getMonth() + 1).padStart(2, "0");
    const selectedYear = Number(date.getFullYear());
    setChosenDate(`${selectedYear}-${selectedMonth}-${selectedDay}`);
  };

  const handleDate = function (e) {
    e.preventDefault();

    query.setQueryDate(chosenDate);

    ui.setSearch((prev) => !prev);
    query.setChange((prev) => prev + 1);
  };

  return (
    <div className="block absolute top-13 right-0 w-[350px] h-[500px] bg-white shadow-2xl">
      <p className="text-center text-lg  pt-5 shadow-sm pb-3"> Choose dates:</p>

      <form className="flex flex-col items-center justifty-center w-full p-5" onSubmit={handleDate}>
        <Calendar
          className="rounded-xl shadow-md"
          value={chosenDate}
          onChange={(date) => {
            handleDateChange(date);
          }}
        />
        <button
          className="mt-8 border w-20 bg-blue-400 hover:bg-blue-600 text-white font-light shadow-md"
          type="submit"
        >
          {" "}
          Submit
        </button>
      </form>
    </div>
  );
};

export default SearchForm;
