import React from 'react';

export default class Entries extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      result: null,
      isLoading: true,
      editEntry: null

    };
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    fetch('/api/codeJournal')
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

  handleClick(entry) {
    event.preventDefault();
    this.setState({ editEntry: entry });
    const { editEntry } = this.state;
    if (editEntry) {
      const { entryId } = this.state.editEntry;
      window.location.hash = `#edit?=${entryId}`;
    }

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
            const entryId = entry.entryId;
            return (
              <div key={index} id={entryId} className="entry-card">
                <div className='row'>
                  <div className="col-half pic-container">
                    <img className="pic" src={photoUrl} alt={title} />
                  </div>
                  <div className="col-half info-container">
                    <div className="row">
                      <div className="two col-fortyfive">{title}</div>
                      <div className="col-five ">
                        <i id={entryId} className="edit-icon far fa-edit" onClick={() => this.handleClick(entry)}></i>
                      </div>
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
        <div className="one">Entries</div>
        {entryResults}
      </div>
    );
  }
}
