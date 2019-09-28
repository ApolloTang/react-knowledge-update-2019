import { ThunkDispatch } from 'redux-thunk'

import {
  actions,
  Tactions,
} from './action'

import { Store } from './store'


interface TmapStoreToProps {
  subreddit: Store['subreddit']
}

interface TmapDispatchToProps {
  dispatch_fetchSubredditPosts: () => void
}

const mapStoreToProps = (store:Store) => {
  return {subreddit: store.subreddit}
}

const mapDispatchToProps = (dispatch:ThunkDispatch<Store, {}, Tactions>) => {
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
