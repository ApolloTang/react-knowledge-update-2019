import { initialState, reducer } from '../reducer'
import {
  actions,
  TACrtors_Counter
} from '../action'

describe('Counter reducer', ()=>{
  it('Should return the initail state', ()=>{
    const nonCounterAction = {} as TACrtors_Counter
    expect(reducer(undefined, nonCounterAction)).toEqual(initialState)
  })

  it('Should increase counter', ()=>{
    expect(
      reducer(
        {count:1},
        actions.counter_increase()
      )
    ).toEqual({count:2})
  })

  it('Should decrease counter', ()=>{
    expect(
      reducer(
        {count:1},
        actions.counter_decrease()
      )
    ).toEqual({count:0})
  })
})



