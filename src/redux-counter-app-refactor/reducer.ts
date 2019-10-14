import {
  actionNames,
  Tactions
} from './action'

interface State {
  readonly count: number
}

const initialState:State = {count:0}

function reducer(
  state:State = initialState,
  action:Tactions
):State {
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
  State,
  initialState,
  reducer
}

