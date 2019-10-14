import '@testing-library/jest-dom/extend-expect'

import React from 'react'
import {Provider} from 'react-redux'
import {createStore} from 'redux'
import {
  render,
  fireEvent
} from '@testing-library/react'

import reducer from './reducer'
import ConnectedApp from './app'


test('can render app with redux defaults state', ()=>{
  const store = createStore(reducer)
  const {
    getByTestId
  } = render(
    <Provider store={store} >
      <ConnectedApp />
    </Provider>
  )
  const counterDisplay = getByTestId('count-value')
  expect(counterDisplay).toHaveTextContent('0')
})


test('can increase counter from default state', ()=>{
  const store = createStore(reducer)
  const {
    getByText,
    getByTestId
  } = render(
    <Provider store={store} >
      <ConnectedApp />
    </Provider>
  )
  const counterDisplay = getByTestId('count-value')
  const increaseButton = getByText('+')
  expect(counterDisplay).toHaveTextContent('0')
  fireEvent.click(increaseButton)
  expect(counterDisplay).toHaveTextContent('1')
})
