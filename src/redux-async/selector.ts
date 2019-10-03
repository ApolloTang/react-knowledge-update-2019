import { ThunkDispatch } from 'redux-thunk'

import {
  actions,
  Tactions,
} from './action'

import { Tstore } from './store'



function getIsoStringFromDatestamp<T extends number|undefined>(
  receivedAt:T
): T extends number ? string : undefined {
  // @ts-ignore [1]
  return (typeof receivedAt === 'number')
    ? (new Date(receivedAt)).toISOString() : undefined
}
// [1] Type 'string | undefined' is not assignable to type 'T extends number ? string : undefined'
//     https://stackoverflow.com/questions/58213113/typescript-conditional-type-does-not-work


const mapStoreToProps = (store:Tstore) => {
  const subreddit = store && store.subreddit
  const receivedAt = subreddit && subreddit.receivedAt
  const date = getIsoStringFromDatestamp(receivedAt)

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
  mapDispatchToProps,

  getIsoStringFromDatestamp
}
