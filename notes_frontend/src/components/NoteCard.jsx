import React from 'react';

/**
 * PUBLIC_INTERFACE
 * NoteCard component
 * Renders a single note preview with title, snippet, date, and actions.
 */
function NoteCard({ note, onEdit, onDelete }) {
  const date = note.updatedAt || note.createdAt || Date.now();
  const formatted = new Date(date).toLocaleString();

  const handleCardClick = (e) => {
    // Avoid triggering edit when clicking icons
    const target = e.target;
    if (target.closest('button')) return;
    onEdit(note.id);
  };

  return (
    <article className="card" onClick={handleCardClick} aria-label={`Note ${note.title || 'Untitled'}`}>
      <div className="card-title">{note.title || 'Untitled'}</div>
      <div className="card-content">{(note.content || '').slice(0, 140) || 'No content yet...'}</div>
      <div className="card-footer">
        <div className="card-date">{formatted}</div>
        <div className="actions">
          <button
            className="icon-btn"
            onClick={(e) => { e.stopPropagation(); onEdit(note.id); }}
            aria-label="Edit note"
            title="Edit"
          >
            ✏️
          </button>
          <button
            className="icon-btn"
            onClick={(e) => { e.stopPropagation(); onDelete(note.id); }}
            aria-label="Delete note"
            title="Delete"
          >
            🗑️
          </button>
        </div>
      </div>
    </article>
  );
}

export default NoteCard;
