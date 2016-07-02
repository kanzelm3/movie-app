import { createStore, compose, applyMiddleware } from 'redux';
import { persistState } from 'redux-devtools';
import thunk from 'redux-thunk';
import api from './middleware/api'
import rootReducer from './rootReducer';

const enhancer = middleware => compose(
  applyMiddleware(thunk, api, middleware),
  window.devToolsExtension ? window.devToolsExtension() : f => f,
  persistState(
    window.location.href.match(
      /[?&]debug_session=([^&#]+)\b/
    )
  )
);

export default function configureStore(initialState, middleware) {
  const store = createStore(rootReducer, initialState, enhancer(middleware));

  if (module.hot) {
    module.hot.accept('./rootReducer', () =>
      store.replaceReducer(require('./rootReducer').default)
    );
  }

  return store;
}
