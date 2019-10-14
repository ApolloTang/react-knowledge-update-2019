import React from 'react'
import {useState} from 'react'

interface ExtendedHTMLFormElement extends HTMLFormControlsCollection {
  'new-todo': HTMLInputElement
}

interface Ttodo {
  id: string
  text: string
  completed: boolean
}

type Ttodos = Ttodo[]

interface TodosProps {
  todo: Ttodo
  deleteTodo: ()=>void
  toggleTodo: ()=>void
}

const TodoItem = ({todo, deleteTodo, toggleTodo}:TodosProps) => {
  return (
    <div data-testid="todo-item">
      <button onClick={deleteTodo}>x</button>
      <label>
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={toggleTodo}
          />{todo.text}
      </label>
    </div>
  )
}

const App = () => {
  const [todos, setTodos] = useState<Ttodos>([])
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

    const newTodo:Ttodo = {
      id: Date.now()+'',
      text: newTodoText,
      completed: false
    }

    setTodos(prevTodos => [...prevTodos, newTodo])
    setTodoInputText('')
  }

  const handle_delete = (id:string) => () => {
    setTodos(prevTodos => prevTodos.filter(todo=>todo.id !== id))
  }

  const handle_toggle = (id:string) => () => {
    setTodos(prevTodos => prevTodos.map((prevTodo:Ttodo)=>{
      return (id === prevTodo.id)
        ? {...prevTodo, completed: !prevTodo.completed }
        : prevTodo
    }))
  }

  return (
    <div>
      <div>
        <form onSubmit={handle_newTodoSubmit} data-testid="new-todo-form">
          <label htmlFor="new-todo">Add todo:</label>
          <input
            type="text"
            onChange={handle_newTodoChange}
            id="new-todo"
            value={todoInputText}
          />
        </form>
      </div>
      <div>UI control</div>
      <pre><code> {JSON.stringify(todos, null, 2)} </code></pre>
      <div data-testid="todo-list">
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

export {App}
