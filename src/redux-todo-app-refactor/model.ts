

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


// Todos schema in reducer
type Ttodos = typeof exampleData_todos
type Ttodo = Ttodos[0]


export {
  Ttodos,
  Ttodo
}
