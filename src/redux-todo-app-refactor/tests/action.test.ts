import {
  actionNames,
  actions
} from '../action'


describe('Todo action', ()=>{
  it('Should create an action to add new todo', () => {
    const newId = 'newId'
    const text = 'learn react'
    const expectedAction = {
      type: actionNames.todos_add,
      payload: { newId, text }
    }
    expect(actions.todos_add(newId, text)).toEqual(expectedAction)
   })

  it('Should create an action to delete a todo', () => {
    const idToDelete = 'idToDelete'
    const expectedAction = {
      type: actionNames.todos_delete,
      payload: { id:idToDelete }
    }
    expect(actions.todos_delete(idToDelete)).toEqual(expectedAction)
   })

  it('Should create an action to toggle a todo', () => {
    const idToToggle = 'idToggle'
    const expectedAction = {
      type: actionNames.todos_toggle,
      payload: { id:idToToggle }
    }
    expect(actions.todos_toggle(idToToggle)).toEqual(expectedAction)
   })
})
