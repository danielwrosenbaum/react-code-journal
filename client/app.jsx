
import React from 'react';
import parseRoute from '../../Final-Project/client/lib/parse-route';
import Navbar from './components/nav-bar';
import PageContainer from './components/page-container';
import Create from './pages/create';
import Entries from './pages/entries';
import Edit from './pages/edit';

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
    console.log('route path', route.path);
    if (route.path === '' || route.path === 'create') {
      return <Create />;
    }
    if (route.path === 'entries') {
      return <Entries />;
    }
    if (route.path === 'edit') {
      return <Edit />;
    }
  }

  render() {
    // const { route } = this.state;
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
