import { Dispatch } from 'redux'

import {actions} from './action'

import {Store} from './store'

const mapStoreToProps = (store:Store) => {
  return {todos: store.todos}
}


const mapDispatchToProps = (dispatch:Dispatch) => {
  const dispatch_addTodo = (text:string) => {
    const newId:string = Date.now()+''
    dispatch(actions.todos_add(newId, text))
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
