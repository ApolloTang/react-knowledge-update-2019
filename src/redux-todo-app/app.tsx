import React from 'react'
import {useState} from 'react'
import {connect} from 'react-redux'

import {
  TmapDispatchToProps,
  TmapStoreToProps,
  mapStoreToProps,
  mapDispatchToProps
} from './selector'



// ===================
// TodoItem component
// ===================
interface TTodoItemProps {
  todo: TmapStoreToProps['todos'][0]
  deleteTodo: ()=>void
  toggleTodo: ()=>void
}

const TodoItem = ({todo, deleteTodo, toggleTodo}:TTodoItemProps) => {
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



// ====
// App
// ====
type TAppProps = {
} & TmapStoreToProps & TmapDispatchToProps

interface ExtendedHTMLFormElement extends HTMLFormControlsCollection {
  'new-todo': HTMLInputElement
}

const App = ({
  todos,
  dispatch_addTodo,
  dispatch_deleteTodo,
  dispatch_toggleTodo
}:TAppProps) => {
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

    dispatch_addTodo(newTodoText)
    setTodoInputText('')
  }

  const handle_delete = (id:string) => () => {
    dispatch_deleteTodo(id)
  }

  const handle_toggle = (id:string) => () => {
    dispatch_toggleTodo(id)
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
            (todo)=>(
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


const ConnectedApp = connect(
  mapStoreToProps,
  mapDispatchToProps
)(App)

export {ConnectedApp}
