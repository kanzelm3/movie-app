import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux'
import config from './modules/config/reducer'
import movies from './modules/movies/reducer'

const rootReducer = combineReducers({
  config,
  movies,
  routing: routerReducer
})

export default rootReducer
