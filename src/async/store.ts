import {createStore} from 'redux'
import {combineReducers, applyMiddleware,  compose} from 'redux'
import thunk from 'redux-thunk'

import reducerSubreddit, {
  TreducerSubreddit
} from './reducer'

interface Store {
  Subreddit: TreducerSubreddit
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers(
  {
    Subreddit: reducerSubreddit
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
