import React from 'react';
import parseRoute from '../lib/parse-route';
import Loader from '../components/loader';

export default class Entry extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      route: parseRoute(window.location.hash),
      isLoading: true,
      currentPath: this.getParams(parseRoute(window.location.hash).params),
      inputValue: this.props.value,
      query: this.props.value,
      result: null
    };
  }

  componentDidMount() {
    const { route, query, inputValue } = this.state;

    // const pageRoute = this.getParams(route.params);
    // const currentRoute = this.getParams(parseRoute(window.location.hash).params);

    fetch(`/api/codeJournal/search/${query}`)
      .then(res => res.json())
      .then(
        result => {
          this.setState({
            isLoading: false,
            query: inputValue,
            result
          });
        }
      );
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.value !== this.state.query) {
      fetch(`/api/codeJournal/search/${this.props.value}`)
        .then(res => res.json())
        .then(
          result => {
            this.setState({
              isLoading: false,
              query: this.props.value,
              result
            });
          }
        );
    }
  }

  getParams(searchTerms) {
    const newArr = [];
    for (const term of searchTerms) {
      if (term[0] === 'search') {
        newArr.push(term[1]);
      }
    }
    return newArr;
  }

  renderResults() {
    const { result, inputValue } = this.state;
    if (!result) return null;
    const entries = result;
    const entryResults = (
      <div className="entries-container">
        {(result.length === 0) &&
          <h2>{`No Results for "${inputValue}"`}</h2>}
        {
          entries.map((entry, index) => {
            const title = entry.title;
            const photoUrl = entry.photoUrl;
            const notes = entry.notes;
            const entryId = entry.entryId;
            const website = entry.website;
            return (
              <div key={index} id={entryId} className="entry-card">
                <div className='row'>
                  <div className="col-half pic-container">
                    <img className="pic" src={photoUrl} alt={title} />
                  </div>
                  <div className="col-half info-container">
                    <div className="row">
                      <div className="icon-container">
                        <i id={entryId} className="edit-icon far fa-edit" onClick={() => this.handleClick(entry)}></i>
                      </div>
                    </div>
                    <div className="row">
                      <div className="two" >{title}</div>
                    </div>
                    <div className="row">
                      <a className="url" href={website}>{website}</a>
                    </div>
                    <div className="row">
                      <p>{notes}</p>
                    </div>
                  </div>

                </div>
              </div>
            );
          })
        }
      </div>
    );
    return entryResults;
  }

  render() {
    const { isLoading, inputValue, route, currentPath } = this.state;
    console.log('props:', this.props.value);
    return (
      <div className="entry-page">
        <div className="one">{`Results for "${this.props.value}"`}</div>
        {(isLoading) &&
          <Loader />}
        {this.renderResults()}
      </div>
    );

  }
}
