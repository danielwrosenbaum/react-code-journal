import React from 'react';

export default class Navbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchValue: ''
    };
    this.handleSearch = this.handleSearch.bind(this);
  }

  handleSearch(event) {
    this.setState({ searchValue: event.target.value });
  }

  render() {
    return (
      <nav className="navbar">
        <div className="nav-container">
          <div className="row">
            <a className="navbar-title" href="#">
              <div className="one">CodeJournal</div>
            </a>
          </div>

          <div className="row col-full">
            <label htmlFor="search">Search for Entries!</label>
            <input type="text" value={this.state.searchValue} required onChange={this.handleSearch}></input>
            <a className="navbar-entries" href="#entries">
              <div className="two">Entries</div>
            </a>
          </div>
        </div>
      </nav>
    );
  }
}
