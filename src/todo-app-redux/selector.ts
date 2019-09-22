import { Dispatch } from 'redux'

import {ACrtors_Todos} from './action'

import {Todos as Store} from './reducer'


const mapStoreToProps = (store:Store) => {
  const todos = store
  return {todos}
}

const mapDispatchToProps = (dispatch:Dispatch) => (
  {
    dispatch_addTodo(text:string)  {
      const newId:string = Date.now()+''
      dispatch(ACrtors_Todos.ACrtor_add(newId, text))
    },
    dispatch_deleteTodo(id:string) { dispatch(ACrtors_Todos.ACrtor_delete(id)) },
    dispatch_toggleTodo(id:string) { dispatch(ACrtors_Todos.ACrtor_toggle(id)) },
  }
)

export {mapStoreToProps, mapDispatchToProps}
