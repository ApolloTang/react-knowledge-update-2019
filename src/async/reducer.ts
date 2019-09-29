import {
  TactionNames,
  Tactions
} from './action'

import {
  Tposts
} from './model'


interface Treducer {
  posts     : undefined|Tposts
  receivedAt: undefined|number
  isLoading : boolean
  errorMsg  : undefined|string
}
const initialState:Treducer = {
  posts     : undefined,
  receivedAt: undefined,
  isLoading : false,
  errorMsg  : undefined
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
        isLoading: true,
        errorMsg: undefined
      }
    }
    case TactionNames.fetchSubreddit_success: {
      type Tsuccess = typeof action
      const payload = action && action.payload && action.payload
      const posts = payload && payload.posts
      const receivedAt = payload && payload.receivedAt
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
