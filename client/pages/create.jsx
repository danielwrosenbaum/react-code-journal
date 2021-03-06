import React from 'react';
import Tags from '../components/tags';

export default class Create extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      photoUrl: '',
      title: '',
      notes: '',
      website: '',
      tagFromChild: '',
      tags: []
    };
    this.handleUrl = this.handleUrl.bind(this);
    this.handleNotes = this.handleNotes.bind(this);
    this.handleTitle = this.handleTitle.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.handleWebsite = this.handleWebsite.bind(this);
    this.handleTags = this.handleTags.bind(this);
    this.handleChildTags = this.handleChildTags.bind(this);
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

  handleWebsite(event) {
    this.setState({ website: event.target.value });
  }

  handleTags(event) {
    this.setState({ tags: event.target.value });
  }

  handleChildTags(data, index) {
    if (data === 'delete') {

      this.removeTags(index);
    } else {
      this.setState({ tags: [...this.state.tags, data] });
    }

  }

  removeTags(index) {
    const newTags = [...this.state.tags];
    newTags.splice(index, 1);
    this.setState({ tags: newTags });
  }

  handleCancel() {
    event.preventDefault();
    this.setState({
      photoUrl: '',
      title: '',
      notes: '',
      website: '',
      tags: []
    });
    window.location.hash = 'entries';
  }

  handleSubmit() {
    event.preventDefault();
    const { photoUrl, title, notes, website, tags } = this.state;
    const entry = {
      photoUrl,
      title,
      notes,
      website,
      tags
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
          notes: '',
          tags: [],
          website: ''
        });
        window.location.hash = 'entries';
      });

  }

  render() {
    const { photoUrl } = this.state;
    const placeholder = './images/placeholder-image-square.jpg';
    return (
      <div className="create-page">
        <div className="form-container">
          <form >
            <div className='row col-full'>
              <div className="one">New Entry</div>
            </div>
            <div className='row'>
              <div className="col-half pic-container">
                <img className="pic" src={(photoUrl) || placeholder} alt="unknown" />
              </div>
              <div className="col-half info-container">

                <div className="box">
                  <div className="titles">
                    Title
                </div>
                  <input required className="input col-full" type="text" value={this.state.title} placeholder="Your Title Here" onChange={this.handleTitle} />
                </div>
                <div className="box">
                  <div className="titles">
                    Website
                </div>
                  <input required className="input col-full" type="text" value={this.state.website} placeholder="http://example.com/" onChange={this.handleWebsite} />
                </div>
                <div className="box">
                  <div className="titles">
                    Image Url
                </div>
                  <input required className="input col-full" value={this.state.photoUrl} type="text" name="imageURL" placeholder="Image Url" onChange={this.handleUrl} />
                </div>
                <div className="box">
                  <div className="titles">
                    Tags
                </div>
                  <Tags parentMethod={this.handleChildTags}/>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-full info-container">
                <div className="box">
                  <div className="titles">
                    Notes
                  </div>
                  <textarea required className="notes col-full" rows="5" name="notes" value={this.state.notes} placeholder="Add Notes!" onChange={this.handleNotes} />
                </div>
              </div>
            </div>
            <div className="row">
              <div className="button-container col-full">
                <button type="button" className="cancel-button" onClick={this.handleCancel}>Cancel</button>
                <button className="save-button" type="button" onClick={this.handleSubmit}>Save</button>
              </div>
            </div>
          </form>
        </div>
      </div>

    );
  }
}
