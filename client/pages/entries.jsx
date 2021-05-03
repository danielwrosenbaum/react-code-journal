import React from 'react';

export default class Entries extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      result: null,
      isLoading: true

    };
  }

  componentDidMount() {
    fetch('/api/codeJournal')
      .then(res => res.json())
      .then(result => {
        this.setState({
          result,
          isLoading: false
        });
        console.log(result);
      })
      .catch(error => {
        console.error(error);
      });
  }

  render() {
    const { result } = this.state;
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
            const createdAt = entry.createdAt;
            return (
              <div key={index} className="entry-card">
                <div className='row'>
                  <div className="col-half pic-container">
                    <img className="pic" src={photoUrl} alt={title} />
                  </div>
                  <div className="col-half info-container">
                    <div className="row">
                      <h2>{title}</h2>
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
        {entryResults}
      </div>
    );
  }
}
