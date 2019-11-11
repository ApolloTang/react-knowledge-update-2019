import { ThunkDispatch } from 'redux-thunk'

import {
  asyncActions,
  Tactions,
} from './action'

import { Tstore } from './store'



function getIsoStringFromDatestamp<T extends number|undefined>(
  receivedAt:T
): T extends number ? string : undefined {
  return (typeof receivedAt === 'number')
    ? (new Date(receivedAt)).toISOString() : undefined as any // [1]
}
// [1] https://stackoverflow.com/questions/58213113/typescript-conditional-type-does-not-work


const mapStoreToProps = (store:Tstore) => {
  const receivedAt = store && store.receivedAt
  const date = getIsoStringFromDatestamp(receivedAt)

  return {
    date,
    posts: store && store.posts || [],
    isLoading: store && store.isLoading || false,
    errorMsg: store && store.errorMsg
  }
}


const mapDispatchToProps = (dispatch:ThunkDispatch<Tstore, {}, Tactions>) => {
  const dispatch_fetchSubredditPosts = () => {
    dispatch(asyncActions.thunk_fetchSubreddit())
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
