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
            const entryId = entry.entryId;
            console.log(entryId);

            return (
              <div key={index} id={entryId} className="entry-card">
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
                  <div className="row col-five"><i className="far fa-edit"></i></div>
                </div>
              </div>
            );

          })
        }
      </div>

    );
    return (
      <div className="entry-page">
        <h1 className="entries-title">Entries</h1>
        {entryResults}
      </div>
    );
  }
}
