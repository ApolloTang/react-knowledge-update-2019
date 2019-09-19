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

interface TodosProps {
  todo: Todo
  deleteTodo: ()=>void
  toggleTodo: ()=>void
}

const TodoItem = ({todo, deleteTodo, toggleTodo}:TodosProps) => {
  return (
    <div>
      <span onClick={deleteTodo} >{todo.text}</span>
      <button onClick={toggleTodo}>delete</button>
    </div>
  )
}

const App = () => {
  const [todos, setTodos] = useState<Todos>([])
  const [todoInputText, setTodoInputText] = useState<string>('')

  const handle_newTodoChange = (e:React.FormEvent) => {
    e.preventDefault()
    const inputText = (e.target as HTMLInputElement).value
    setTodoInputText(inputText)
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
    setTodoInputText('')
  }

  const handle_delete = (id:string) => () => {
    console.log(id)
  }

  const handle_toggle = (id:string) => () => {
    console.log(id)
  }

  return (
    <div>
      <div>
        <form onSubmit={handle_newTodoSubmit}>
          <label>Add todo:</label>
          <input
            type="text"
            onChange={handle_newTodoChange}
            name="new-todo"
            value={todoInputText}
          />
        </form>
      </div>
      <div>UI control</div>
      <div>
        {
          todos.map(
            todo=>(
              <TodoItem
                key={todo.id}
                todo={todo}
                deleteTodo={handle_delete(todo.id)}
                toggleTodo={handle_toggle(todo.id)}
              />
            )
          )
        }
      </div>
    </div>
  )
}

export default App
