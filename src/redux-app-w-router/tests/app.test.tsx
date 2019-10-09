import React from 'react'
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'

import {routerMiddleware} from 'connected-react-router'
import {history, createRootReducer} from '../store'

import { render, wait, fireEvent } from '@testing-library/react'

import App from '../app'





describe('[Fetching Subreddit App]', () => {
  beforeEach(()=>{
  })

  afterEach(()=>{
  })

  it('During initial loading there should be no subreddit', async () => {
    const {
      getByText,
    } = renderWithStore(<App history={history}/>)
    await wait(
      () => {
        getByText(/loading/i)
      }
    )
  })
})


function renderWithStore(
  ui:React.ReactNode
) {

  const store = createStore(
    createRootReducer(history),
    applyMiddleware(routerMiddleware(history), thunk)
  )
  // const store = createStore(rootReducer, applyMiddleware(thunk))
  return render(
    <Provider store={store}>
      {ui}
    </Provider>
  )
}
