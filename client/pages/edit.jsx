import React from 'react';
import Entries from './entries';

export default class Edit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      photoUrl: this.props.data.photoUrl,
      title: this.props.data.title,
      notes: this.props.data.notes,
      entryId: this.props.data.entryId,
      edited: false

    };
    this.handleUrl = this.handleUrl.bind(this);
    this.handleNotes = this.handleNotes.bind(this);
    this.handleTitle = this.handleTitle.bind(this);
    this.handleEditSubmit = this.handleEditSubmit.bind(this);
  }

  handleUrl(event) {
    this.setState({ photoUrl: event.target.value });
  }

  handleTitle(event) {
    this.setState({ title: event.target.value });
  }

  handleNotes(event) {
    this.setState({ notes: event.target.value });
  }

  handleCancel() {
    return <Entries />;
  }

  handleEditSubmit() {
    event.preventDefault();
    const { photoUrl, title, notes, entryId } = this.state;
    const entry = {
      photoUrl,
      title,
      notes
    };
    const req = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(entry)
    };
    fetch(`/api/codeJournal/${entryId}`, req)
      .then(res => res.json())
      .then(result => {
        this.setState({ edited: true });
      });

  }

  render() {
    const { photoUrl, title, notes, edited } = this.state;
    if (edited) return <Entries />;
    return (
      <div className="form-container">
        <form onSubmit={this.handleEditSubmit}>
          <div className='row col-full'>
            <h1>New Entry</h1>
          </div>
          <div className='row'>
            <div className="col-half pic-container">
              <img className="pic" src={photoUrl} alt={title} />
            </div>
            <div className="col-half">
              <div className="box">
                <div className="titles">
                  Image Url
                </div>
                <input required className="input col-full" value={photoUrl} type="text" name="imageURL" placeholder="Image Url" onChange={this.handleUrl} />
              </div>
              <div className="box">
                <div className="titles">
                  Title
                </div>
                <input required className="input col-full" type="text" value={title} placeholder="Your Title Here" onChange={this.handleTitle} />
              </div>
            </div>
          </div>
          <div className="col-full box">
            <div className="titles">
              Notes
            </div>
            <textarea required className="notes col-full" rows="5" name="notes" value={notes} placeholder="Add Notes!" onChange={this.handleNotes} />
          </div>
          <div className="button-container col-full">
            <button className="cancel-button" onClick={this.handleCancel}>Cancel</button>
            <button className="save-button" type="submit" >Save</button>
          </div>
        </form>
      </div>
    );
  }
}
