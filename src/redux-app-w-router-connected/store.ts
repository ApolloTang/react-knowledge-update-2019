import {
  createStore,
  combineReducers, applyMiddleware, compose
} from 'redux'
import thunk from 'redux-thunk'

import { createBrowserHistory, createMemoryHistory } from 'history'


const isTest = true // @TODO either use webpack or use mock module in test
// Howcome it is now irrelevant whether is is MemoryHistory or BrowserHistory ?
const history = isTest ? createMemoryHistory() : createBrowserHistory()

import { connectRouter, routerMiddleware } from 'connected-react-router'


// RootReducer
const rootReducer = combineReducers( {
  router: connectRouter(history),
  foo: (s={})=>s
})
type TrootReducer = ReturnType<typeof rootReducer>


// Store
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const store = createStore(
  rootReducer,
  composeEnhancers(
    applyMiddleware(routerMiddleware(history), thunk)
  )
)

export {
  store,
  rootReducer, TrootReducer,
  history
}
