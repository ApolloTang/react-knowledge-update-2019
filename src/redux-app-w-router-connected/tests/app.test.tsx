import React from 'react'

import { render, fireEvent, RenderResult } from '@testing-library/react'
import {
  createStore, Store,
  applyMiddleware
} from 'redux'
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'

import {App} from '../app'
import {
  rootReducer,
  history
} from '../store'

import { ConnectedRouter, routerMiddleware } from 'connected-react-router'
import { History } from  'history'


describe('[Connected Router]', () => {
  beforeEach(()=>{ })
  afterEach(()=>{ })

  describe('Navigate to page a', () => {

    it('Connected Router Redux show navigate to page a', () => {
      const store = createStore(
        rootReducer,
        {},
        applyMiddleware(routerMiddleware(history), thunk)
      )

      const {
        getByText
      } = renderWithConnectedRouter(<App />, history, store)

      const storeBeforeNavigate = store.getState()
      expect(storeBeforeNavigate.router.location.pathname).toBe('/')

      const link = getByText('Link to: /page a')
      fireEvent.click(link)

      const storeAfterNavigate = store.getState()
      expect(storeAfterNavigate.router.location.pathname).toBe('/a')
    })

    it('Make sure jsDom is clear from state from previous state', () => {
      const store = createStore(
        rootReducer,
        {},
        applyMiddleware(routerMiddleware(history), thunk)
      )

      const {
        queryByText,
      } = renderWithConnectedRouter(<App />, history, store)

      const pageContentA = queryByText('Page content a')
      expect(pageContentA).toBeNull()
      const storeBeforeNavigate = store.getState()
      expect(storeBeforeNavigate.router.location.pathname).toBe('/')
    })
  })

})



function renderWithConnectedRouter(
  ui:React.ReactNode,
  _history: History,
  _store:Store
):RenderResult {
  return render(
    <Provider store={_store}>
      <ConnectedRouter history={_history}>
        {ui}
      </ConnectedRouter>
    </Provider>
  )
}
