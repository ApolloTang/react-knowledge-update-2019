import { Dispatch } from 'redux'

import {ACrtors_Counter} from './action'

import {State as Store} from './reducer'


const mapStoreToProps = (store:Store) => {
  const count = store.count
  return {count}
}

const mapDispatchToProps = (dispatch:Dispatch) => (
  {
    dispatch_increase() { dispatch(ACrtors_Counter.ACrtor_increase()) },
    dispatch_decrease() { dispatch(ACrtors_Counter.ACrtor_decrease()) },
  }
)

export {mapStoreToProps, mapDispatchToProps}
