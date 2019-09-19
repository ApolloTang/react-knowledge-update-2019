import React from 'react'
import {useState} from 'react'

interface ExtendedHTMLFormElement extends HTMLFormControlsCollection {
  'new-todo': HTMLInputElement
}

interface Todo {
  id: string
  text: string
  completed: boolean
}

type Todos = Todo[]

const App = () => {
  const [todos, setTodos] = useState<Todos>([])
  const handle_newTodoChange = (e:React.FormEvent) => {
    const newTodo = (e.target as HTMLInputElement).value
    console.log('change', newTodo)
  }
  const handle_newTodoSubmit = (e:React.FormEvent):void => {
    e.preventDefault()
    const formElements =  (e.target as HTMLFormElement).elements as ExtendedHTMLFormElement
    const newTodoText = formElements['new-todo'].value

    const newTodo:Todo = {
      id: Date.now()+'',
      text: newTodoText,
      completed: false
    }

    const nextTodos = [...todos, newTodo]
    setTodos(nextTodos)
  }
  console.log('todos', todos)
  return (
    <div>
      <div>
        <form onSubmit={handle_newTodoSubmit}>
          <label>Add todo:</label>
          <input type="text" onChange={handle_newTodoChange} name="new-todo" />
        </form>
      </div>
      <div>UI control</div>
      <div>
        {todos.map(todo=><div key={todo.id}>{todo.text}</div>)}
      </div>
    </div>
  )
}

export default App
