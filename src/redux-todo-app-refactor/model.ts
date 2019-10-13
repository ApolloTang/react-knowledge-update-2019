

// ======================================
// Example of Todos data shape in reducer
// ======================================
const exampleData_todos = [
  {
    id: '123',
    text: 'do something',
    complete: true
  },
  {
    id: '124',
    text: 'do something',
    complete: true
  }
]

// =======================
// Todos schema in reducer
// =======================
type Ttodo = typeof exampleData_todos[0]
type Ttodos = ReadonlyArray<Ttodo>
//            ^^^^^^^^^^^^^ Read only,
//            if you need to change it you need to clone it.

export {
  Ttodos,
  Ttodo
}
