import React from 'react'
import {connect} from 'react-redux'

import {
  mapStoreToProps, mapDispatchToProps
} from './selector'


type AppProps =
  ReturnType<typeof mapStoreToProps> &
  ReturnType<typeof mapDispatchToProps>

const App = (
  {
    dispatch_increase,
    dispatch_decrease,
    count
  }:AppProps
) => (
  <div>
    <button onClick={dispatch_increase}>+</button>
    <button onClick={dispatch_decrease}>-</button>
    <div data-testid='count-value'>count: {count}</div>
  </div>
)

export default connect(
  mapStoreToProps,
  mapDispatchToProps
)(App)
