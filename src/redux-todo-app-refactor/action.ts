enum actionNames {
  todos_add = 'todos_add',
  todos_delete = 'todos_delete',
  todos_toggle = 'todos_toggle',
}


const action_todos_add = (newId:string, text:string) => ({
  type: actionNames.todos_add as actionNames.todos_add,
  payload: {newId, text}
})
const action_todos_delete = (id:string) => ({
  type: actionNames.todos_delete as actionNames.todos_delete,
  payload: {id}
})
const action_todos_toggle = (id:string) => ({
  type: actionNames.todos_toggle as actionNames.todos_toggle,
  payload: {id}
})

type TACrtors_Todos =
  ReturnType<typeof action_todos_add> |
  ReturnType<typeof action_todos_delete> |
  ReturnType<typeof action_todos_toggle>


const actions = {
  action_todos_add,
  action_todos_delete,
  action_todos_toggle
}


export {
  actionNames,
  actions,
  TACrtors_Todos
}

