import React from 'react'
import {render, fireEvent, within, getNodeText} from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import {App} from './app'

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


  test('Can update todos [U]', () =>{
    const {
      getByLabelText,
      getByText,
      getByTestId,
      getAllByTestId
    } = render(<App/>)

    const todoTexts = [
      'learn react', 'learn redux', 'learn typescript'
    ]

    // We want to update todo item with the following text
    const todoText_toUpdate = [...todoTexts].splice(1,1)[0]

    const newTodoInput = getByLabelText(/add.todo/i)
    const newTodoForm = getByTestId('new-todo-form')

    // create todo items
    todoTexts.forEach(todoText=>{
      userEvent.type(newTodoInput, todoText)
      fireEvent.submit(newTodoForm)
    })

    // now todoItems has been created
    getAllByTestId('todo-item')

    // get the checkbox
    const checkboxToCheck = getByLabelText(todoText_toUpdate) as HTMLInputElement

    // pre test
    expect(checkboxToCheck.checked).toBe(false)

    // click it
    fireEvent.click(getByText('learn redux'))

    // test it
    expect(checkboxToCheck.checked).toBe(true)
  })


  test('Can deleted todos [D]', () =>{
    const {
      getByLabelText,
      getByTestId,
      getAllByTestId
    } = render(<App/>)

    const todoTexts = [
      'learn react', 'learn redux', 'learn typescript'
    ]

    // We want to remove todo item with the following text
    const todoText_toDelete = [...todoTexts].splice(1,1)[0]

    const newTodoInput = getByLabelText(/add.todo/i)
    const newTodoForm = getByTestId('new-todo-form')
    const todoList = getByTestId('todo-list')

    // create todo items
    todoTexts.forEach(todoText=>{
      userEvent.type(newTodoInput, todoText)
      fireEvent.submit(newTodoForm)
    })

    // now todo items has been created
    const todoItems = getAllByTestId('todo-item')

    // Since delete button is not inside label, we have to find
    // the parent that contains it, which is the todoItems.
    // So lets find the todoItems we want to delete.
    const todoItemsToDelete = todoItems.filter( (todoItem)=>{
      const label = todoItem.querySelector('label')
      return (label)? getNodeText(label) === todoText_toDelete : false
      // the predicate of this filter look for label
      // with text node that has the text we want.
    })

    // get the button
    const deleteTodoButton = within(todoItemsToDelete[0]).getByText('x')

    // delete it
    fireEvent.click(deleteTodoButton)

    // test it
    expect(todoList).not.toHaveTextContent(todoText_toDelete)
  })
})
