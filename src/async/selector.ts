import { ThunkDispatch } from 'redux-thunk'

import {
  actions,
  Tactions,
} from './action'

import {Store} from './store'

const mapStoreToProps = (store:Store) => {
  return {subreddit: store.subreddit}
}

interface TDispatch {
  addTodo: (text:string) => void
  deleteTodo: (id:string) => void
  toggleTodo: (id:string) => void
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
  TDispatch,
  mapStoreToProps,
  mapDispatchToProps
}
