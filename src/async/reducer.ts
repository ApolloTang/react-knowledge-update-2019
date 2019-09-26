import {
  TactionNames,
  Tactions
} from './action'

import {
  TpostData,
} from './api'

interface Treducer {
  posts: undefined|TpostData[]
  receivedAt: undefined|number
  isLoading: boolean
  errorMsg: undefined|string
}
const initialState:Treducer = {
  posts: undefined,
  receivedAt: undefined,
  isLoading: false,
  errorMsg: undefined
}

function reducer(
  state:Treducer = initialState,
  action:Tactions
):Treducer {
  switch (action.type) {
    case TactionNames.fetchSubreddit_start: {
      type Tstart = typeof action
      return {
        ...state,
        isLoading: true
      }
    }
    case TactionNames.fetchSubreddit_success: {
      type Tsuccess = typeof action
      const posts = action && action.payload && action.payload.posts
      const receivedAt = action && action.payload && action.payload.receivedAt
      return {
        ...state,
        posts,
        receivedAt,
        isLoading: false,
        errorMsg: undefined
      }
    }
    case TactionNames.fetchSubreddit_fail: {
      type Tfail = typeof action
      const error = action && action.error
      return {
        ...state,
        isLoading: false,
        errorMsg: error
      }
    }
    default:
      type TcatchAll = typeof action
      return state
  }
}

export {
  initialState,
  reducer,
  Treducer
}
