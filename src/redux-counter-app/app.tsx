import React from 'react'
import {connect} from 'react-redux'
import {
  TmapDispatchToProps,
  TmapStoreToProps,
  mapStoreToProps,
  mapDispatchToProps
} from './selector'


type TAppProps = {
} & TmapStoreToProps & TmapDispatchToProps

const App = (
  {
    dispatch_increase,
    dispatch_decrease,
    count
  }:TAppProps
) => (
  <div>
    <button onClick={dispatch_increase}>+</button>
    <button onClick={dispatch_decrease}>-</button>
    <div data-testid='count-value'>count: {count}</div>
  </div>
)

const ConnectedApp =  connect(
  mapStoreToProps,
  mapDispatchToProps
)(App)

export {
  ConnectedApp
}
