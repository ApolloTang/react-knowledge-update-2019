import { Dispatch } from 'redux'
import uniqueId from 'lodash/uniqueId'

import {actions} from './action'

import {Tstore} from './store'

const mapStoreToProps = (store:Tstore) => {
  return {todos: store.todos}
}


const mapDispatchToProps = (dispatch:Dispatch) => {
  const dispatch_addTodo = (text:string) => {
    const newId = uniqueId()
    const timeStamp = Date.now()
    dispatch(actions.todos_add(newId, timeStamp, text))
  }
  const dispatch_deleteTodo = (id:string) => {
    dispatch(actions.todos_delete(id))
  }
  const dispatch_toggleTodo = (id:string) => {
    dispatch(actions.todos_toggle(id))
  }

  return {
    dispatch_addTodo,
    dispatch_deleteTodo,
    dispatch_toggleTodo
  }
}


type TmapDispatchToProps = ReturnType<typeof mapDispatchToProps>
type TmapStoreToProps = ReturnType<typeof mapStoreToProps>


export {
  TmapDispatchToProps,
  TmapStoreToProps,
  mapStoreToProps,
  mapDispatchToProps
}
