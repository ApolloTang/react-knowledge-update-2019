import {
  actionNames,
  Tactions
} from './action'

import {
  Ttodo,
  Ttodos
} from './model'


const initialState:Ttodos = []


function reducer(
  state:Ttodos = initialState,
  action:Tactions
):Ttodos {
  switch (action.type) {
    case actionNames.todos_add: {
      type Tadd = typeof action
      const newId = action && action.payload && action.payload.newId
      const timeStamp = action && action.payload && action.payload.timeStamp
      const text = action && action.payload && action.payload.text
      const newTodo:Ttodo = {id:newId, timeStamp, text, completed:false}
      return [...state, newTodo]
    }
    case actionNames.todos_delete: {
      type Tdelete = typeof action
      const id = action && action.payload && action.payload.id
      return state.filter(prevTodo=>prevTodo.id !==id)
    }
    case actionNames.todos_toggle: {
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
  reducer
}
