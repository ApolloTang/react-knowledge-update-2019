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
import {store} from './store'

import {ConnectedApp} from './app'



// =====================================
ReactDOM.render(
  <Provider store={store}>
    <ConnectedApp />
  </Provider>,
  document.getElementById('app')
)

