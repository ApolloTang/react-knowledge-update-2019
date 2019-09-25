import {
  ANames,
  Actions_fetchSubReddit
} from './action'

import {
  TpostData,
} from './api'

interface TreducerSubreddit {
  posts: undefined|TpostData[]
  receivedAt: undefined|number
  isLoading: boolean
  errorMsg: undefined|string
}
const initialState:TreducerSubreddit = {
  posts: undefined,
  receivedAt: undefined,
  isLoading: false,
  errorMsg: undefined
}

function reducerSubreddit(
  state:TreducerSubreddit = initialState,
  action:Actions_fetchSubReddit
):TreducerSubreddit {
  switch (action.type) {
    case ANames.fetchSubReddit_start: {
      type Tstart = typeof action
      return {
        ...state,
        isLoading: true
      }
    }
    case ANames.fetchSubReddit_success: {
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
    case ANames.fetchSubReddit_fail: {
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
  TreducerSubreddit
}
export default reducerSubreddit
