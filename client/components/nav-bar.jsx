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
              <div className="form-group fg--search">
                {/* <label className="navbar-entries two" htmlFor="search"></label> */}
                <input className="search" type="text" value={this.state.searchValue} placeholder="Search Entries" required onChange={this.handleSearch}></input>
                <button type="submit"><i className="fa fa-search"></i></button>
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
