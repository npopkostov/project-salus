import React, { useState, useEffect, useContext } from "react";
import { AppContext } from "../../context/AppContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { NotesContext } from "../../context/NotesContex";
import axios from "axios";

const Note = ({ data }) => {
  const { dashboardPage } = useContext(AppContext);
  const { dashboardNotes } = useContext(NotesContext);

  return (
    <>
      <div
        onClick={() => dashboardNotes.setSelectedNoteForEdit(data.note_Id)}
        className={
          dashboardPage.isNightMode === false
            ? `flex flex-col bg-[${data.noteColor.lightModeColor}] rounded-md ${
                dashboardNotes.selectedNoteForEdit === data.note_Id && "border shadow"
              } h-24 w-64 p-5`
            : `flex flex-col bg-[${data.noteColor.nightModeColor}] ${
                dashboardNotes.selectedNoteForEdit === data.note_Id &&
                "border border-2 border-[#333F55] shadow-xl shadow-[#253662]"
              }rounded-md h-24 w-64 p-5`
        }
      >
        <div className={`font-bold text-[${data.noteColor.textColor}]`}>
          {data.note.slice(0, 24) + "..."}
        </div>
        <div className="flex items-center justify-between mt-2">
          <div className={dashboardPage.isNightMode === false ? `text-sm` : ` text-sm text-white`}>
            <div>
              {`${String(new Date(data.timeStamp).getDate()).padStart(2, "0")}/${String(
                new Date(data.timeStamp).getMonth() + 1
              ).padStart(2, "0")}/${new Date(data.timeStamp).getFullYear()}`}
            </div>
          </div>
          <div>
            <FontAwesomeIcon
              onClick={() => {
                dashboardNotes.setDeleteNoteWindow(true);
                dashboardNotes.setSelectedNote(data.note_Id);
              }}
              icon={faTrashCan}
              className={
                dashboardPage.isNightMode === false ? "h-4 text-slate-500" : "h-4 text-white"
              }
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Note;
