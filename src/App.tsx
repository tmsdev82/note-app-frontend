import React, { useState, useEffect } from "react";
import "./App.css";
import BackendService from "./services/BackendService";
import { NoteData } from "./models/NoteData";

function App() {
  const [notesData, setNotesData] = useState<NoteData[]>([]);
  const [newNote, setNewNote] = useState<NoteData>({ title: "", content: "" });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const notes = await BackendService.getNotesData();
        setNotesData(notes);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };

    fetchData();
  }, []);

  const handleNoteChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setNewNote((prevNote) => ({
      ...prevNote,
      [name]: value,
    }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    await BackendService.postNoteData(newNote);
    setNewNote({ title: '', content: '' }); 
  };

  return (
    <div className="App">
      <header>
        <h1>Notes App</h1>
      </header>
      <div>
        <form onSubmit={handleSubmit}>
          <div>
            <input
              type="text"
              name="title"
              placeholder="Title"
              value={newNote.title}
              onChange={handleNoteChange}
            />
          </div>
          <div>
            <textarea
              name="content"
              placeholder="Content"
              value={newNote.content}
              onChange={handleNoteChange}
            />
          </div>
          <button type="submit">Submit Note</button>
        </form>
      </div>
      <section>
        <h2>Notes</h2>
        {notesData.length > 0 ? (
          <div className="notes-container">
            {notesData.map((note, index) => (
              <div key={index} className="note-card">
                <h3>{note.title}</h3>
                <p>{note.content}</p>
              </div>
            ))}
          </div>
        ) : (
          <p>No notes available</p>
        )}
      </section>
    </div>
  );
}
export default App;
