import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import NoteForm from "./components/NoteForm";
import Note from "./components/Note";
import "./App.css";

function App() {
  const [notes, setNotes] = useState(() => {
    const savedNotes = localStorage.getItem("notes");

    if (!savedNotes) {
      return [];
    }

    try {
      return JSON.parse(savedNotes);
    } catch {
      return [];
    }
  });

  // Save notes whenever they change
  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  // Add a new note
  const addNote = (title, content) => {
    const newNote = {
      id: Date.now(),
      title,
      content,
      pinned: false,
    };

    setNotes((previousNotes) => [newNote, ...previousNotes]);
  };

  // Delete a note
  const deleteNote = (id) => {
    setNotes((previousNotes) =>
      previousNotes.filter((note) => note.id !== id)
    );
  };

  // Pin or unpin a note
  const togglePin = (id) => {
    setNotes((previousNotes) =>
      previousNotes.map((note) =>
        note.id === id ? { ...note, pinned: !note.pinned } : note
      )
    );
  };

  // Display pinned notes first
  const sortedNotes = [...notes].sort(
    (a, b) => Number(b.pinned) - Number(a.pinned)
  );

  return (
    <div className="app">
      <Navbar />

      <Routes>
        <Route
          path="/"
          element={
            <div className="container">
              <h1>My Notes App</h1>
              <NoteForm addNote={addNote} />

              <div className="notes-grid">
                {sortedNotes.map((note) => (
                  <Note
                    key={note.id}
                    note={note}
                    deleteNote={deleteNote}
                    togglePin={togglePin}
                  />
                ))}
              </div>
            </div>
          }
        />

        <Route
          path="/all-notes"
          element={
            <div className="container">
              <h1>All Notes</h1>
              <div className="notes-grid">
                {sortedNotes.map((note) => (
                  <Note
                    key={note.id}
                    note={note}
                    deleteNote={deleteNote}
                    togglePin={togglePin}
                  />
                ))}
              </div>
            </div>
          }
        />

        <Route
          path="/pinned"
          element={
            <div className="container">
              <h1>Pinned Notes</h1>
              <div className="notes-grid">
                {sortedNotes
                  .filter((note) => note.pinned)
                  .map((note) => (
                    <Note
                      key={note.id}
                      note={note}
                      deleteNote={deleteNote}
                      togglePin={togglePin}
                    />
                  ))}
              </div>
            </div>
          }
        />
      </Routes>
    </div>
  );
}

export default App;




