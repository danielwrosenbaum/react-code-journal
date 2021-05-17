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
        <div className="row">
          <div className="nav-container col-full">
            <div className="col-half">
              <a className="navbar-title" href="#">
                <div className="one">CodeJournal</div>
              </a>
            </div>
            <div className="navbar-under col-third">
              {/* <div className="col-quarter"></div> */}
              <div className="searchbar">
                <label className="navbar-entries two" htmlFor="search">Search:</label>
                <input className="search " type="text" value={this.state.searchValue} required onChange={this.handleSearch}></input>
              </div>
              <a className="navbar-entries" href="#entries">
                <div className="two">Entries</div>
              </a>
            </div>
          </div>

        </div>
      </nav>
    );
  }
}
