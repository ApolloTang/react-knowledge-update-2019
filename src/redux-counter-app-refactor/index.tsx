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
import {createStore} from 'redux'

import {ConnectedApp} from './app'
import {reducer} from './reducer'


const store = createStore(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

// =====================================
ReactDOM.render(
  <Provider store={store}>
    <ConnectedApp />
  </Provider>,
  document.getElementById('app')
)

