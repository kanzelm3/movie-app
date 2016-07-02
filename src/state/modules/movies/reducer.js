import { Map, List, fromJS } from 'immutable';
import { createReducer } from 'redux-act';
import { loadMoviesRequest, loadMoviesSuccess, loadMoviesFailure } from './actions';

const initialState = Map({
  isFetching: false,
  page: 1,
  itemsPerPage: 20,
  totalItems: 2000,
  ids: List(),
  entities: Map(),
});

const handleLoadMoviesRequest = (state) => state.set('isFetching', true);
const handleLoadMoviesSuccess = (state, payload) =>
  state
    .set('isFetching', false)
    .set('page', state.get('page') + 1)
    .set('ids', List(payload.response.result))
    .mergeIn(['entities'], fromJS(payload.response.entities.movies));
const handleLoadMoviesFailure = (state) => state.set('isFetching', false);

export default createReducer({
  [loadMoviesRequest]: handleLoadMoviesRequest,
  [loadMoviesSuccess]: handleLoadMoviesSuccess,
  [loadMoviesFailure]: handleLoadMoviesFailure,
}, initialState);
