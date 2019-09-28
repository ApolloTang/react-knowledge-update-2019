import { ThunkDispatch } from 'redux-thunk'

import {
  actions,
  Tactions,
} from './action'

import { Tstore } from './store'


interface TmapStoreToProps {
  subreddit: Tstore['subreddit']
}

interface TmapDispatchToProps {
  dispatch_fetchSubredditPosts: () => void
}

const mapStoreToProps = (store:Tstore) => {
  return {subreddit: store.subreddit}
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
