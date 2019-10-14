import { Dispatch } from 'redux'

import {actions} from './action'

import {State as Store} from './reducer'


const mapStoreToProps = (store:Store) => {
  const count = store.count
  return {count}
}

const mapDispatchToProps = (dispatch:Dispatch) => (
  {
    dispatch_increase() { dispatch(actions.counter_increase()) },
    dispatch_decrease() { dispatch(actions.counter_decrease()) },
  }
)

export {mapStoreToProps, mapDispatchToProps}
