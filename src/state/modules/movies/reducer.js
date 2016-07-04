import { Map, List, Set, fromJS } from 'immutable';
import { createReducer } from 'redux-act';
import { loadMoviesRequest, loadMoviesSuccess, loadMoviesFailure } from './actions';

const initialState = Map({
  isFetching: false,
  fetchedPages: Set(),
  itemsPerPage: 20,
  totalItems: 1000,
  ids: List(),
  entities: Map(),
});

const handleLoadMoviesRequest = (state, payload) =>
  state
    .set('isFetching', true)
    .set('fetchedPages', state.get('fetchedPages').add(payload.page));
const handleLoadMoviesSuccess = (state, payload) => {
  const newState = state
    .set('isFetching', false)
    .set('ids', List(payload.response.result))
    .mergeIn(['entities'], fromJS(payload.response.entities.movies));
  return newState.set('entities', newState.get('entities').sortBy(movie => -movie.get('popularity')));
};
const handleLoadMoviesFailure = (state, payload) =>
  state
    .set('isFetching', false)
    .set('fetchedPages', state.get('fetchedPages').delete(payload.page));

export default createReducer({
  [loadMoviesRequest]: handleLoadMoviesRequest,
  [loadMoviesSuccess]: handleLoadMoviesSuccess,
  [loadMoviesFailure]: handleLoadMoviesFailure,
}, initialState);
