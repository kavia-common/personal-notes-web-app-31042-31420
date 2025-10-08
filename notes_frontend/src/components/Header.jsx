import React from 'react';

/**
 * PUBLIC_INTERFACE
 * Header component
 * Displays app brand and subtle gradient background per Ocean Professional theme.
 */
function Header() {
  return (
    <header className="header" role="banner">
      <div className="header-inner">
        <div className="brand" aria-label="App brand">
          <div className="brand-badge" aria-hidden="true">N</div>
          <div>
            <div className="title">Notes</div>
            <div className="subtitle">Ocean Professional</div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
