import React from 'react';

export default class Create extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }
  render() {
    return (
      <div className="form-container">
        <form>
          <div className='row col-full'>
            <h1>New Entry</h1>
          </div>
          <div className='row'>
            <div className="col-half pic-container">
              <img className="pic" src="./images/placeholder-image-square.jpg" alt="unknown" />
            </div>
            <div className="col-half">
              <div className="box">
                <div className="titles">
                  Image Url
                </div>
                <input required className="input col-full" type="text" name="imageURL" placeholder="Image Url" />
              </div>
              <div className="box">
                <div className="titles">
                  Title
                </div>
                <input required className="input col-full" type="text" placeholder="Your Title Here" />
              </div>
            </div>
          </div>
          <div className="col-full box">
            <div className="titles">
              Notes
            </div>
            <textarea required className="notes col-full" rows="5" name="notes" placeholder="Add Notes!"></textarea>
          </div>
          <div className="button-container col-full">
            <button className="cancel-button">Cancel</button>
            <button className="save-button" type="submit">Save</button>
          </div>
        </form>
      </div>
    )
  }
}
