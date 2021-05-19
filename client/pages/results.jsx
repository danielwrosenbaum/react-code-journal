import React from 'react';
import parseRoute from '../lib/parse-route';
import Loader from '../components/loader';

export default class Results extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      route: parseRoute(window.location.hash),
      isLoading: true,
      searchTerm: this.getParams(parseRoute(window.location.hash).params),
      query: this.props.value,
      firstParam: this.getFirstParam(parseRoute(window.location.hash).params),
      result: null,
      clickedTag: ''
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleTagClick = this.handleTagClick.bind(this);
  }

  componentDidMount() {
    const { query, searchTerm, firstParam } = this.state;
    let path;
    let term;
    if (firstParam[0] === 'search') {
      term = query;
      path = 'search';

    } else if (firstParam[0] === 'tag') {
      term = searchTerm;
      path = 'tag';
      this.setState({ clickedTag: term });
    }
    this.setState({ searchTerm: term });
    fetch(`/api/codeJournal/searchField/${path}/${term}`)
      .then(res => res.json())
      .then(
        result => {
          this.setState({
            isLoading: false,
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
    if (this.props.value.length > 0 && this.props.value !== this.state.query) {
      fetch(`/api/codeJournal/searchField/search/${this.props.value}`)
        .then(res => res.json())
        .then(
          result => {
            this.setState({
              isLoading: false,
              query: this.props.value,
              searchTerm: this.props.value,
              result
            });
          }
        )
        .catch(error => {
          this.setState({ isLoading: false });
          console.error(error);
        });
    }
    if (prevState.clickedTag !== this.state.clickedTag) {
      fetch(`/api/codeJournal/searchField/tag/${this.state.clickedTag}`)
        .then(res => res.json())
        .then(
          result => {
            this.setState({
              isLoading: false,
              searchTerm: '#' + this.state.clickedTag,
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

  handleTagClick(event) {
    const tag = event.target.id;
    this.setState({ clickedTag: event.target.id });
    window.location.hash = `#results?tag=${tag}`;
  }

  getFirstParam(searchTerms) {
    const newArr = [];
    for (const term of searchTerms) {
      newArr.push(term[0]);
    }
    return newArr;
  }

  getParams(searchTerms) {
    const newArr = [];
    for (const term of searchTerms) {
      if (term[0] === 'search') {
        newArr.push(term[1]);
      } else if (term[0] === 'tag') {
        newArr.push(term[1]);
      }
    }
    return newArr;
  }

  renderTags(tags) {
    const tagBox = (
      <ul className="tag-list">
        {tags.map((tag, index) => (
          <li key={tag}>
            <a onClick={this.handleTagClick} id={tag} >{`#${tag}`}</a>
          </li>
        ))}
      </ul>
    );
    return tagBox;
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
        {(result.length === 0 || !result) &&
          <h3>{`No Results for "${query}". Please Try Again.`}</h3>}
        {
          entries.map((entry, index) => {
            const title = entry.title;
            const photoUrl = entry.photoUrl;
            const notes = entry.notes;
            const entryId = entry.entryId;
            const website = entry.website;
            const tags = this.renderTags(entry.tags);
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
    const { isLoading, searchTerm } = this.state;

    return (
      <div className="entry-page">
        <div className="one">{`Results for "${searchTerm}"`}</div>
        {(isLoading) &&
          <Loader />}
        {this.renderResults()}
      </div>
    );

  }
}
