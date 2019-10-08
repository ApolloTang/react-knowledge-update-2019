import {createStore} from 'redux'
import {createBrowserHistory, History} from 'history'
import {applyMiddleware, combineReducers, compose } from 'redux'
import {connectRouter, routerMiddleware} from 'connected-react-router'
import thunk from 'redux-thunk'

const history = createBrowserHistory()


// Reducer
const createRootReducer = (history:History) => combineReducers( {
  router: connectRouter(history),
  foo: (s={})=>s
})


// Store
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const store = createStore(
  createRootReducer(history),
  /* preloaded state, */
  composeEnhancers(
    applyMiddleware(routerMiddleware(history), thunk)
  )
)


export default store
export {history, createRootReducer}
