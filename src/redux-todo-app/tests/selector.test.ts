import configureStore from 'redux-mock-store'

import {
  mapStoreToProps,
  mapDispatchToProps
} from  '../selector'
import {Tstore} from '../store'

import {actions} from '../action'


describe('Todo selector, mapStoreToProps', ()=>{
  const fakeStore = {
    todos: 'todos'
  } as unknown as Tstore

  it('Should select todos from the store: ', () => {
    expect(mapStoreToProps(fakeStore)).toEqual(fakeStore)
  })
})


describe('Todo selector, mapDispatchToProps', ()=>{
  const mockCreateStore = configureStore([])
  const mockStore = mockCreateStore({})
  const mockDispatch = mockStore.dispatch
  const {
    dispatch_addTodo,
    dispatch_deleteTodo,
    dispatch_toggleTodo,
  } = mapDispatchToProps(mockDispatch)

  it('Can dispatch actions.todo_add ', () => {
    const spy = jest.spyOn(actions, 'todos_add')

    const todoText = 'learn react'
    const dateBefore = Date.now()
    dispatch_addTodo(todoText)
    const dateAfter = Date.now()

    // actions.addTodo() signature:
    //   const todos_add = (newId:string, timeStamp:number, text:string) => ({
    const called_timeStamp = spy.mock.calls[0][1]
    const called_text = spy.mock.calls[0][2]

    expect(called_timeStamp).toBeGreaterThanOrEqual(dateBefore)
    expect(called_timeStamp).toBeLessThanOrEqual(dateAfter)
    expect(called_text).toBe(todoText)

    spy.mockRestore()
  })

  it('Can dispatch actions.todos_delete ', () => {
    const spy = jest.spyOn(actions, 'todos_delete')
    const someId = 'someId'
    dispatch_deleteTodo(someId)
    const called_deleteId = spy.mock.calls[0][0]
    expect(called_deleteId).toBe(someId)
    spy.mockRestore()
  })

  it('Can dispatch actions.todos_toggle ', () => {
    const spy = jest.spyOn(actions, 'todos_toggle')
    const someId = 'someId'
    dispatch_toggleTodo(someId)
    const called_deleteId = spy.mock.calls[0][0]
    expect(called_deleteId).toBe(someId)
    spy.mockRestore()
  })
})

