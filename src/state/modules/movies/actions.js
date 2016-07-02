import { createAction, createReducer } from 'redux-act';
import { CALL_API } from '../../middleware/api'
import { MOVIES_ARRAY } from './schema';

export const loadMoviesRequest = createAction('load movies request');
export const loadMoviesSuccess = createAction('load movies success');
export const loadMoviesFailure = createAction('load movies failure');
export const loadMovies = (page) => (dispatch, getState) => {
  const state = getState().movies;
  if (!state.get('isFetching'))
    return dispatch({
      [CALL_API]: {
        types: [ loadMoviesRequest.getType(), loadMoviesSuccess.getType(), loadMoviesFailure.getType() ],
        endpoint: `/movie/popular?page=${page}`,
        schema: MOVIES_ARRAY,
        getData: (res) => res.results
      }
    });
};
