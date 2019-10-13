enum actionNames {
  todos_add = 'todos_add',
  todos_delete = 'todos_delete',
  todos_toggle = 'todos_toggle',
}


const todos_add = (newId:string, text:string) => ({
  type: actionNames.todos_add as actionNames.todos_add,
  payload: {newId, text}
})
const todos_delete = (id:string) => ({
  type: actionNames.todos_delete as actionNames.todos_delete,
  payload: {id}
})
const todos_toggle = (id:string) => ({
  type: actionNames.todos_toggle as actionNames.todos_toggle,
  payload: {id}
})

type TACrtors_Todos =
  ReturnType<typeof todos_add> |
  ReturnType<typeof todos_delete> |
  ReturnType<typeof todos_toggle>


const actions = {
  todos_add,
  todos_delete,
  todos_toggle
}


export {
  actionNames,
  actions,
  TACrtors_Todos
}

