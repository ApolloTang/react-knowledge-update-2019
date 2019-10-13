enum actionNames {
  ADD = 'ADD',
  DELETE = 'DELETE',
  TOGGLE = 'TOGGLE',
}

// enum actionNames {
//   fetchSubreddit_start = 'fetchSubreddit_start',
//   fetchSubreddit_success = 'fetchSubreddit_success',
//   fetchSubreddit_fail = 'fetchSubreddit_fail',
// }

const ACrtor_add = (newId:string, text:string) => ({
  type: actionNames.ADD as actionNames.ADD,
  payload: {newId, text}
})
const ACrtor_delete = (id:string) => ({
  type: actionNames.DELETE as actionNames.DELETE,
  payload: {id}
})
const ACrtor_toggle = (id:string) => ({
  type: actionNames.TOGGLE as actionNames.TOGGLE,
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

