import { ThunkDispatch } from 'redux-thunk'

import {
  actions,
  Tactions,
} from './action'

import { Tstore } from './store'


const mapStoreToProps = (store:Tstore) => {
  const subreddit = store && store.subreddit

  const receivedAt = subreddit && subreddit.receivedAt
  const date = receivedAt ? (new Date(receivedAt)).toISOString() : undefined

  return {
    date,
    posts: subreddit && subreddit.posts,
    isLoading: subreddit && subreddit.isLoading,
    errorMsg: subreddit && subreddit.errorMsg
  }
}


const mapDispatchToProps = (dispatch:ThunkDispatch<Tstore, {}, Tactions>) => {
  const dispatch_fetchSubredditPosts = () => {
    dispatch(actions.thunk_fetchSubreddit())
  }

  return {
    dispatch_fetchSubredditPosts,
  }
}

type TmapStoreToProps = ReturnType<typeof mapStoreToProps>
type TmapDispatchToProps = ReturnType<typeof mapDispatchToProps>

export {
  TmapDispatchToProps,
  TmapStoreToProps,
  mapStoreToProps,
  mapDispatchToProps
}
