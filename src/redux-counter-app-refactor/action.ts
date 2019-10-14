enum actionNames {
  counter_increase = 'counter_increase',
  counter_decrease = 'counter_decrease'
}


const counter_increase = () => ({
  type: actionNames.counter_increase as actionNames.counter_increase
})
const counter_decrease = () => ({
  type: actionNames.counter_decrease as actionNames.counter_decrease
})


type Tactions =
  ReturnType<typeof counter_increase> |
  ReturnType<typeof counter_decrease>


const actions = {
  counter_increase,
  counter_decrease
}


export {
  actionNames,
  actions,
  Tactions
}

