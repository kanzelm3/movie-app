import { Map, List, Set, fromJS } from 'immutable';
import { createReducer } from 'redux-act';
import { loadMoviesRequest, loadMoviesSuccess, loadMoviesFailure } from './actions';

const initialState = Map({
  fetchedPages: Set(),
  itemsPerPage: 20,
  totalItems: 200,
  ids: List(),
  entities: Map(),
});

const handleLoadMoviesRequest = (state, payload) =>
  state
    .set('fetchedPages', state.get('fetchedPages').add(payload.page));
const handleLoadMoviesSuccess = (state, payload) =>
  state
    .set('ids', List(payload.response.result))
    .mergeIn(['entities'], fromJS(payload.response.entities.movies));
const handleLoadMoviesFailure = (state, payload) =>
  state
    .set('fetchedPages', state.get('fetchedPages').delete(payload.page));

export default createReducer({
  [loadMoviesRequest]: handleLoadMoviesRequest,
  [loadMoviesSuccess]: handleLoadMoviesSuccess,
  [loadMoviesFailure]: handleLoadMoviesFailure,
}, initialState);
