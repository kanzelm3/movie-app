import './assets/styles/app.styl';
import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { Router, Route } from 'react-router';
import routes from './routes';

class App extends Component {
  render() {
    const { store, history } = this.props;
    return (
      <Provider store={store}>
        <Router history={history}>
          {routes}
        </Router>
      </Provider>
    );
  }
}

export default App;
