enum ANames_Counter {
  INCREMENT = 'INCREMENT',
  DECREMENT = 'DECREMENT'
}


const ACrtor_increase = () => ({
  type: ANames_Counter.INCREMENT as ANames_Counter.INCREMENT
})
const ACrtor_decrease = () => ({
  type: ANames_Counter.DECREMENT as ANames_Counter.DECREMENT
})


type TACrtors_Counter =
  ReturnType<typeof ACrtor_increase> | ReturnType<typeof ACrtor_decrease>


const ACrtors_Counter = {
  ACrtor_increase,
  ACrtor_decrease
}


export {
  ANames_Counter,
  ACrtors_Counter,
  TACrtors_Counter
}

