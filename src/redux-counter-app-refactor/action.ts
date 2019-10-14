enum actionNames {
  INCREMENT = 'INCREMENT',
  DECREMENT = 'DECREMENT'
}


const ACrtor_increase = () => ({
  type: actionNames.INCREMENT as actionNames.INCREMENT
})
const ACrtor_decrease = () => ({
  type: actionNames.DECREMENT as actionNames.DECREMENT
})


type TACrtors_Counter =
  ReturnType<typeof ACrtor_increase> | ReturnType<typeof ACrtor_decrease>


const ACrtors_Counter = {
  ACrtor_increase,
  ACrtor_decrease
}


export {
  actionNames,
  ACrtors_Counter,
  TACrtors_Counter
}

