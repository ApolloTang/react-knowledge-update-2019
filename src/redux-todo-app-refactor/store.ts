import {createStore} from 'redux'
import {combineReducers} from 'redux'

import {reducer} from './reducer'

import {
  Ttodos
} from './model'

const rootReducer = combineReducers(
  {
    todos:reducer
  }
)

interface Store {
  todos: Ttodos
}

const store = createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

export default store
export {
  Store,
  rootReducer
}
