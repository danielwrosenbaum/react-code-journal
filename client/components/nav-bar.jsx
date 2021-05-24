import React, { useState } from 'react';

export default function Navbar() {

  const [searchValue, setSearchValue] = useState('');

  function handleSubmit() {
    event.preventDefault();
    if (!searchValue) {
      return null;
    }
    window.location.hash = 'results?search=' + searchValue;
    return setSearchValue('');
  }

  return (
      <nav className="navbar">
        <div className="row">
          <div className="nav-container col-full">
            <div className="col-half">
              <div className="navbar-title">
                <div className="one">CodeJournal</div>
              </div>
            </div>
            <div className="navbar-under col-third">
              <a className="navbar-entries" href="#create">
                <div className="two">New</div>
              </a>
              <form className="form-group fg--search">
                <input className="search" type="text" value={searchValue} placeholder="Search Entries" required onChange={() => setSearchValue(event.target.value)}></input>
                <button type="submit" onClick={() => handleSubmit()}><i className="fa fa-search"></i></button>
              </form>
              <a className="navbar-entries" href="#entries">
                <div className="two">Entries</div>
              </a>
            </div>
          </div>

        </div>
      </nav>
  );
}
