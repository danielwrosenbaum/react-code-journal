import React from 'react';
import Entries from './entries';
import parseRoute from '../lib/parse-route';
import Loader from '../components/loader';

export default class Edit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      photoUrl: '',
      notes: '',
      title: '',
      website: '',
      route: parseRoute(window.location.hash),
      entryId: null,
      isDeleteClicked: false,
      deleted: false,
      edited: false,
      isLoading: true

    };
    this.handleUrl = this.handleUrl.bind(this);
    this.handleNotes = this.handleNotes.bind(this);
    this.handleTitle = this.handleTitle.bind(this);
    this.handleWebsite = this.handleWebsite.bind(this);
    this.handleEditSubmit = this.handleEditSubmit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleDeleteClicked = this.handleDeleteClicked.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
  }

  componentDidMount() {
    const searchTerms = this.state.route.params;
    function getParams() {
      const newArr = [];
      for (const term of searchTerms) {
        newArr.push(term[1]);
      }
      return newArr;
    }
    const query = getParams();
    fetch(`/api/codeJournal/${query}`)
      .then(res => res.json())
      .then(result => {
        this.setState({
          photoUrl: result.photoUrl,
          notes: result.notes,
          title: result.title,
          entryId: result.entryId,
          website: result.website,
          isLoading: false
        });
      })
      .catch(error => {
        console.error(error);
      });
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

  handleDeleteClicked() {
    this.setState({ isDeleteClicked: true });
  }

  handleDelete() {
    const { entryId } = this.state;
    const req = {
      method: 'DELETE'
    };
    fetch(`/api/codeJournal/${entryId}`, req)
      .then(result => {
        this.setState({
          isDeleteClicked: false,
          deleted: true
        });
        window.location.hash = '#entries';
      })
      .catch(error => console.error(error));
  }

  deleteModal() {
    const { isDeleteClicked } = this.state;
    if (isDeleteClicked) {
      return (
      <div className="overlay">
        <div className="pop-up">
          <h3>Are You Sure You Want to Delete This Entry?</h3>
          <div className="delete-button-container">
            <button onClick={this.handleCancel}>Cancel</button>
              <button onClick={this.handleDelete}>Delete</button>
          </div>
        </div>
      </div>
      );
    }
  }

  handleEditSubmit() {
    event.preventDefault();
    const { photoUrl, title, notes, entryId, website } = this.state;
    const entry = {
      photoUrl,
      title,
      notes,
      website
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
        window.location.hash = '#entries';
      });
  }

  handleCancel() {
    this.setState({ isDeleteClicked: false });
  }

  renderForm() {
    const { photoUrl, title, notes, website } = this.state;
    return (
      <div className="form-container">
        <form onSubmit={this.handleEditSubmit}>
          <div className='row col-full'>
            <div className="one">Edit Entry</div>
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
              <div className="box">
                <div className="titles">
                  Website
                </div>
                <input required className="input col-full" type="text" value={website} placeholder="http://example.com/" onChange={this.handleWebsite} />
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
            <button className="delete-button" type="button" onClick={this.handleDeleteClicked}>Delete Entry</button>
            <button className="save-button" type="submit" >Save</button>
          </div>
        </form>
      </div>

    );
  }

  render() {
    const { edited, deleted, isLoading } = this.state;
    if (edited) return <Entries />;
    if (deleted) return <Entries />;
    return (
      <div className="edit-page">
        {(isLoading) &&
          <Loader />}
        {this.deleteModal()}
        {this.renderForm()}

      </div>

    );
  }
}
