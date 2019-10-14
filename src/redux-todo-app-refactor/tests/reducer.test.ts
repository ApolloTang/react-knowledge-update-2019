import reducer,  {
  initialState,
} from '../reducer'
import { Ttodos } from '../model'
import {
  Tactions,
  actions
} from '../action'


describe('Todo reducer', ()=>{
  it('Should return the initail state', ()=>{
    const nonTodosAction = {} as Tactions
    expect(reducer(undefined, nonTodosAction)).toEqual(initialState)
  })

  it('Can add new todor', ()=>{
    const prevState:Ttodos = []
    const nextState:Ttodos = [
      {id: 'newID', timeStamp:12345, text:'learn react', completed:false}
    ]
    expect(
      reducer(
        prevState,
        actions.todos_add(nextState[0].id, 12345, nextState[0].text)
      )
    ).toEqual(nextState)
  })

  it('Can delete todo', ()=>{
    const idToDelete = 'idToDelete'
    const prevState:Ttodos = [
      {id: idToDelete, timeStamp:12345, text:'learn react', completed:false}
    ]
    const nextState:Ttodos = []
    expect(
      reducer(
        prevState, actions.todos_delete(idToDelete)
      )
    ).toEqual(nextState)
  })

  it('Can toggle todo', ()=>{
    const idToToggle = 'idToToggle'
    const prevState:Ttodos = [
      {id: idToToggle, timeStamp:12345, text:'learn react', completed:false}
    ]
    const nextState:Ttodos = [
      {id: idToToggle, timeStamp:12345, text:'learn react', completed:true}
    ]
    expect(
      reducer(
        prevState, actions.todos_toggle(idToToggle)
      )
    ).toEqual(nextState)
  })
})




