import React from 'react';

export default class Navbar extends React.Component {
  render() {
    return (
      <nav className="navbar">
        <div className="nav-container">
          <a className="navbar-title" href="#">
            <h1>CodeJournal</h1>
          </a>
          <div>
            <a className="navbar-entries" href="#entries">
              <h2>Entries</h2>
            </a>
          </div>
        </div>
      </nav>
    );
  }
}
