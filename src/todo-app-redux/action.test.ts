import {
  ANames_Todos,
  ACrtors_Todos
} from './action'


describe('Todo action', ()=>{
  it('Should create an action to add new todo', () => {
    const newId = 'newId'
    const text = 'learn react'
    const expectedAction = {
      type: ANames_Todos.ADD,
      payload: { newId, text }
    }
    expect(ACrtors_Todos.ACrtor_add(newId, text)).toEqual(expectedAction)
   })

  it('Should create an action to delete a todo', () => {
    const idToDelete = 'idToDelete'
    const expectedAction = {
      type: ANames_Todos.DELETE,
      payload: { id:idToDelete }
    }
    expect(ACrtors_Todos.ACrtor_delete(idToDelete)).toEqual(expectedAction)
   })

  it('Should create an action to toggle a todo', () => {
    const idToToggle = 'idToggle'
    const expectedAction = {
      type: ANames_Todos.TOGGLE,
      payload: { id:idToToggle }
    }
    expect(ACrtors_Todos.ACrtor_toggle(idToToggle)).toEqual(expectedAction)
   })
})
