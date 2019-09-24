import {createStore} from 'redux'
import {combineReducers, applyMiddleware,  compose} from 'redux'
import thunk from 'redux-thunk'

import todosReducer, {
  Todos
} from './reducer'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION__COMPOSE__ || compose

const rootReducer = combineReducers(
  {
    todos:todosReducer
  }
)

interface Store {
  todos: Todos
}

const store = createStore(
  rootReducer,
  composeEnhancers(
    applyMiddleware(...[thunk])
  )
)

export default store
export {
  Store,
  rootReducer
}
