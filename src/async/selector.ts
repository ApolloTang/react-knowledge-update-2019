import { ThunkDispatch } from 'redux-thunk'

import {
  actions,
  Tactions,
} from './action'

import { Tstore } from './store'


const mapStoreToProps = (store:Tstore) => {
  const receivedAt = store && store.subreddit && store.subreddit.receivedAt
  const date = receivedAt ? (new Date(receivedAt)).toISOString() : undefined

  return {
    // subreddit: store && store.subreddit,
    date,
    posts: store && store.subreddit && store.subreddit.posts,
    isLoading: store && store.subreddit && store.subreddit.isLoading,
    errorMsg: store && store.subreddit && store.subreddit.errorMsg
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
