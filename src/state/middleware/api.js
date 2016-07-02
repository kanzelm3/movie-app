import { Schema, arrayOf, normalize } from 'normalizr'
import { camelizeKeys } from 'humps'

const API_ROOT = 'https://api.themoviedb.org/3'

function callApi(endpoint) {
  const fullUrl = !endpoint.includes(API_ROOT) ? API_ROOT + endpoint : endpoint

  return fetch(`${fullUrl}${fullUrl.includes('?') ? '&' : '?'}api_key=4f5e790fefb12689e3aa4264e24f25d8`)
    .then(response =>
      response.json().then(json => ({ json, response }))
    ).then(({ json, response }) => {
      if (!response.ok) {
        return Promise.reject(json)
      }
      return camelizeKeys(json)
    })
}

export const CALL_API = Symbol('Call API')

export default store => next => action => {
  const callAPI = action[CALL_API]
  if (typeof callAPI === 'undefined') {
    return next(action)
  }

  let { endpoint } = callAPI
  const { schema, types, getData = (d) => d } = callAPI

  if (typeof endpoint === 'function') {
    endpoint = endpoint(store.getState())
  }

  if (typeof endpoint !== 'string') {
    throw new Error('Specify a string endpoint URL.')
  }
  if (!Array.isArray(types) || types.length !== 3) {
    throw new Error('Expected an array of three action types.')
  }
  if (!types.every(type => typeof type === 'string')) {
    throw new Error('Expected action types to be strings.')
  }

  function actionWith(data) {
    const finalAction = Object.assign({}, action, data)
    delete finalAction[CALL_API]
    return finalAction
  }

  const [ requestType, successType, failureType ] = types
  next(actionWith({ type: requestType }))

  return callApi(endpoint).then(json => {
    const data = getData(json);
    if (schema) {
      return normalize(data, schema);
    }
    return data;
  }).then(
    response => next(actionWith({
      type: successType,
      payload: {
        response
      }
    })),
    error => next(actionWith({
      type: failureType,
      payload: {
        error: error.message || 'Something bad happened'
      }
    }))
  )
}
