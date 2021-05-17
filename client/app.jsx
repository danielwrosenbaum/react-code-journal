import React from 'react';
import parseRoute from '../../Final-Project/client/lib/parse-route';
import Navbar from './components/nav-bar';
import PageContainer from './components/page-container';
import Create from './pages/create';
import Entries from './pages/entries';
import Edit from './pages/edit';
import Entry from './pages/entry';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      route: parseRoute(window.location.hash)

    };
  }

  componentDidMount() {
    window.addEventListener('hashchange', () => {
      this.setState({ route: parseRoute(window.location.hash) });
    });
  }

  getParams(searchTerms) {
    const newArr = [];
    for (const term of searchTerms) {
      if (term[0] === 'search') {
        newArr.push(term[1]);
      }
    }
    return newArr;
  }

  renderPage() {
    const { route } = this.state;
    const currentPath = this.getParams(route.params);
    if (route.path === '' || route.path === 'create') {
      return <Create />;
    }
    if (route.path === 'entries') {
      return <Entries />;
    }
    if (route.path === 'edit') {
      return <Edit />;
    }
    if (route.path === 'entry') {
      return <Entry value={currentPath}/>;
    }
  }

  render() {
    return (
      <>
      <Navbar />
      <PageContainer>
        {this.renderPage()}
      </PageContainer>
      </>
    );
  }
}
