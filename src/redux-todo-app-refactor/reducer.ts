import {
  ANames_Todos,
  TACrtors_Todos
} from './action'

import {
  Ttodo,
  Ttodos
} from './model'


const initialState:Ttodos = []


function todosReducer(
  state:Ttodos = initialState,
  action:TACrtors_Todos
):Ttodos {
  switch (action.type) {
    case ANames_Todos.ADD: {
      type Tadd = typeof action
      const newId = action && action.payload && action.payload.newId
      const text = action && action.payload && action.payload.text
      const newTodo:Ttodo = {id:newId, text, completed:false}
      return [...state, newTodo]
    }
    case ANames_Todos.DELETE: {
      type Tdelete = typeof action
      const id = action && action.payload && action.payload.id
      return state.filter(prevTodo=>prevTodo.id !==id)
    }
    case ANames_Todos.TOGGLE: {
      type Ttoggle = typeof action
      const id = action && action.payload && action.payload.id
      return state.map(
        prevTodo => {
          if (id===prevTodo.id) {
            return {...prevTodo, completed:!prevTodo.completed}
          }
          return prevTodo
        }
      )
    }
    default:
      type catchall = typeof action
      return state
  }
}

export {
  initialState,
}
export default todosReducer
