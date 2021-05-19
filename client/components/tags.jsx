import React from 'react';

export default class Tags extends React.Component {
  constructor(props) {
    super();
    this.state = {
      tags: []
    };
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.removeTags = this.removeTags.bind(this);
  }

  handleKeyDown(event) {
    const value = event.target.value;
    if (event.key === 'Enter' && value) {
      if (this.state.tags.find(tag => tag.toLowerCase() === value.toLowerCase())) {
        return;
      }
      this.setState({ tags: [...this.state.tags, value] });
      this.props.parentMethod(value);
      this.tagInput.value = null;
    } else if (event.key === 'Backspace' && !value) {
      this.removeTags(this.state.tags.length - 1);
    }
  }

  removeTags(index) {
    const newTags = [...this.state.tags];
    newTags.splice(index, 1);
    this.setState({ tags: newTags });
  }

  render() {
    const { tags } = this.state;
    return (
      <div className="input-tag" >
        <input className="input col-full" type="text" onKeyDown={this.handleKeyDown} ref={c => { this.tagInput = c; }} />
        <ul className="tag-list">
          {tags.map((tag, index) => (
            <li key={tag}>
              {tag}
              <button type="button" onClick={() => { this.removeTags(index); }}><i className="fas fa-times"></i></button>
            </li>
          ))}

        </ul>
      </div>
    );
  }
}