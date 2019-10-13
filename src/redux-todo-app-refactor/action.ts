enum actionNames {
  todos_add = 'todos_add',
  todos_delete = 'todos_delete',
  todos_toggle = 'todos_toggle',
}


const ACrtor_add = (newId:string, text:string) => ({
  type: actionNames.todos_add as actionNames.todos_add,
  payload: {newId, text}
})
const ACrtor_delete = (id:string) => ({
  type: actionNames.todos_delete as actionNames.todos_delete,
  payload: {id}
})
const ACrtor_toggle = (id:string) => ({
  type: actionNames.todos_toggle as actionNames.todos_toggle,
  payload: {id}
})

type TACrtors_Todos =
  ReturnType<typeof ACrtor_add> |
  ReturnType<typeof ACrtor_delete> |
  ReturnType<typeof ACrtor_toggle>


const ACrtors_Todos = {
  ACrtor_add,
  ACrtor_delete,
  ACrtor_toggle
}


export {
  actionNames,
  ACrtors_Todos,
  TACrtors_Todos
}

