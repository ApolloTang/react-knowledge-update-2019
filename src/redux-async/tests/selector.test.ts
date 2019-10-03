import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import {applyMiddleware, compose} from 'redux'

import {
  mapStoreToProps,
  mapDispatchToProps
} from  '../selector'

// import {Tstore} from '../store'
import {actions} from '../action'


describe('[Selector, mapDispatchToProps]', ()=>{
  const middlewares = [thunk] // add your middlewares like `redux-thunk`
  const fakeCreateStore = configureStore(middlewares)
  const fakeRootReducer = {}
  const initialState = fakeRootReducer
  const fakeStore = fakeCreateStore(initialState)
  const fakeDispatch = fakeStore.dispatch

  const {
    dispatch_fetchSubredditPosts
  } = mapDispatchToProps(fakeDispatch)

  it('fetch', ()=>{
    const spied_Thunk_fetchSubreddit = jest.spyOn(actions, 'thunk_fetchSubreddit')
      dispatch_fetchSubredditPosts()
      const called = spied_Thunk_fetchSubreddit
      expect(called).toHaveBeenCalled()
    spied_Thunk_fetchSubreddit.mockRestore()
  })

})

