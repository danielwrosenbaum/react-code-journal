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
    return (
      <div className="entries-container"></div>
    );
  }
}
