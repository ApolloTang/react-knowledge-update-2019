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
    case actionNames.INCREMENT:
      type inc = typeof action
      return {
        ...state,
        count: state.count + 1
      }
    case actionNames.DECREMENT:
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
  reducer
}

