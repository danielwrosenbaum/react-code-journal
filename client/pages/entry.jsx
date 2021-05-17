import React from 'react';
import parseRoute from '../lib/parse-route';
import Loader from '../components/loader';

export default class Entry extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      route: parseRoute(window.location.hash),
      isLoading: true,
      inputValue: '',
      results: null
    };
  }

  componentDidMount() {
    const searchTerms = this.state.route.params;
    function getParams() {
      const newArr = [];
      for (const term of searchTerms) {
        if (term[0] === 'search') {
          newArr.push(term[1]);
        }
      }
      return newArr;
    }
    const query = getParams();
    // console.log(query);
    fetch(`/api/codeJournal/${query}`)
      .then(res => res.json())
      .then(
        result => {
          this.setState({
            isLoading: false,
            inputValue: query,
            results: result
          });
        }
      );
  }

  render() {
    const { isLoading } = this.state;
    return (
      <div className="entry-page">
        <div className="one">Results for</div>
        {(isLoading) &&
          <Loader />}
      </div>
    );

  }
}
