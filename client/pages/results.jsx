import React from 'react';
import parseRoute from '../lib/parse-route';
import Loader from '../components/loader';

export default class Results extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      route: parseRoute(window.location.hash),
      isLoading: true,
      currentPath: this.getParams(parseRoute(window.location.hash).params),
      query: this.props.value,
      result: null
    };
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    const { query } = this.state;
    fetch(`/api/codeJournal/search/${query}`)
      .then(res => res.json())
      .then(
        result => {
          this.setState({
            isLoading: false,
            query,
            result
          });
        }
      )
      .catch(error => {
        this.setState({ isLoading: false });
        console.error(error);

      });
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
        )
        .catch(error => {
          this.setState({ isLoading: false });
          console.error(error);
        });
    }
  }

  handleClick(entry) {
    event.preventDefault();
    this.setState({ editEntry: entry });
    const { editEntry } = this.state;
    if (editEntry) {
      const { entryId } = this.state.editEntry;
      window.location.hash = `#edit?=${entryId}`;
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
    const { result, query } = this.state;
    if (!result) {
      return (
        <h2>Invalid Search. Try Again</h2>
      );
    }
    const entries = result;
    const entryResults = (
      <div className="entries-container">
        {(result.length === 0) &&
          <h3>{`No Results for "${query}". Please Try Again.`}</h3>}
        {
          entries.map((entry, index) => {
            const title = entry.title;
            const photoUrl = entry.photoUrl;
            const notes = entry.notes;
            const entryId = entry.entryId;
            const website = entry.website;
            const tags = entry.tags;
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
                    <div className="row">
                      <div>{tags}</div>
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
    const { isLoading } = this.state;
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
