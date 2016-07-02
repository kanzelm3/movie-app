import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import api from './middleware/api'
import rootReducer from './rootReducer';

export default function configureStore(initialState, middleware) {
  return createStore(rootReducer, initialState, applyMiddleware(thunk, api, middleware));
}
