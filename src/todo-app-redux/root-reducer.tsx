import todosReducer from './reducer'
import {combineReducers} from 'redux'

const rootReducer = combineReducers(
  {
    todos:todosReducer
  }
)

export {rootReducer}
