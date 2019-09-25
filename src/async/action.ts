import { ThunkAction, ThunkDispatch } from 'redux-thunk'
import {Store} from './store'
import api, { TapiPosts, TapiPostsError } from './api'


//
//  Fetch SubReddit
//
enum TactionNames {
  fetchSubreddit_start = 'fetchSubreddit_start',
  fetchSubreddit_success = 'fetchSubreddit_success',
  fetchSubreddit_fail = 'fetchSubreddit_fail',
}

const action_fetchSubreddit_start = () => ({
  type: TactionNames.fetchSubreddit_start as TactionNames.fetchSubreddit_start
})
const action_fetchSubreddit_success = (posts:TapiPosts) => ({
  type: TactionNames.fetchSubreddit_success as TactionNames.fetchSubreddit_success,
  payload: posts
})
const action_fetchSubreddit_fail = (error:TapiPostsError) => ({
  type: TactionNames.fetchSubreddit_fail as TactionNames.fetchSubreddit_fail,
  error
})

type Tactions_fetchSubreddit =
  ReturnType<typeof action_fetchSubreddit_start> |
  ReturnType<typeof action_fetchSubreddit_success> |
  ReturnType<typeof action_fetchSubreddit_fail>


const thunk_fetchSubreddit =
  ():ThunkAction<Promise<TapiPosts>, Store, {}, Tactions_fetchSubreddit> =>
  async (
    dispatch:ThunkDispatch<Store, {}, Tactions_fetchSubreddit>,
  ):Promise<TapiPosts> => {
    dispatch( action_fetchSubreddit_start() )
    let posts:TapiPosts = undefined
    try {
      posts = await api.subReddit.getPosts()
      dispatch( action_fetchSubreddit_success(posts) )
    } catch (error) {
      dispatch( action_fetchSubreddit_fail(error.toString()))
    }
    return posts
}


//
//  refresh SubReddit
//
enum TactionNames {
  refreshSubReddit = 'refreshSubReddit'
}
const action_refreshSubreddit = () => ({
  type: TactionNames.refreshSubReddit as TactionNames.refreshSubReddit,
})

type Tactions_refreshSubreddit =
  ReturnType<typeof action_refreshSubreddit>

const thunk_refreshSubreddit =
  ():ThunkAction<void, Store, {}, Tactions_refreshSubreddit> =>
  ( dispatch: ThunkDispatch<Store, {}, Tactions_refreshSubreddit>):void => {
    dispatch(action_refreshSubreddit())
    dispatch(thunk_fetchSubreddit())
  }

const actions = {
  thunk_fetchSubreddit,
  thunk_refreshSubreddit
}

export {
  TactionNames,
  actions,
  Tactions_fetchSubreddit,
  Tactions_refreshSubreddit
}
