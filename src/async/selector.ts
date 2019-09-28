import { ThunkDispatch } from 'redux-thunk'

import {
  actions,
  Tactions,
} from './action'

import { Tstore } from './store'


interface TmapStoreToProps {
  // subreddit: Tstore['subreddit']
  date: string
  posts: Tstore['subreddit']['posts']
  isLoading: Tstore['subreddit']['isLoading']
  errorMsg: Tstore['subreddit']['errorMsg']
}

interface TmapDispatchToProps {
  dispatch_fetchSubredditPosts: () => void
}



const mapStoreToProps = (store:Tstore) => {
  const receivedAt = store && store.subreddit && store.subreddit.receivedAt
  const date = receivedAt && (new Date(receivedAt)).toISOString()

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

export {
  TmapDispatchToProps,
  TmapStoreToProps,
  mapStoreToProps,
  mapDispatchToProps
}
