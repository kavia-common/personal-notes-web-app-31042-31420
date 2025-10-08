import React, { useEffect, useRef, useState } from 'react';

/**
 * PUBLIC_INTERFACE
 * NoteModal component
 * Provides a modal dialog for creating/editing a note, with optional delete action.
 */
function NoteModal({ open, onClose, initialNote, onSave, onDelete }) {
  const [title, setTitle] = useState(initialNote?.title || '');
  const [content, setContent] = useState(initialNote?.content || '');
  const [confirmDelete, setConfirmDelete] = useState(false);
  const titleRef = useRef(null);

  useEffect(() => {
    setTitle(initialNote?.title || '');
    setContent(initialNote?.content || '');
    setConfirmDelete(false);
  }, [initialNote, open]);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape' && open) {
        if (confirmDelete) {
          setConfirmDelete(false);
        } else {
          onClose?.();
        }
      }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open, onClose, confirmDelete]);

  useEffect(() => {
    if (open && titleRef.current) {
      setTimeout(() => titleRef.current?.focus(), 0);
    }
  }, [open]);

  if (!open) return null;

  const submit = () => {
    if (!title.trim() && !content.trim()) return onClose?.();
    onSave({
      id: initialNote?.id,
      title: title.trim(),
      content: content.trim()
    });
  };

  return (
    <div className="modal-backdrop" role="dialog" aria-modal="true" aria-labelledby="note-modal-title">
      <div className="modal">
        <div className="modal-header">
          <div className="modal-title" id="note-modal-title">
            {initialNote ? 'Edit Note' : 'New Note'}
          </div>
          <button className="icon-btn" aria-label="Close" onClick={onClose}>✖️</button>
        </div>

        <div className="modal-body">
          {confirmDelete ? (
            <div style={{ display: 'grid', gap: 12 }}>
              <div style={{ fontWeight: 700 }}>Delete this note?</div>
              <div style={{ color: 'var(--muted)' }}>
                This action cannot be undone.
              </div>
            </div>
          ) : (
            <>
              <div className="field">
                <label className="label" htmlFor="note-title">Title</label>
                <input
                  id="note-title"
                  ref={titleRef}
                  className="input"
                  placeholder="Note title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>

              <div className="field">
                <label className="label" htmlFor="note-content">Content</label>
                <textarea
                  id="note-content"
                  className="textarea"
                  placeholder="Write your note..."
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                />
              </div>
            </>
          )}
        </div>

        <div className="modal-footer">
          {confirmDelete ? (
            <>
              <button className="btn" onClick={() => setConfirmDelete(false)}>Cancel</button>
              <button className="btn error" onClick={() => { onDelete?.(); }}>Delete</button>
            </>
          ) : (
            <>
              {onDelete && initialNote && (
                <button className="btn" onClick={() => setConfirmDelete(true)} aria-label="Delete note">Delete</button>
              )}
              <button className="btn" onClick={onClose}>Cancel</button>
              <button className="btn primary" onClick={submit}>Save</button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default NoteModal;
