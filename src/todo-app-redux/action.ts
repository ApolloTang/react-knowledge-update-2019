enum ANames_Todos {
  ADD = 'ADD',
  DELETE = 'DELETE',
  TOGGLE = 'TOGGLE',
}


const ACrtor_add = (newId:string, text:string) => ({
  type: ANames_Todos.ADD as ANames_Todos.ADD,
  payload: {newId, text}
})
const ACrtor_delete = (id:string) => ({
  type: ANames_Todos.DELETE as ANames_Todos.DELETE,
  payload: {id}
})
const ACrtor_toggle = (id:string) => ({
  type: ANames_Todos.TOGGLE as ANames_Todos.TOGGLE,
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
  ANames_Todos,
  ACrtors_Todos,
  TACrtors_Todos
}

