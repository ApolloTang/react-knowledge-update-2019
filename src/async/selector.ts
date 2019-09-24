import { ThunkDispatch } from 'redux-thunk'

import {
  Actions,
  TActions
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


type E = {}
const mapDispatchToProps = (dispatch:ThunkDispatch<Store, E, TActions>) => {
  const dispatch_fetchPost = () => {
    dispatch(Actions.fetchSubRedditPost())
  }
  return {
    dispatch_fetchPost
  }
}

export {
  TDispatch,
  mapStoreToProps,
  mapDispatchToProps
}
