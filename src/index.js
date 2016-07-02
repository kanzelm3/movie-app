import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { useRouterHistory } from 'react-router';
import { createHistory, useBeforeUnload } from 'history';
import { syncHistoryWithStore, routerMiddleware } from 'react-router-redux';
import configureStore from './state/configureStore';
import App from './App';

const history = useRouterHistory(useBeforeUnload(createHistory))();
const store = configureStore({}, routerMiddleware(history));
const syncedHistory = syncHistoryWithStore(history, store);

const root = document.createElement('div');
document.body.appendChild(root);

render(
  <AppContainer>
    <App store={store} history={syncedHistory} />
  </AppContainer>,
  root
);

if (module.hot) {
  module.hot.accept('./App', () => {
    const HotApp = require('./App').default;
    render(
      <AppContainer>
        <HotApp store={store} history={syncedHistory} />
      </AppContainer>,
      root
    );
  });
}
