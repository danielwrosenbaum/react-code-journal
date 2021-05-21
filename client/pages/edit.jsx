import React from 'react';
import parseRoute from '../lib/parse-route';
import Loader from '../components/loader';
import Tags from '../components/tags';

export default class Edit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      photoUrl: '',
      notes: '',
      title: '',
      website: '',
      tags: [],
      route: parseRoute(window.location.hash),
      entryId: null,
      isDeleteClicked: false,
      deleted: false,
      edited: false,
      isLoading: true,
      newTag: '',
      error: false,
      tagEdited: false

    };
    this.handleUrl = this.handleUrl.bind(this);
    this.handleNotes = this.handleNotes.bind(this);
    this.handleTitle = this.handleTitle.bind(this);
    this.handleWebsite = this.handleWebsite.bind(this);
    this.handleEditSubmit = this.handleEditSubmit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleDeleteClicked = this.handleDeleteClicked.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.handleTags = this.handleTags.bind(this);
    this.handleChildTags = this.handleChildTags.bind(this);
    this.removeTags = this.removeTags.bind(this);
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
    fetch(`/api/codeJournal/edit/${query}`)
      .then(res => res.json())
      .then(result => {
        this.setState({
          photoUrl: result.photoUrl,
          notes: result.notes,
          title: result.title,
          entryId: result.entryId,
          website: result.website,
          // tags: [...this.state.tags, result.tags],
          tags: result.tags,
          isLoading: false
        });
      })
      .catch(error => {
        console.error(error);
      });
  }

  componentWillUnmount() {
    this.setState({ deleted: true });
  }

  // componentDidUpdate(prevState, prevProps) {
  //   if (this.state.tagEdited) {
  //     const { tags, entryId } = this.state;
  //     const tagArr = tags[0];
  //     const updatedEntry = {
  //       tagArr
  //     };
  //     const req = {
  //       method: 'PATCH',
  //       headers: {
  //         'Content-Type': 'application/json'
  //       },
  //       body: JSON.stringify(updatedEntry)
  //     };
  //     fetch(`/api/codeJournal/edittags/${entryId}`, req)
  //       .then(res => res.json())
  //       .then(result => {
  //         this.setState({ tagEdited: false });
  //       });
  //   }
  // }

  componentDidUpdate(prevProps, prevState) {

    if (prevState.newTag !== this.state.newTag) {
      console.log('yooo');
      const { tags, newTag } = this.state;
      if (newTag) {
        const newerTag = newTag;
        if (tags) {
          if (!tags.includes(newTag) && newTag) {
            this.state.tags.push(newerTag);
          } else {
            this.setState({ error: true });
          }
        } else {
          this.setState({ tags: [...this.state.tags, newTag] });
        }

      }

    }
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
    const { tags } = this.state;
    if (data === 'delete') {
      this.removeTags(this.state.tags.length - 1);
    } else {
      if (tags && tags.includes(data)) {
        this.setState({ error: true });
      } else {
        this.setState({ newTag: data });
      }
    }

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
        if (result.status === 204) {
          this.setState({
            deleted: true,
            isDeleteClicked: false
          });
        }
        return result;
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
    const { photoUrl, title, notes, entryId, website, tags, edited } = this.state;
    const entry = {
      photoUrl,
      title,
      notes,
      website,
      tags: tags
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
    if (edited) {
      window.location.hash = '#entries';
    }
  }

  handleCancel() {
    this.setState({ isDeleteClicked: false });
  }

  removeTags(index) {
    const newTags = [...this.state.tags];
    newTags.splice(index, 1);
    this.setState({ tags: newTags, tagEdited: true, newTag: '' });
  }

  renderSavedTags() {
    const { tags } = this.state;
    if (tags.length === 0 || tags === null) {
      return null;
    } else {
      if (tags !== null || tags.length !== 0) {
        const renderedTags = (
          <ul className="tag-list">
            {tags.map((tag, index) => (
              <li key={tag}>
                {`#${tag}`}
                <button type="button" onClick={() => { this.removeTags(index); }}><i className="fas fa-times"></i></button>
              </li>
            ))}
          </ul>
        );
        return renderedTags;
      }
    }

  }

  renderForm() {
    const { photoUrl, title, notes, website, tags } = this.state;
    return (
      <div className="form-container">
        <form >
          <div className='row col-full'>
            <div className="one">Edit Entry</div>
          </div>
          <div className='row'>
            <div className="col-half pic-container">
              <img className="pic" src={photoUrl} alt={title} />
            </div>
            <div className="col-half info-container">
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
              <div className="box">
                <div className="titles">
                  Tags
                </div>
                <div className="input-tag">
            <Tags value={tags} parentMethod={this.handleChildTags}/>
                  {this.renderSavedTags()}
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-full info-container box">
              <div className="titles">
                Notes
            </div>
              <textarea required className="notes col-full" rows="5" name="notes" value={notes} placeholder="Add Notes!" onChange={this.handleNotes} />
            </div>
          </div>
          <div className="row">
            <div className="button-container col-full">
              <button className="delete-button" type="button" onClick={this.handleDeleteClicked}>Delete Entry</button>
              <button onClick={this.handleEditSubmit} className="save-button" type="button" >Save</button>
            </div>
          </div>
        </form>
      </div>

    );
  }

  render() {
    const { edited, deleted, isLoading } = this.state;
    if (edited || deleted) {
      window.location.hash = '#entries';
      return null;
    }
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
