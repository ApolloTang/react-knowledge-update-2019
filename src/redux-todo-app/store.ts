import {createStore} from 'redux'
import {combineReducers} from 'redux'

import {reducer} from './reducer'


const rootReducer = combineReducers(
  {
    todos:reducer
  }
)

type Tstore = ReturnType<typeof rootReducer>


const store = createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

export default store
export {
  Tstore,
  rootReducer
}
