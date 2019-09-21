import {
  ANames_Counter,
  TACrtors_Counter
} from './action'

interface State {
  readonly count: number
}

interface UnknownAction {
  type?:unknown
  payload?: any
}

const initialState:State = {count:0}

function reducer(
  state:State = initialState,
  action:(TACrtors_Counter|UnknownAction)
):State {
  switch (action.type) {
    case ANames_Counter.INCREMENT:
      type inc = typeof action.type
      return {
        ...state,
        count: state.count + 1
      }
    case ANames_Counter.DECREMENT:
      type dec = typeof action.type
      return {
        ...state,
        count: state.count - 1
      }
    default:
      type catchall = typeof action.type
      return state
  }
}

export {
  State,
  // UnknownAction,
  // -------
  initialState,
}

export default reducer
