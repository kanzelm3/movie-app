import { Map, List, fromJS } from 'immutable';
import { createReducer } from 'redux-act';
import { loadConfigRequest, loadConfigSuccess, loadConfigFailure } from './actions';

const initialState = Map({
  isLoaded: false,
});

const handleLoadConfigRequest = (state) => state.set('isLoaded', false);
const handleLoadConfigSuccess = (state, payload) =>
  state
    .set('isLoaded', true)
    .merge(fromJS(payload.response));

export default createReducer({
  [loadConfigRequest]: handleLoadConfigRequest,
  [loadConfigSuccess]: handleLoadConfigSuccess,
}, initialState);
