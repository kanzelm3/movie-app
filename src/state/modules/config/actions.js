import { createAction, createReducer } from 'redux-act'
import { CALL_API } from '../../middleware/api'

export const loadConfigRequest = createAction('load api config request')
export const loadConfigSuccess = createAction('load api config success')
export const loadConfigFailure = createAction('load api config failure')
export const loadConfig = (page) => (dispatch, getState) => {
  const state = getState().config;
  if (!state.get('isLoaded'))
    return dispatch({
      [CALL_API]: {
        types: [ loadConfigRequest.getType(), loadConfigSuccess.getType(), loadConfigFailure.getType() ],
        endpoint: '/configuration'
      }
    });
};
