import { ThunkDispatch } from 'redux-thunk'

import {
  actions,
  Tactions_fetchSubreddit,
  Tactions_refreshSubreddit
} from './action'

import {Store} from './store'

const mapStoreToProps = (store:Store) => {
  return {todos: store.todos}
}

interface TDispatch {
  addTodo: (text:string) => void
  deleteTodo: (id:string) => void
  toggleTodo: (id:string) => void
}

type Tactions = Tactions_fetchSubreddit | Tactions_refreshSubreddit

const mapDispatchToProps = (dispatch:ThunkDispatch<Store, {}, Tactions>) => {
  const dispatch_fetchSubredditPosts = () => {
    dispatch(actions.thunk_fetchSubreddit())
  }

  const dispatch_refreshSubredditPosts = () => {
    dispatch(actions.thunk_refreshSubreddit())
  }
  return {
    dispatch_fetchSubredditPosts,
    dispatch_refreshSubredditPosts
  }
}

export {
  TDispatch,
  mapStoreToProps,
  mapDispatchToProps
}
