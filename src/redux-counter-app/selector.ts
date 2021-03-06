import { Dispatch } from 'redux'

import {actions} from './action'

import {Tstore} from './store'


const mapStoreToProps = (store:Tstore) => {
  const count = store.count
  return {count}
}

const mapDispatchToProps = (dispatch:Dispatch) => (
  {
    dispatch_increase() { dispatch(actions.counter_increase()) },
    dispatch_decrease() { dispatch(actions.counter_decrease()) },
  }
)


type TmapDispatchToProps = ReturnType<typeof mapDispatchToProps>
type TmapStoreToProps = ReturnType<typeof mapStoreToProps>


export {
  TmapDispatchToProps,
  TmapStoreToProps,
  mapStoreToProps,
  mapDispatchToProps
}
