import {createStore} from 'redux'
import {combineReducers} from 'redux'

import todosReducer, {
  Ttodos
} from './reducer'


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
