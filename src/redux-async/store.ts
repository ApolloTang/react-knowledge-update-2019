import {createStore} from 'redux'
import {applyMiddleware, compose} from 'redux'
import thunk from 'redux-thunk'

import { reducer } from './reducer'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

type Tstore = ReturnType<typeof reducer>

const store = createStore(
  reducer,
  composeEnhancers(
    applyMiddleware(thunk)
  )
)

export {
  Tstore,
  store
}
