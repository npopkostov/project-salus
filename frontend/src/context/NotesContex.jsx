import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { AppBar } from "@mui/material";
import { AppContext } from "./AppContext";

const NotesContext = createContext();

const NotesProvider = ({ children }) => {
  const { dashboardPage } = useContext(AppContext);
  // DATA
  // Fetch notes for user
  const [notesObj, setNotesObj] = useState();
  const [selectedNote, setSelectedNote] = useState();
  const [fetchNotes, setFetchNotes] = useState(null);
  const [deleteNoteWindow, setDeleteNoteWindow] = useState(false);

  // New Note data
  const [showNewNoteForm, setShowNewNoteForm] = useState(false);
  const [noteMessage, setNoteMessage] = useState("");
  const [noteColor, setNoteColor] = useState("");
  const [formError, setFormError] = useState(false);

  // Search notes
  const [searchNote, setSearchNote] = useState("");
  const [filteredNotes, setFilteredNotes] = useState([]);

  // Edit Note
  const [selectedNoteForEdit, setSelectedNoteForEdit] = useState();
  const [selectedNoteForEditText, setSelectedNoteForEditText] = useState();
  const [selectedNoteForEditColor, setSelectedNoteForEditColor] = useState();
  const [noteUpdatedSuccessfully, setNoteUpdatedSuccesfully] = useState(false);

  // Fetch all notes for user
  useEffect(() => {
    const fetchData = async () => {
      try {
        await axios
          .get(`/data/dashboard/notes/${dashboardPage.userName}`)
          .then((response) => {
            if (response.status === 200) {
              setSelectedNoteForEdit();
              setSelectedNoteForEditText("");
              setSelectedNoteForEditColor();
              setNotesObj(response.data.userNotes);
            }
            if (response.status === 204) {
              setNotesObj([]);
            }
          })
          .catch((error) => {
            console.log("Error fetching data", error);
          });
      } catch (error) {
        console.log("Server error", error);
      }
    };
    if (dashboardPage.userName) {
      fetchData();
    }
  }, [fetchNotes]);

  // Show selected note
  useEffect(() => {
    if (selectedNoteForEdit) {
      const selectedNoteElement = notesObj.find(
        (noteElement) => noteElement.note_Id === selectedNoteForEdit
      );
      setSelectedNoteForEditText(selectedNoteElement.note);
      setSelectedNoteForEditColor(selectedNoteElement.notePalette);
    }
  }, [selectedNoteForEdit]);

  // Handle "add new note"
  const handleAddNewNote = () => {
    const noteForSubmit = {
      message: noteMessage,
      user: dashboardPage.userName,
      chosenColor: noteColor,
    };
    try {
      axios
        .post("/data/dashboard/notes", noteForSubmit)
        .then((response) => {
          if (response.status === 200) {
            setNoteMessage("");
            setNoteColor("");
            setFormError(false);
            setShowNewNoteForm(false);
            setFetchNotes((prev) => prev + 1);
          }
        })
        .catch((error) => console.log("Error uploading the new note", error));
    } catch (error) {
      console.log("Server error", error);
    }
  };

  //Handle delete note
  const handleDeleteNote = (noteId) => {
    try {
      axios
        .delete(`/data/dashboard/notes/${dashboardPage.userName}/${noteId}`)
        .then((response) => {
          if (response.status === 200) {
            setDeleteNoteWindow(false);
            setSelectedNote();
            setFetchNotes((prev) => prev + 1);
          }
        })
        .catch((error) => console.log("Error deleting a note", error));
    } catch (error) {
      console.log("Server error", error);
    }
  };

  // Handle search notes
  const handleSearchNotes = (text) => {
    const regex = new RegExp(text, "i");
    if (notesObj && text) {
      setFilteredNotes(notesObj.filter((noteElement) => regex.test(noteElement.note)));
    }
  };

  // Handle update note
  const handleUpdateNote = () => {
    const noteForUpdate = {
      user: dashboardPage.userName,
      noteId: selectedNoteForEdit,
      message: selectedNoteForEditText,
      chosenColor: selectedNoteForEditColor,
    };
    try {
      axios
        .put(`/data/dashoard/notes/update/${selectedNoteForEdit}`, noteForUpdate)
        .then((response) => {
          if (response.status === 200) {
            setSelectedNoteForEdit();
            setSelectedNoteForEditText();
            setSelectedNoteForEditColor();
            setNoteUpdatedSuccesfully(true);
            setFetchNotes((prev) => prev + 1);
          }
        })
        .catch((error) => console.log("Error uploading the new note", error));
    } catch (error) {
      console.log("Server error", error);
    }
  };

  return (
    <NotesContext.Provider
      value={{
        dashboardNotes: {
          setNotesObj,
          notesObj,
          selectedNote,
          setSelectedNote,
          setFetchNotes,
          deleteNoteWindow,
          setDeleteNoteWindow,
          handleDeleteNote,
          handleAddNewNote,
          noteMessage,
          setNoteMessage,
          setNoteColor,
          noteColor,
          formError,
          setFormError,
          showNewNoteForm,
          setShowNewNoteForm,
          searchNote,
          setSearchNote,
          handleSearchNotes,
          filteredNotes,
          setFilteredNotes,
          selectedNoteForEdit,
          setSelectedNoteForEdit,
          selectedNoteForEditText,
          setSelectedNoteForEditText,
          selectedNoteForEditColor,
          setSelectedNoteForEditColor,
          noteUpdatedSuccessfully,
          setNoteUpdatedSuccesfully,
          handleUpdateNote,
        },
      }}
    >
      {children}
    </NotesContext.Provider>
  );
};

export { NotesProvider, NotesContext };
