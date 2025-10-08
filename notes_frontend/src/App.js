import React, { useMemo, useState, useEffect, useCallback } from 'react';
import './App.css';
import './index.css';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import NotesList from './components/NotesList';
import NoteModal from './components/NoteModal';
import { useLocalNotes } from './hooks/useLocalNotes';

// PUBLIC_INTERFACE
function App() {
  /**
   * Ocean Professional themed Notes App
   * - Layout: Header, Sidebar, Main content
   * - CRUD with localStorage persistence via useLocalNotes hook
   * - Modal for create/edit and confirmation delete within modal
   */
  const { notes, saveAll } = useLocalNotes();
  const [items, setItems] = useState(notes);
  const [search, setSearch] = useState('');
  const [isModalOpen, setModalOpen] = useState(false);
  const [editingNote, setEditingNote] = useState(null);

  // Persist when notes change
  useEffect(() => {
    saveAll(items);
  }, [items, saveAll]);

  useEffect(() => {
    // Ensure body does not scroll when modal is open
    document.body.style.overflow = isModalOpen ? 'hidden' : '';
  }, [isModalOpen]);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return items;
    return items.filter(n =>
      (n.title || '').toLowerCase().includes(q) ||
      (n.content || '').toLowerCase().includes(q)
    );
  }, [items, search]);

  // PUBLIC_INTERFACE
  const handleCreate = () => {
    setEditingNote(null);
    setModalOpen(true);
  };

  // PUBLIC_INTERFACE
  const handleSave = (note) => {
    if (note.id) {
      setItems(prev => prev.map(n => (n.id === note.id ? { ...note, updatedAt: Date.now() } : n)));
    } else {
      const id = crypto.randomUUID ? crypto.randomUUID() : `${Date.now()}-${Math.random()}`;
      setItems(prev => [{ id, title: note.title, content: note.content, createdAt: Date.now(), updatedAt: Date.now() }, ...prev]);
    }
    setModalOpen(false);
    setEditingNote(null);
  };

  // PUBLIC_INTERFACE
  const handleEdit = (noteId) => {
    const n = items.find(x => x.id === noteId);
    if (n) {
      setEditingNote(n);
      setModalOpen(true);
    }
  };

  // PUBLIC_INTERFACE
  const handleDelete = useCallback((noteId) => {
    setItems(prev => prev.filter(n => n.id !== noteId));
    if (editingNote && editingNote.id === noteId) {
      setModalOpen(false);
      setEditingNote(null);
    }
  }, [editingNote]);

  return (
    <div className="ocean-app">
      <Header />
      <div className="layout">
        <Sidebar />
        <main className="content">
          <div className="toolbar">
            <div className="search-wrap">
              <input
                aria-label="Search notes"
                type="search"
                placeholder="Search notes..."
                className="search-input"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <button className="btn primary" onClick={handleCreate} aria-label="Create note">
              + New Note
            </button>
          </div>

          <NotesList
            notes={filtered}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </main>
      </div>

      <button
        className="fab"
        aria-label="Add note"
        onClick={handleCreate}
        title="Add note"
      >
        +
      </button>

      <NoteModal
        open={isModalOpen}
        onClose={() => { setModalOpen(false); setEditingNote(null); }}
        initialNote={editingNote}
        onSave={handleSave}
        onDelete={editingNote ? () => handleDelete(editingNote.id) : undefined}
      />
    </div>
  );
}

export default App;
