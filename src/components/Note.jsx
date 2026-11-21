function Note({ note, deleteNote, togglePin }) {
  return (
    <div className="note-card">
      <h3>{note.title}</h3>

      <p>{note.content}</p>

      <div className="note-actions">
        <button onClick={() => togglePin(note.id)}>
          {note.pinned ? "Unpin" : "Pin"}
        </button>

        <button onClick={() => deleteNote(note.id)}>
          Delete
        </button>
      </div>
    </div>
  );
}

export default Note;