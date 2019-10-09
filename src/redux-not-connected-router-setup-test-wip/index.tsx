import React from 'react'
import ReactDOM from 'react-dom'


const container = document.createElement('div')
container.id = 'app'
document.body.appendChild(container)

// ===================================================

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__:any
  }
}

import { Provider } from 'react-redux'
import { store } from './store'
import { RouterApp } from './App'


// ===================================================
ReactDOM.render(
  <Provider store={store}>
    <RouterApp/>
  </Provider>,
  document.getElementById('app')
)
