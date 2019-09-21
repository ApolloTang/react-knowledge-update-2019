import reducer,  {
  // UnknownAction,
  initialState,
} from './reducer'


describe('Todo reducer', ()=>{
  it('Should return the initail state', ()=>{
    expect(reducer(undefined, {})).toEqual(initialState)
  })
})



