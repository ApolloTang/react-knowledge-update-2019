import React from 'react'

import { render, fireEvent} from '@testing-library/react'
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'

import {App} from '../app'
import {rootReducer} from '../store'

import {Router} from 'react-router-dom'
import { createMemoryHistory, History } from 'history'




describe('[Router]', () => {
  beforeEach(()=>{ })
  afterEach(()=>{ })

  describe('Navigate to page a', () => {
    it('Router can navigate to page a', () => {
      const history = createMemoryHistory()
      const {
        getByText
      } = renderWithStoreAndRouter(<App />, history)

      const link = getByText('Link to: /page a')
      fireEvent.click(link)
    })

    it('Make sure jsDom is clear from state from previous state', () => {
      const history = createMemoryHistory()
      const {
        queryByText,
      } = renderWithStoreAndRouter(<App />, history)

      const pageContentA = queryByText('Page content a')
      expect(pageContentA).toBeNull()
    })
  })

  it('router can handle no match', () => {
      const history = createMemoryHistory()
      const {
        getByText
      } = renderWithStoreAndRouter(<App />, history)

      history.push('/does-not-exit')

      getByText('Page no match')
    })
})




function renderWithStoreAndRouter(
  ui:React.ReactNode,
  history: History
) {
  const store = createStore(rootReducer, applyMiddleware(thunk))
  return render(
    <Provider store={store}>
      <Router history={history}>
        {ui}
      </Router>
    </Provider>
  )
}
