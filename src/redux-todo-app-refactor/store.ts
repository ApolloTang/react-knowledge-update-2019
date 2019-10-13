import {createStore} from 'redux'
import {combineReducers} from 'redux'

import todosReducer from './reducer'

import {
  Ttodos
} from './model'

const rootReducer = combineReducers(
  {
    todos:todosReducer
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
