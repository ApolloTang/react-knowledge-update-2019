import React from 'react'
import ReactDOM from 'react-dom'

const container = document.createElement('div')
container.id = 'app'
document.body.appendChild(container)

// =====================================

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION__:any
  }
}


import {Provider} from 'react-redux'
import {createStore, combineReducers} from 'redux'

import App from './app'
import todosReducer from './reducer'

const rootReducer = combineReducers(
  {
    todos:todosReducer
  }
)

const store = createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

// =====================================
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('app')
)

