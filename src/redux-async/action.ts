import { ThunkAction, ThunkDispatch } from 'redux-thunk'
import { Tstore } from './store'
import { api } from './api'
import {
  Tsubreddit_serialized
} from './model'

type Tpayload_subreddit = Tsubreddit_serialized
type Tpayload_subreddit_error = string | undefined


enum actionNames {
  fetchSubreddit_start = 'fetchSubreddit_start',
  fetchSubreddit_success = 'fetchSubreddit_success',
  fetchSubreddit_fail = 'fetchSubreddit_fail',
}


const action_fetchSubreddit_start = () => ({
  type: actionNames.fetchSubreddit_start as actionNames.fetchSubreddit_start
})
const action_fetchSubreddit_success = (payload_subreaddit:Tpayload_subreddit) => ({
  type: actionNames.fetchSubreddit_success as actionNames.fetchSubreddit_success,
  payload: payload_subreaddit
})
const action_fetchSubreddit_fail = (payload_subreddit_error:Tpayload_subreddit_error) => ({
  type: actionNames.fetchSubreddit_fail as actionNames.fetchSubreddit_fail,
  error: payload_subreddit_error
})


type Tactions_fetchSubreddit =
  ReturnType<typeof action_fetchSubreddit_start> |
  ReturnType<typeof action_fetchSubreddit_success> |
  ReturnType<typeof action_fetchSubreddit_fail>


const thunk_fetchSubreddit = ():ThunkAction< Promise<void>, Tstore, {}, Tactions_fetchSubreddit > =>
  async ( dispatch:ThunkDispatch< Tstore, {}, Tactions_fetchSubreddit >):Promise<void> => {
    dispatch( action_fetchSubreddit_start() )
    let payload_subreaddit = undefined as unknown as Tpayload_subreddit
    try {
      payload_subreaddit = await api.getPosts()
      dispatch( action_fetchSubreddit_success(payload_subreaddit) )
    } catch (error) {
      dispatch( action_fetchSubreddit_fail(error.toString()))
    }
}


const asyncActions = {
  thunk_fetchSubreddit,
  // thunk_postSubreddit    //<-- can have more thunk or action
}
type Tactions = Tactions_fetchSubreddit
  // | thunk_postSubreddit  // <-- combine all types of action or thunk

export {
  actionNames,
  Tactions,
  asyncActions,
}
