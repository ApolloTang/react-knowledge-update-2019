import {createStore} from 'redux'
import {combineReducers, applyMiddleware, compose} from 'redux'
import thunk from 'redux-thunk'

import {
  reducer as subreddit,
} from './reducer'


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const rootReducer = combineReducers(
  {
    subreddit
  }
)

type Tstore = ReturnType<typeof rootReducer>


const store = createStore(
  rootReducer,
  composeEnhancers(
    applyMiddleware(thunk)
  )
)

export {
  Tstore,
  store,
  rootReducer
}
