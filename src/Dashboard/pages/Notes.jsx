import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Toolbar from "../components/Toolbar";
import { AppContext } from "../../context/AppContext";
import notes from "../assets/notes.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import Note from "../components/Note";
import { NotesContext } from "../../context/NotesContex";

const Notes = () => {
  const { dashboardPage } = useContext(AppContext);
  const { dashboardNotes } = useContext(NotesContext);

  const [allNotes, setAllNotes] = useState();
  const navigate = useNavigate();

  // Token auth
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/auth/login");
    }

    if (token) {
      axios
        .post("https://project-salus.onrender.com/auth/dashboard", { token: token })
        .then((response) => {
          if (response.status === 200) {
            dashboardPage.setUserName(response.data.username);
            dashboardPage.setUserRole(response.data.role);
            dashboardPage.setUserMail(response.data.mail);
            dashboardPage.setIsAdmin(response.data.role === "admin" ? true : false);
            dashboardNotes.setFetchNotes((prev) => prev + 1);
          } else {
            console.log("Response was not successful. Status:", response.status);
            navigate("/auth/login");
          }
        })
        .catch((error) => {
          if (error.status === 403) {
            navigate("/auth/login");
          } else {
            console.log("Error", error);
          }
        });
    }
  }, []);

  // Load notes from database
  useEffect(() => {
    if (dashboardNotes.notesObj) {
      setAllNotes(dashboardNotes.notesObj);
      setTimeout(() => {
        dashboardNotes.setNoteUpdatedSuccesfully(false);
      }, 1000);
    }
  }, [dashboardNotes.notesObj]);

  return (
    <>
      {/* Main div */}
      <div
        className={
          dashboardPage.isMinimized === false
            ? `grid grid-cols-[15%_85%] w-screen h-screen cursor-pointer transition-all duration-300`
            : `grid grid-cols-[3%_97%] w-screen h-screen cursor-pointer transition-all duration-300`
        }
      >
        {/* navbar */}
        <Navbar />

        {/* dashboard/pages */}
        <div
          className={
            dashboardPage.isNightMode === false
              ? "flex flex-col bg-white"
              : " flex flex-col bg-[#2A3447]"
          }
        >
          {/* ADD NEW NOTE */}
          <div
            onClick={() => {
              dashboardNotes.setShowNewNoteForm(false);
              dashboardNotes.setNoteMessage("");
              dashboardNotes.setNoteColor("");
            }}
            className={
              dashboardNotes.showNewNoteForm === true
                ? "fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex items-center justify-center"
                : "hidden"
            }
          >
            {" "}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (dashboardNotes.noteColor === "") {
                  dashboardNotes.setFormError(true);
                } else {
                  dashboardNotes.handleAddNewNote();
                }
              }}
              onClick={(e) => e.stopPropagation()}
              className={
                dashboardPage.isNightMode === false
                  ? "shadow rounded-md bg-white w-[500px] h-[400px] border"
                  : "shadow rounded-md bg-[#2A3447] w-[500px] h-[400px] border border-[#333F55]"
              }
            >
              <div
                className={
                  dashboardPage.isNightMode === false
                    ? "p-5 font-bold flex-col space-y-3"
                    : "p-5 font-bold flex-col space-y-3 text-white"
                }
              >
                Add New Note
                <div
                  className={
                    dashboardPage.isNightMode === false
                      ? "text-xs font-thin"
                      : "text-xs font-thin text-[#60718A]"
                  }
                >
                  To add new notes please enter your description and choose note colors. and press
                  the submit button to add new note.
                </div>
                <textarea
                  value={dashboardNotes.noteMessage}
                  onChange={(e) => {
                    dashboardNotes.setNoteMessage(e.target.value);
                  }}
                  className={
                    dashboardPage.isNightMode === false
                      ? "w-full border h-[150px] font-light resize-none"
                      : "w-full border h-[150px] font-light resize-none bg-[#2A3447] border border-[#333F55]"
                  }
                ></textarea>
                <div className="flex flex-col gap-2 mt-2">
                  Choose Color
                  <div className="flex gap-2">
                    <button
                      type="button"
                      className="bg-[#608AFF] hover:bg-[#4570EA] w-5 h-5 rounded-full"
                      onClick={() => {
                        dashboardNotes.setNoteColor("firstChoice");
                      }}
                    >
                      {" "}
                      <FontAwesomeIcon
                        icon={faCheck}
                        className={
                          dashboardNotes.noteColor === "firstChoice" ? "h-4 text-white" : "hidden"
                        }
                      />
                    </button>
                    <button
                      type="button"
                      className="bg-[#FFAE1F] hover:bg-[#AE8E59]  w-5 h-5 rounded-full"
                      onClick={() => {
                        dashboardNotes.setNoteColor("secondChoice");
                      }}
                    >
                      <FontAwesomeIcon
                        icon={faCheck}
                        className={
                          dashboardNotes.noteColor === "secondChoice" ? "h-4 text-white" : "hidden"
                        }
                      />
                    </button>
                    <button
                      type="button"
                      className="bg-[#4ABEFF] hover:bg-[#48B2F0]  w-5 h-5 rounded-full"
                      onClick={() => {
                        dashboardNotes.setNoteColor("thirdChoice");
                      }}
                    >
                      {" "}
                      <FontAwesomeIcon
                        icon={faCheck}
                        className={
                          dashboardNotes.noteColor === "thirdChoice" ? "h-4 text-white" : "hidden"
                        }
                      />
                    </button>
                    <button
                      type="button"
                      className="bg-[#FA896B] hover:bg-[#F3704D] w-5 h-5 rounded-full"
                      onClick={() => {
                        dashboardNotes.setNoteColor("fourthChoice");
                      }}
                    >
                      {" "}
                      <FontAwesomeIcon
                        icon={faCheck}
                        className={
                          dashboardNotes.noteColor === "fourthChoice" ? "h-4 text-white" : "hidden"
                        }
                      />
                    </button>
                  </div>
                  <div className="flex items-center justify-end gap-2">
                    {dashboardNotes.formError === true && (
                      <div className="text-red-400 font-light text-sm"> Please select color </div>
                    )}

                    <button
                      type="button"
                      className={
                        dashboardPage.isNightMode === false
                          ? "border p-1 text-sm rounded-md bg-white text-[#5D87FF] hover:bg-[#5D87FF] hover:text-white border-[#5D87FF] text-center"
                          : "p-1 text-sm rounded-md bg-[#253662] text-[#6187FF] hover:bg-[#6187FF] hover:text-white text-center"
                      }
                      onClick={() => {
                        dashboardNotes.setShowNewNoteForm(false);
                        dashboardNotes.setNoteMessage("");
                        dashboardNotes.setNoteColor("");
                      }}
                    >
                      {" "}
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className={
                        dashboardNotes.noteMessage !== ""
                          ? dashboardPage.isNightMode === false
                            ? " p-1 text-sm rounded-md bg-[#ECF2FF] text-[#6187FF] hover:bg-[#6187FF] hover:text-white  text-center"
                            : " p-1 text-sm rounded-md bg-[#253662] text-[#6187FF] hover:bg-[#6187FF] hover:text-white text-center"
                          : dashboardPage.isNightMode === false
                          ? "bg-[#E9EAEB] text-[#C5C6C7] cursor-not-allowed rounded-md p-1 text-sm"
                          : "bg-[#2E3849] text-[#555D6B] cursor-not-allowed rounded-md p-1 text-sm"
                      }
                    >
                      {" "}
                      Submit
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
          {/* END OF NEW NOTE */}

          {/* Note delete confirmation*/}
          <div
            className={
              dashboardNotes.deleteNoteWindow === true
                ? "fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center"
                : "hidden"
            }
          >
            <div
              className={
                dashboardPage.isNightMode === false
                  ? "bg-white p-5 font-bold rounded-md shadow-xl flex-col space-y-3"
                  : "bg-[#253662] p-5 font-bold rounded-md shadow-xl flex-col space-y-3 text-white"
              }
            >
              <div> Are you sure you want to delete this note?</div>
              <div className="flex justify-center w-full items-center gap-2">
                <button
                  onClick={() => {
                    dashboardNotes.setDeleteNoteWindow(false);
                  }}
                  className={
                    dashboardPage.isNightMode === false
                      ? "border p-1 text-sm rounded-md bg-white text-[#5D87FF] hover:bg-[#5D87FF] hover:text-white border-[#5D87FF] text-center"
                      : "p-1 text-sm rounded-md bg-[#253662] text-[#6187FF] hover:bg-[#6187FF] hover:text-white text-center"
                  }
                >
                  {" "}
                  Cancel
                </button>
                <button
                  onClick={() => {
                    dashboardNotes.handleDeleteNote(dashboardNotes.selectedNote);
                  }}
                  className={
                    dashboardPage.isNightMode === false
                      ? "border p-1 text-sm rounded-md bg-white text-[#5D87FF] hover:bg-[#5D87FF] hover:text-white border-[#5D87FF] text-center"
                      : "p-1 text-sm rounded-md bg-[#253662] text-[#6187FF] hover:bg-[#6187FF] hover:text-white text-center"
                  }
                >
                  {" "}
                  Confirm
                </button>
              </div>
            </div>
          </div>
          {/* Note delete end */}

          {/* Note delete confirmation*/}
          <div
            className={
              dashboardNotes.noteUpdatedSuccessfully === true
                ? "fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center"
                : "hidden"
            }
          >
            <div
              className={
                dashboardPage.isNightMode === false
                  ? "bg-white p-5 font-bold rounded-md shadow-xl flex-col space-y-3"
                  : "bg-[#253662] p-5 font-bold rounded-md shadow-xl flex-col space-y-3 text-white"
              }
            >
              <div> Note updated succesfully</div>
            </div>
          </div>
          {/* Note delete end */}

          <Toolbar />
          <div className="flex flex-grow flex-col space-y-5 p-5">
            <div
              className={
                dashboardPage.isNightMode === false
                  ? "flex items-center justify-between rounded-xl bg-[#ECF2FF]"
                  : "flex items-center justify-between rounded-xl bg-[#253662] "
              }
            >
              <div
                className={
                  dashboardPage.isNightMode === false ? "flex flex-col m-5" : "flex flex-col m-5"
                }
              >
                <div
                  className={
                    dashboardPage.isNightMode === false
                      ? "font-bold text-xl"
                      : "font-bold text-white text-xl"
                  }
                >
                  {" "}
                  Notes
                </div>
              </div>
              <img src={notes} className="h-44 mr-10" />
            </div>
            {/* Notes app */}
            <div
              className={
                dashboardPage.isNightMode === false
                  ? "flex flex-grow border rounded-xl"
                  : "flex flex-grow border rounded-xl border-[#333F55]"
              }
            >
              <div
                className={
                  dashboardPage.isNightMode === false
                    ? "flex flex-col border-r"
                    : "flex flex-col border-r border-[#333F55]"
                }
              >
                <div
                  className={
                    dashboardPage.isNightMode === false
                      ? "border m-5 rounded-md "
                      : "border border-[#253662]  m-5 rounded-md "
                  }
                >
                  <input
                    value={dashboardNotes.searchNote}
                    className={
                      dashboardPage.isNightMode === false
                        ? "p-1 w-[294px] "
                        : "p-1  bg-[#253662] text-white w-full"
                    }
                    placeholder="Search Notes"
                    onChange={(e) => {
                      const value = e.target.value;
                      dashboardNotes.setSearchNote(value);
                      dashboardNotes.handleSearchNotes(value);

                      if (!value) {
                        dashboardNotes.setFilteredNotes([]);
                      }
                    }}
                  />
                </div>
                <div className="flex flex-col p-5">
                  <div
                    className={
                      dashboardPage.isNightMode === false ? "font-bold" : "font-bold text-white"
                    }
                  >
                    {" "}
                    All Notes
                  </div>

                  <div className="flex flex-col flex-grow space-y-2  p-5">
                    {/* all notes */}

                    {dashboardNotes.filteredNotes.length === 0 && dashboardNotes.searchNote !== ""
                      ? ""
                      : dashboardNotes.filteredNotes.length > 0 && dashboardNotes.searchNote !== ""
                      ? dashboardNotes.filteredNotes.map((note) => <Note data={note} />)
                      : dashboardNotes.searchNote === "" &&
                        dashboardNotes.filteredNotes.length === 0
                      ? allNotes && allNotes.map((note) => <Note data={note} />)
                      : ""}

                    {/* all notes end */}
                  </div>
                </div>
              </div>
              {/* Right Side */}
              <div className="flex flex-col w-full ">
                <div
                  className={
                    dashboardPage.isNightMode === false
                      ? "flex items-center justify-end p-5 border-b"
                      : "flex items-center justify-end p-5 border-b border-[#333F55]"
                  }
                >
                  <button
                    className="p-1  rounded-md bg-[#54B0F9] hover:bg-[#4570EA] text-white"
                    onClick={() => {
                      dashboardNotes.setShowNewNoteForm(true);
                    }}
                  >
                    {" "}
                    Add Note
                  </button>
                </div>
                {/* Edit Note */}
                <div className="p-5 flex flex-col flex-grow">
                  <div
                    className={
                      dashboardPage.isNightMode === false
                        ? "font-bold p-2"
                        : "font-bold text-white p-2"
                    }
                  >
                    {" "}
                    Edit Note
                  </div>
                  <textarea
                    value={
                      dashboardNotes.selectedNoteForEditText &&
                      dashboardNotes.selectedNoteForEditText
                    }
                    className={
                      dashboardPage.isNightMode === false
                        ? "p-5 border rounded-md font-thin"
                        : " p-5 bg-[#2A3447] text-white font-thin border border-[#333F55] rounded-md"
                    }
                    onChange={(e) => dashboardNotes.setSelectedNoteForEditText(e.target.value)}
                  ></textarea>
                  <div className="mt-5 flex flex-col items-center justify-center space-y-4 w-1/6">
                    <div
                      className={
                        dashboardPage.isNightMode === false ? "font-bold" : "text-white font-bold"
                      }
                    >
                      {" "}
                      Note Color{" "}
                    </div>
                    <div className="flex gap-5">
                      <button
                        className="bg-[#608AFF] hover:bg-[#4570EA] w-5 h-5 rounded-full"
                        onClick={() => dashboardNotes.setSelectedNoteForEditColor("firstChoice")}
                      >
                        {" "}
                        <FontAwesomeIcon
                          icon={faCheck}
                          className={
                            dashboardNotes.selectedNoteForEditColor === "firstChoice"
                              ? "h-4 text-white"
                              : "hidden"
                          }
                        />
                      </button>
                      <button
                        className="bg-[#FFAE1F] hover:bg-[#AE8E59]  w-5 h-5 rounded-full"
                        onClick={() => dashboardNotes.setSelectedNoteForEditColor("secondChoice")}
                      >
                        {" "}
                        <FontAwesomeIcon
                          icon={faCheck}
                          className={
                            dashboardNotes.selectedNoteForEditColor === "secondChoice"
                              ? "h-4 text-white"
                              : "hidden"
                          }
                        />
                      </button>
                      <button
                        className="bg-[#4ABEFF] hover:bg-[#48B2F0]  w-5 h-5 rounded-full"
                        onClick={() => dashboardNotes.setSelectedNoteForEditColor("thirdChoice")}
                      >
                        {" "}
                        <FontAwesomeIcon
                          icon={faCheck}
                          className={
                            dashboardNotes.selectedNoteForEditColor === "thirdChoice"
                              ? "h-4 text-white"
                              : "hidden"
                          }
                        />
                      </button>
                      <button
                        className="bg-[#FA896B] hover:bg-[#F3704D] w-5 h-5 rounded-full"
                        onClick={() => dashboardNotes.setSelectedNoteForEditColor("fourthChoice")}
                      >
                        {" "}
                        <FontAwesomeIcon
                          icon={faCheck}
                          className={
                            dashboardNotes.selectedNoteForEditColor === "fourthChoice"
                              ? "h-4 text-white"
                              : "hidden"
                          }
                        />
                      </button>
                    </div>
                  </div>
                  <div className="flex justify-end w-full">
                    <button
                      className="p-1 rounded-md bg-[#54B0F9] hover:bg-[#4570EA] text-white"
                      onClick={() => {
                        dashboardNotes.handleUpdateNote();
                      }}
                    >
                      Update Note
                    </button>{" "}
                  </div>
                </div>

                {/* end of edit note */}
              </div>
              {/* end */}
            </div>

            {/* end */}
          </div>
        </div>
      </div>
    </>
  );
};

export default Notes;
