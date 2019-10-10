import React from 'react'
import { createStore,
  combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'

import { render, fireEvent, cleanup } from '@testing-library/react'

import {RouterApp} from '../app'


import { createBrowserHistory } from 'history'
import { connectRouter, routerMiddleware } from 'connected-react-router'

describe('[Connected Router]', () => {
  beforeEach(()=>{
    cleanup()
  })

  afterEach(()=>{
    cleanup()
  })


  describe('Navigate to page a', () => {

    it('Connected Router Redux has path name /a', () => {
      const {
        getByText,
        store
      } = renderWithStore(<RouterApp/>)

      // const storeBeforeNavigate = store.getState()
      // expect(storeBeforeNavigate.router.location.pathname).toBe('/')

      const link = getByText('Link to: /page a')
      fireEvent.click(link)
      // const storeAfterNavigate = store.getState()
      // expect(storeAfterNavigate.router.location.pathname).toBe('/a')


    })

    it('Connected Router Redux handle no match', () => {
      const {
        container, debug,
        getByText,
        store, history
      } = renderWithStore(<RouterApp/>)

      debug(container)  //<--- jestDom was not clear

      const link = getByText(/Link to: \/page a/i)

      // const storeBeforeNavigate = store.getState()
      // expect(storeBeforeNavigate.router.location.pathname).toBe('/')

      // history.push('/some/bad/route')
      //
      // // const link = getByText('Link to: /page a')
      // // fireEvent.click(link)
      //
      // const storeAfterNavigate = store.getState()
      // expect(storeAfterNavigate.router.location.pathname).toBe('/a')
    })

  })

  // describe('Navigate to a non-existing route', () => {
  //
  //
  //
  // })
})


function renderWithStore(
  ui:React.ReactNode
) {
  const history = createBrowserHistory()

  // RootReducer
  const RootReducer = combineReducers( {
    router: connectRouter(history),
  })

  const store = createStore(
    RootReducer,
    {},
    applyMiddleware(routerMiddleware(history), thunk)
  )
  const rendered = render(
    <Provider store={store}>
      {ui}
    </Provider>
  )
  return {...rendered, store, history}
}

