import { ThunkDispatch } from 'redux-thunk'

import {
  actions,
  Actions_fetchSubReddit,
  Actions_refreshSubReddit
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

type Actions = Actions_fetchSubReddit | Actions_refreshSubReddit

const mapDispatchToProps = (dispatch:ThunkDispatch<Store, {}, Actions>) => {
  const dispatch_fetchSubredditPosts = () => {
    dispatch(actions.thunk_fetchSubRedditPosts())
  }

  const dispatch_refreshSubredditPosts = () => {
    dispatch(actions.thunk_refreshSubredditPosts())
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
