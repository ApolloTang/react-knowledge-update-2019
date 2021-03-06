import reducer,  {
  initialState,
  Todos
} from '../reducer'
import {
  TACrtors_Todos,
  ACrtors_Todos
} from '../action'


describe('Todo reducer', ()=>{
  it('Should return the initail state', ()=>{
    const nonTodosAction = {} as TACrtors_Todos
    expect(reducer(undefined, nonTodosAction)).toEqual(initialState)
  })

  it('Can add new todor', ()=>{
    const prevState:Todos = []
    const nextState:Todos = [
      {id: 'newID', text:'learn react', completed:false}
    ]
    expect(
      reducer(
        prevState,
        ACrtors_Todos.ACrtor_add(nextState[0].id, nextState[0].text)
      )
    ).toEqual(nextState)
  })

  it('Can delete todo', ()=>{
    const idToDelete = 'idToDelete'
    const prevState:Todos = [
      {id: idToDelete, text:'learn react', completed:false}
    ]
    const nextState:Todos = []
    expect(
      reducer(
        prevState, ACrtors_Todos.ACrtor_delete(idToDelete)
      )
    ).toEqual(nextState)
  })

  it('Can toggle todo', ()=>{
    const idToToggle = 'idToToggle'
    const prevState:Todos = [
      {id: idToToggle, text:'learn react', completed:false}
    ]
    const nextState:Todos = [
      {id: idToToggle, text:'learn react', completed:true}
    ]
    expect(
      reducer(
        prevState, ACrtors_Todos.ACrtor_toggle(idToToggle)
      )
    ).toEqual(nextState)
  })
})




