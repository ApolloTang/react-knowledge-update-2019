import {createStore} from 'redux'
import {combineReducers, applyMiddleware,  compose} from 'redux'
import thunk from 'redux-thunk'

import todosReducer, {
  Todos
} from './reducer'

interface Store {
  todos: Todos
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers(
  {
    todos: function(s={a:'a'}, a) {return s}
  }
)

const store = createStore(
  rootReducer,
  composeEnhancers(
    applyMiddleware(thunk)
  )
)

export default store
export {
  Store,
  rootReducer
}
