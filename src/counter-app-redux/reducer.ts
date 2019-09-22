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
  action:TACrtors_Counter
):State {
  switch (action.type) {
    case ANames_Counter.INCREMENT:
      type inc = typeof action
      return {
        ...state,
        count: state.count + 1
      }
    case ANames_Counter.DECREMENT:
      type dec = typeof action
      return {
        ...state,
        count: state.count - 1
      }
    default:
      type catchall = typeof action
      return state
  }
}

export {
  State,
  initialState,
}

export default reducer
