import React from 'react';

export default class Create extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      photoUrl: '',
      title: '',
      notes: ''
    };
    this.handleUrl = this.handleUrl.bind(this);
    this.handleNotes = this.handleNotes.bind(this);
    this.handleTitle = this.handleTitle.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
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
    this.setState({
      photoUrl: '',
      title: '',
      notes: ''
    });
  }

  handleSubmit() {
    event.preventDefault();
    const { photoUrl, title, notes } = this.state;
    const entry = {
      photoUrl,
      title,
      notes
    };
    const req = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(entry)
    };
    fetch('/api/codeJournal', req)
      .then(res => res.json())
      .then(result => {
        this.setState({
          photoUrl: '',
          title: '',
          notes: ''
        });
      });

  }

  render() {
    const { photoUrl } = this.state;
    const placeholder = './images/placeholder-image-square.jpg';
    return (
      <div className="create-page">
        <div className="form-container">
          <form onSubmit={this.handleSubmit}>
            <div className='row col-full'>
              <h1>New Entry</h1>
            </div>
            <div className='row'>
              <div className="col-half pic-container">
                <img className="pic" src={(photoUrl) || placeholder} alt="unknown" />
              </div>
              <div className="col-half">
                <div className="box">
                  <div className="titles">
                    Image Url
                </div>
                  <input required className="input col-full" value={this.state.photoUrl} type="text" name="imageURL" placeholder="Image Url" onChange={this.handleUrl} />
                </div>
                <div className="box">
                  <div className="titles">
                    Title
                </div>
                  <input required className="input col-full" type="text" value={this.state.title} placeholder="Your Title Here" onChange={this.handleTitle} />
                </div>
              </div>
            </div>
            <div className="col-full box">
              <div className="titles">
                Notes
            </div>
              <textarea required className="notes col-full" rows="5" name="notes" value={this.state.notes} placeholder="Add Notes!" onChange={this.handleNotes} />
            </div>
            <div className="button-container col-full">
              <button className="cancel-button" onClick={this.handleCancel}>Cancel</button>
              <button className="save-button" type="submit" >Save</button>
            </div>
          </form>
        </div>
      </div>

    );
  }
}
