import {
  actionNames,
  Tactions
} from './action'

interface Treducer {
  readonly count: number
}

const initialState:Treducer = {count:0}

function reducer(
  state:Treducer = initialState,
  action:Tactions
):Treducer {
  switch (action.type) {
    case actionNames.counter_increase:
      type Tinc = typeof action
      return {
        ...state,
        count: state.count + 1
      }
    case actionNames.counter_decrease:
      type Tdec = typeof action
      return {
        ...state,
        count: state.count - 1
      }
    default:
      type Tcatchall = typeof action
      return state
  }
}

export {
  initialState,
  reducer
}

