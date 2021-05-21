import React from 'react';

export default class Navbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchValue: ''
    };
    this.handleSearch = this.handleSearch.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSearch(event) {
    this.setState({ searchValue: event.target.value });
  }

  handleSubmit() {
    event.preventDefault();
    if (!this.state.searchValue) {
      return null;
    }
    window.location.hash = 'results?search=' + this.state.searchValue;
    this.setState({ searchValue: '' });

  }

  render() {
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
                <input className="search" type="text" value={this.state.searchValue} placeholder="Search Entries" required onChange={this.handleSearch}></input>
                <button type="submit" onClick={this.handleSubmit}><i className="fa fa-search"></i></button>
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
}
