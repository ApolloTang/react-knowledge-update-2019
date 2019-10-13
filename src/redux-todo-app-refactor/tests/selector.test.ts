import configureStore from 'redux-mock-store'

import {
  mapStoreToProps,
  mapDispatchToProps
} from  '../selector'
import {Store} from '../store'

import {ACrtors_Todos} from '../action'


describe('Todo selector, mapStoreToProps', ()=>{
  const fakeStore = {
    todos: 'todos'
  } as unknown as Store

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

  it('Can dispatch ACrtors_Todos.Acrtor_add ', () => {
    const spy = jest.spyOn(ACrtors_Todos, 'action_todos_add')

    const todoText = 'learn react'
    const dateBefore = Date.now()
    dispatch_addTodo(todoText)
    const dateAfter = Date.now()

    const called_newId = +spy.mock.calls[0][0]
    expect(called_newId).toBeGreaterThanOrEqual(dateBefore)
    expect(called_newId).toBeLessThanOrEqual(dateAfter)

    const called_text = spy.mock.calls[0][1]
    expect(called_text).toBe(todoText)

    spy.mockRestore()
  })

  it('Can dispatch ACrtors_Todos.action_todos_delete ', () => {
    const spy = jest.spyOn(ACrtors_Todos, 'action_todos_delete')
    const someId = 'someId'
    dispatch_deleteTodo(someId)
    const called_deleteId = spy.mock.calls[0][0]
    expect(called_deleteId).toBe(someId)
    spy.mockRestore()
  })

  it('Can dispatch ACrtors_Todos.action_todos_toogle ', () => {
    const spy = jest.spyOn(ACrtors_Todos, 'action_todos_toogle')
    const someId = 'someId'
    dispatch_toggleTodo(someId)
    const called_deleteId = spy.mock.calls[0][0]
    expect(called_deleteId).toBe(someId)
    spy.mockRestore()
  })
})

