import { ThunkAction, ThunkDispatch } from 'redux-thunk'
import {Store} from './store'
import Api, { Post, ApiError } from './api'


//
//  Fetch SubReddit
//
enum ANames {
  fetchSubReddit_start = 'fetchSubReddit_start',
  fetchSubReddit_success = 'fetchSubReddit_success',
  fetchSubReddit_fail = 'fetchSubReddit_fail',
}

const action_fetchSubReddit_start = () => ({
  type: ANames.fetchSubReddit_start as ANames.fetchSubReddit_start
})
const action_fetchSubReddit_success = (post:Post) => ({
  type: ANames.fetchSubReddit_success as ANames.fetchSubReddit_success,
  payload: post
})
const action_fetchSubReddit_fail = (error:ApiError) => ({
  type: ANames.fetchSubReddit_fail as ANames.fetchSubReddit_fail,
  error
})

type Actions_fetchSubReddit =
  ReturnType<typeof action_fetchSubReddit_start> |
  ReturnType<typeof action_fetchSubReddit_success> |
  ReturnType<typeof action_fetchSubReddit_fail> |
  ReturnType<typeof action_refreshSubRedditPosts>


const thunk_fetchSubRedditPosts =
  ():ThunkAction<Promise<Post>, Store, {}, Actions_fetchSubReddit> =>
  async (
    dispatch:ThunkDispatch<Store, {}, Actions_fetchSubReddit>,
  ):Promise<Post> => {
    dispatch( action_fetchSubReddit_start() )
    let post = ''
    try {
       post = await Api.subReddit.getPost()
      dispatch( action_fetchSubReddit_success(post) )
    } catch (error) {
      dispatch( action_fetchSubReddit_fail(error) )
    }
    return post
}


//
//  refresh SubReddit
//
enum ANames {
  refreshSubReddit = 'refreshSubReddit'
}
const action_refreshSubRedditPosts = () => ({
  type: ANames.refreshSubReddit as ANames.refreshSubReddit,
})

type Actions_refreshSubReddit =
  ReturnType<typeof action_refreshSubRedditPosts>

const thunk_refreshSubredditPosts =
  ():ThunkAction<void, Store, {}, Actions_refreshSubReddit> =>
  ( dispatch: ThunkDispatch<Store, {}, Actions_refreshSubReddit>):void => {

    dispatch(action_refreshSubRedditPosts())
    dispatch(thunk_fetchSubRedditPosts())
  }

const actions = {
  thunk_fetchSubRedditPosts,
  thunk_refreshSubredditPosts
}

export {
  ANames,
  actions,
  Actions_fetchSubReddit,
  Actions_refreshSubReddit
}
