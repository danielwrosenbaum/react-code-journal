
import React from 'react';
import parseRoute from '../../Final-Project/client/lib/parse-route';
import PageContainer from './components/page-container';
import Create from './pages/create';
import Entries from './pages/entries';

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

  renderPage() {
    const { route } = this.state;
    if (route.path === '' || route.path === 'create') {
      return <Create />;
    }
    if (route.path === 'entries') {
      return <Entries />;
    }
  }

  render() {
    // const { route } = this.state;
    return (
      <PageContainer>
        {this.renderPage()}
      </PageContainer>
    );
  }
}
