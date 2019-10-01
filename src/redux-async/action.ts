import { ThunkAction, ThunkDispatch } from 'redux-thunk'
import {Tstore} from './store'
import api from './api'
import {
  Tsubreddit_serialized
} from './model'

type Tpayload_subreddit = Tsubreddit_serialized | undefined
type Tpayload_subreddit_error = string | undefined


enum TactionNames {
  fetchSubreddit_start = 'fetchSubreddit_start',
  fetchSubreddit_success = 'fetchSubreddit_success',
  fetchSubreddit_fail = 'fetchSubreddit_fail',
}


const action_fetchSubreddit_start = () => ({
  type: TactionNames.fetchSubreddit_start as TactionNames.fetchSubreddit_start
})
const action_fetchSubreddit_success = (payload_subreaddit:Tpayload_subreddit) => ({
  type: TactionNames.fetchSubreddit_success as TactionNames.fetchSubreddit_success,
  payload: payload_subreaddit
})
const action_fetchSubreddit_fail = (payload_subreddit_error:Tpayload_subreddit_error) => ({
  type: TactionNames.fetchSubreddit_fail as TactionNames.fetchSubreddit_fail,
  error: payload_subreddit_error
})


type Tactions_fetchSubreddit =
  ReturnType<typeof action_fetchSubreddit_start> |
  ReturnType<typeof action_fetchSubreddit_success> |
  ReturnType<typeof action_fetchSubreddit_fail>


const thunk_fetchSubreddit =
  ():ThunkAction<
    Promise<Tpayload_subreddit>,
    Tstore,
    {},
    Tactions_fetchSubreddit
  > => async ( dispatch:ThunkDispatch<
      Tstore,
      {},
      Tactions_fetchSubreddit
    >,
  ):Promise<Tpayload_subreddit> => {
    dispatch( action_fetchSubreddit_start() )
    let payload_subreaddit:Tpayload_subreddit = undefined
    try {
      payload_subreaddit = await api.subReddit.getPosts()
      dispatch( action_fetchSubreddit_success(payload_subreaddit) )
    } catch (error) {
      dispatch( action_fetchSubreddit_fail(error.toString()))
    }
    return payload_subreaddit
}


const actions = {
  thunk_fetchSubreddit,
  // thunk_postSubreddit    //<-- can have more thunk or action
}
type Tactions = Tactions_fetchSubreddit
  // | thunk_postSubreddit  // <-- combine all types of action or thunk

export {
  TactionNames,
  Tactions,
  actions,
}
