enum actionNames {
  INCREMENT = 'INCREMENT',
  DECREMENT = 'DECREMENT'
}


const counter_increase = () => ({
  type: actionNames.INCREMENT as actionNames.INCREMENT
})
const counter_decrease = () => ({
  type: actionNames.DECREMENT as actionNames.DECREMENT
})


type TACrtors_Counter =
  ReturnType<typeof counter_increase> | ReturnType<typeof counter_decrease>


const ACrtors_Counter = {
  counter_increase,
  counter_decrease
}


export {
  actionNames,
  ACrtors_Counter,
  TACrtors_Counter
}

