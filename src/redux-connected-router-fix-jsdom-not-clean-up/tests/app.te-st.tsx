import React from 'react'
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'

import {routerMiddleware} from 'connected-react-router'
import {history, RootReducer} from '../store'

import { render, fireEvent } from '@testing-library/react'

import {RouterApp} from '../app'




describe('[Connected Router]', () => {
  beforeEach(()=>{
  })

  afterEach(()=>{
  })

  describe('Navigate to page a', () => {
    it('Page A content appear', () => {
      const {
        getByText,
      } = renderWithStore(<RouterApp/>)

      const link = getByText('Link to: /page a')
      fireEvent.click(link)

      getByText('Page content a')
    })

    it('Connected Router Redux has path name /a', () => {
      const {
        getByText,
        store
      } = renderWithStore(<RouterApp/>)

      const storeBeforeNavigate = store.getState()
      expect(storeBeforeNavigate.router.location.pathname).toBe('/')

      const link = getByText('Link to: /page a')
      fireEvent.click(link)

      const storeAfterNavigate = store.getState()
      expect(storeAfterNavigate.router.location.pathname).toBe('/a')
    })
  })
})


function renderWithStore(
  ui:React.ReactNode
) {
  const store = createStore(
    RootReducer,
    applyMiddleware(routerMiddleware(history), thunk)
  )
  const rendered = render(
    <Provider store={store}>
      {ui}
    </Provider>
  )
  return {...rendered, store}
}
