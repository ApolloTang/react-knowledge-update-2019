import { ThunkAction, ThunkDispatch } from 'redux-thunk'
import {Store} from './store'
import Api, { Post, ApiError } from './api'


enum ANames {
  fetchSubReddit_start = 'fetchSubReddit_start',
  fetchSubReddit_success = 'fetchSubReddit_success',
  fetchSubReddit_fail = 'fetchSubReddit_fail',
}
enum ANames {
  foo = 'foo'
}

const Action_fetchSubReddit_start = () => ({
  type: ANames.fetchSubReddit_start as ANames.fetchSubReddit_start
})
const Action_fetchSubReddit_success = (post:Post) => ({
  type: ANames.fetchSubReddit_success as ANames.fetchSubReddit_success,
  payload: post
})
const Action_fetchSubReddit_fail = (error:ApiError) => ({
  type: ANames.fetchSubReddit_fail as ANames.fetchSubReddit_fail,
  error
})

type TActions =
  ReturnType<typeof Action_fetchSubReddit_start> |
  ReturnType<typeof Action_fetchSubReddit_success> |
  ReturnType<typeof Action_fetchSubReddit_fail>



type E = {}
const fetchSubRedditPost =
  ():ThunkAction<Promise<Post>, Store, E, TActions> =>
  async (
    dispatch:ThunkDispatch<Store, E, TActions>,
  ):Promise<Post> => {
    dispatch( Action_fetchSubReddit_start() )
    let post = ''
    try {
       post = await Api.subReddit.getPost()
      dispatch( Action_fetchSubReddit_success(post) )
    } catch (error) {
      dispatch( Action_fetchSubReddit_fail(error) )
    }
    return post
}

const Actions = {
  fetchSubRedditPost
}


export {
  ANames,
  Actions,
  TActions,
}
