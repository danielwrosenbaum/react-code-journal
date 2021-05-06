import React from 'react';

export default class Navbar extends React.Component {
  render() {
    return (
      <nav className="navbar">
        <div className="nav-container">
          <a className="navbar-title" href="#">
            <div className="one">CodeJournal</div>
          </a>
          <div>
            <a className="navbar-entries" href="#entries">
              <div className="two">Entries</div>
            </a>
          </div>
        </div>
      </nav>
    );
  }
}
