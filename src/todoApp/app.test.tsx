import React from 'react'
import {render, fireEvent, within, getNodeText} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom/extend-expect'

import App from './app'

describe('Todo App',()=>{
  test('Render a "Adding todo" input field', () =>{
    const {
      getByLabelText,
    } = render(<App/>)
    getByLabelText(/add.todo/i)
  })

  test('Add todo input take user values', () =>{
    const {
      getByLabelText,
    } = render(<App/>)
    const newTodoInput = getByLabelText(/add.todo/i) as HTMLInputElement
    const todo1 = 'learn react'
    userEvent.type(newTodoInput, todo1)
    expect(newTodoInput).toHaveAttribute('value', todo1)
  })

  test('Can create todos [CR]', () =>{
    const {
      getByLabelText,
      getByTestId,
    } = render(<App/>)

    const todoTexts = [
      'learn react', 'learn redux', 'learn typescript'
    ]

    const newTodoInput = getByLabelText(/add.todo/i)
    const newTodoForm = getByTestId('new-todo-form')
    const todoList = getByTestId('todo-list')

    todoTexts.forEach(todoText=>{
      expect(todoList).not.toHaveTextContent(todoText)
    })
    todoTexts.forEach(todoText=>{
      userEvent.type(newTodoInput, todoText)
      fireEvent.submit(newTodoForm)
    })
    todoTexts.forEach(todoText=>{
      expect(todoList).toHaveTextContent(todoText)
    })
  })

  test('Can create deleted todos', () =>{
    const {
      getByLabelText,
      getByTestId,
      getAllByTestId
    } = render(<App/>)

    const todoTexts = [
      'learn react', 'learn redux', 'learn typescript'
    ]

    // We want to remove todo item with the following text
    const todoTexts_toDelete = [...todoTexts].splice(1,1)

    const newTodoInput = getByLabelText(/add.todo/i)
    const newTodoForm = getByTestId('new-todo-form')
    const todoList = getByTestId('todo-list')

    // create todo item
    todoTexts.forEach(todoText=>{
      userEvent.type(newTodoInput, todoText)
      fireEvent.submit(newTodoForm)
    })

    // now todoItems has been created
    const todoItems = getAllByTestId('todo-item')

    // find the todoItems we want to delete
    const todoItemsToDelete = todoItems.filter( (todoItem)=>{
      const label = todoItem.querySelector('label')
      return (label)? getNodeText(label) === todoTexts_toDelete[0] : false
    })
    // get the button
    const deleteTodoButton = within(todoItemsToDelete[0]).getByText('x')
    // delete it
    fireEvent.click(deleteTodoButton)

    expect(todoList).not.toHaveTextContent(todoTexts_toDelete[0])
  })
})
