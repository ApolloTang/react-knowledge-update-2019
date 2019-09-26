import {createStore} from 'redux'
import {combineReducers, applyMiddleware,  compose} from 'redux'
import thunk from 'redux-thunk'

import {
  reducer as subreddit,
  Treducer as Tsubreddit,
} from './reducer'

interface Store {
  subreddit:Tsubreddit
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const rootReducer = combineReducers(
  {
    subreddit
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
