import {
  createStore,
  combineReducers, applyMiddleware, compose
} from 'redux'
import thunk from 'redux-thunk'

import { createBrowserHistory } from 'history'
const history = createBrowserHistory()



// RootReducer
const RootReducer = combineReducers({
  foo: (s={})=>s
})


// Store
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const store = createStore(
  RootReducer,
  composeEnhancers(
    applyMiddleware(thunk)
  )
)


export {store, history}
