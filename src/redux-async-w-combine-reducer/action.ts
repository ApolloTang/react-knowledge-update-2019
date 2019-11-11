import { ThunkAction, ThunkDispatch } from 'redux-thunk'

import { Tstore } from './store'
import { api } from './api'
import { Tsubreddit_serialized } from './model'


enum actionNames {
  fetchSubreddit_start = 'fetchSubreddit_start',
  fetchSubreddit_success = 'fetchSubreddit_success',
  fetchSubreddit_fail = 'fetchSubreddit_fail',
}




type Tpayload_subreddit = Tsubreddit_serialized
type Tpayload_subreddit_error = string | undefined

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
    // dispatch (1): flag to applincation to loading state
    dispatch( action_fetchSubreddit_start() )

    let payload_subreaddit = undefined as unknown as Tpayload_subreddit
    // In the above, we declare payload_subreaddit but it has the value of
    // undefined, which is not our schema. So we need to cast it to tell typescript
    // this will be the type it expected: the Tpayload_subreddit or Tsubreddit_serialized.

    try {
      payload_subreaddit = await api.getPosts()
      // dispatch (2a): we have data!
      dispatch( action_fetchSubreddit_success(payload_subreaddit) )
    } catch (error) {
      // dispatch (2b): we have error
      dispatch( action_fetchSubreddit_fail(error.toString()))
    }
}


const asyncActions = { // <--- here we package all our thunks into an object
  thunk_fetchSubreddit,
  // thunk_deleteSubreddit    //<-- can have more thunk in the future
}

type Tactions = Tactions_fetchSubreddit
// In the the above we merge the action-creator of this
// feature (todos list) into the application action type


export {
  actionNames,
  asyncActions,

  Tactions,
}
