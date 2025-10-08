import React from 'react';
import NoteCard from './NoteCard';

/**
 * PUBLIC_INTERFACE
 * NotesList component
 * Renders notes in a responsive grid, with empty state messaging.
 */
function NotesList({ notes, onEdit, onDelete }) {
  if (!notes?.length) {
    return (
      <div style={{
        border: '1px dashed var(--border)',
        borderRadius: 12,
        padding: 24,
        color: 'var(--muted)',
        background: 'var(--surface)'
      }}>
        No notes found. Create your first note to get started.
      </div>
    );
  }
  return (
    <div className="grid" role="list">
      {notes.map(n => (
        <div key={n.id} role="listitem">
          <NoteCard note={n} onEdit={onEdit} onDelete={onDelete} />
        </div>
      ))}
    </div>
  );
}

export default NotesList;
