import React from 'react';

/**
 * PUBLIC_INTERFACE
 * Sidebar component
 * Placeholder items for future navigation/filters.
 */
function Sidebar() {
  return (
    <aside className="sidebar" aria-label="Sidebar">
      <div className="group">Library</div>
      <div className="item active" tabIndex={0} role="button" aria-label="All notes">📒 All Notes</div>
      <div className="item" tabIndex={0} role="button" aria-label="Favorites">⭐ Favorites</div>
      <div className="item" tabIndex={0} role="button" aria-label="Archived">🗂️ Archived</div>

      <div className="group" style={{ marginTop: 16 }}>Tags</div>
      <div className="item" tabIndex={0} role="button" aria-label="Work">💼 Work</div>
      <div className="item" tabIndex={0} role="button" aria-label="Personal">🏠 Personal</div>
    </aside>
  );
}

export default Sidebar;
