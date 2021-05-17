import React from 'react';
import parseRoute from '../lib/parse-route';
import Loader from '../components/loader';

export default class Entry extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      route: parseRoute(window.location.hash),
      isLoading: true,
      inputValue: '',
      result: null
    };
  }

  componentDidMount() {
    const searchTerms = this.state.route.params;
    function getParams() {
      const newArr = [];
      for (const term of searchTerms) {
        if (term[0] === 'search') {
          newArr.push(term[1]);
        }
      }
      return newArr;
    }
    const query = getParams();
    // console.log(query);
    fetch(`/api/codeJournal/search/${query}`)
      .then(res => res.json())
      .then(
        result => {
          console.log(result);
          this.setState({
            isLoading: false,
            inputValue: query,
            result
          });
        }
      );
  }

  render() {

    const { isLoading, result, inputValue } = this.state;
    if (!result) return null;
    const entries = result;
    const entryResults = (
      <div className="entries-container">
        {(result.length === 0) &&
          <h2>Nothing Here!</h2>}
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
    return (
      <div className="entry-page">
        <div className="one">{`Results for "${inputValue}"`}</div>
        {(isLoading) &&
          <Loader />}
          {entryResults}
      </div>
    );

  }
}
