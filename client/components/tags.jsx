import React from 'react';

export default class Tags extends React.Component {
  constructor(props) {
    super();
    this.state = {
      tags: [],
      error: false,
      removed: false
    };
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.removeTags = this.removeTags.bind(this);
    this.cancelTags = this.cancelTags.bind(this);
  }

  handleKeyDown(event) {
    const value = event.target.value;
    console.log('value', value);
    const { removed } = this.state;
    if (event.key === 'Enter' && value) {
      if (this.state.tags.find(tag => tag.toLowerCase() === value.toLowerCase())) {
        return;
      }
      if (this.props.value) {
        if (!this.props.value.includes(value)) {
          console.log('here');
          this.setState({ tags: [...this.state.tags, value] });
          this.props.parentMethod(value);
          this.tagInput.value = null;
        } else {
          console.log('no here');
          this.setState({ error: true });
        }
      } else {
        console.log('there');
        this.setState({ tags: [...this.state.tags, value] });
        this.props.parentMethod(value, 0);
        this.tagInput.value = null;
      }

    } else if (event.key === 'Backspace' && !value) {
      this.removeTags(this.state.tags.length - 1);
    }
  }

  removeTags(index) {
    const newTags = [...this.state.tags];
    newTags.splice(index, 1);
    this.setState({ tags: newTags });
    if (this.props.value) {
      this.props.parentMethod('delete', index);
    }

  }

  cancelTags() {
    this.setState({ tags: [] });
  }

  render() {
    const { tags } = this.state;
    console.log('tags', tags);
    const tagElement = (
      <ul className="tag-list">
        {
          tags.map((tag, index) => {
            if (this.props.value) {
              if (!this.props.value.includes(tag)) {
                return (
                  <li key={tag}>
                    {`#${tag}`}
                    <button type="button" onClick={() => { this.removeTags(index); }}><i className="fas fa-times"></i></button>
                  </li>
                );
              }
            } else {
              return (
                <li key={tag}>
                  {`#${tag}`}
                  <button type="button" onClick={() => { this.removeTags(index); }}><i className="fas fa-times"></i></button>
                </li>
              );
            }
            return null;
          }
          )}
      </ul>
    );
    return (
      <div className="input-tag" >
        <input className="input col-full" type="text" onKeyDown={this.handleKeyDown} ref={c => { this.tagInput = c; }} />
        {tagElement}
      </div>
    );
  }
}
