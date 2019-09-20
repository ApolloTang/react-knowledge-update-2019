import React from 'react'
import {render, fireEvent} from '@testing-library/react'
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

  test('Can create todos', () =>{
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
})
