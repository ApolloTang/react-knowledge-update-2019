import { Dispatch } from 'redux'

import {ACrtors_Todos} from './action'

import {Store} from './store'

const mapStoreToProps = (store:Store) => {
  return {todos: store.todos}
}

interface TDispatch {
  addTodo: (text:string) => void
  deleteTodo: (id:string) => void
  toggleTodo: (id:string) => void
}


const mapDispatchToProps = (dispatch:Dispatch) => {

  const dispatch_addTodo:TDispatch['addTodo'] = (text) => {
    const newId:string = Date.now()+''
    dispatch(ACrtors_Todos.ACrtor_add(newId, text))
  }
  const dispatch_deleteTodo:TDispatch['deleteTodo'] = (id) => {
    dispatch(ACrtors_Todos.ACrtor_delete(id))
  }
  const dispatch_toggleTodo:TDispatch['toggleTodo'] = (id) => {
    dispatch(ACrtors_Todos.ACrtor_toggle(id))
  }

  return {
    dispatch_addTodo,
    dispatch_deleteTodo,
    dispatch_toggleTodo
  }
}

export {
  TDispatch,
  mapStoreToProps,
  mapDispatchToProps
}
