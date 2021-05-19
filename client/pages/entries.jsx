import React from 'react';
import Loader from '../components/loader';

export default class Entries extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      result: null,
      isLoading: true,
      editEntry: null,
      sortBy: 'newest'
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    const { sortBy } = this.state;
    fetch(`/api/codeJournal/sort/${sortBy}`)
      .then(res => res.json())
      .then(result => {
        this.setState({
          result,
          isLoading: false
        });
      })
      .catch(error => {
        console.error(error);
      });
  }

  componentDidUpdate(prevProps, prevState) {
    const { sortBy } = this.state;
    if (prevState.sortBy !== sortBy) {
      fetch(`/api/codeJournal/sort/${sortBy}`)
        .then(res => res.json())
        .then(result => {
          this.setState({
            result,
            isLoading: false
          });
        })
        .catch(error => {
          console.error(error);
        });
    }
  }

  handleClick(event) {
    const entryId = event.target.id;
    window.location.hash = `#edit?=${entryId}`;
  }

  handleChange() {
    this.setState({ sortBy: event.target.value });
  }

  renderTags(tags) {
    const tagBox = (
     <ul className="tag-list">
       {tags.map((tag, index) => (
         <li key={tag}>
           {tag}
         </li>
       ))}
     </ul>
    );
    return tagBox;
  }

  render() {
    const { result, isLoading } = this.state;
    if (!result) return null;
    const entries = result;
    const entryResults = (
      <div className="entries-container">
        {(result.length === 0 || !result) &&
          <h2>Nothing Here!</h2>}
        {
          entries.map((entry, index) => {
            const title = entry.title;
            const photoUrl = entry.photoUrl;
            const notes = entry.notes;
            const entryId = entry.entryId;
            const website = entry.website;
            const tags = this.renderTags(entry.tags);
            // console.log(this.renderTags(entry.tags));
            return (
              <div key={index} id={entryId} className="entry-card">
                <div className='row'>
                  <div className="col-half pic-container">
                    <img className="pic" src={photoUrl} alt={title} />
                  </div>
                  <div className="col-half info-container">
                    <div className="row">
                      <div className="icon-container" >
                        <i id={entryId} onClick={this.handleClick} className="edit-icon far fa-edit" ></i>
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
    return (
      <div className="entry-page">
        <div className="one">Entries</div>
        <div className="select-container">
          <label className="select-label">Sort by</label>
          <select className="select-box" onChange={this.handleChange}>
            <option value="newest">Newest (default)</option>
            <option value="oldest">Oldest</option>
            <option value="alpha">A-to-Z</option>
            <option value="reverse-alpha">Z-to-A</option>
          </select>
        </div>
        {(isLoading) &&
          <Loader />}
        {entryResults}
      </div>
    );
  }
}
