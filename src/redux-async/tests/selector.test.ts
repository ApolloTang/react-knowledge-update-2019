import {ThunkDispatch} from 'redux-thunk'

import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'

import {Tstore} from '../store'
import { asyncActions } from '../action'

import {
  mapStoreToProps,
  mapDispatchToProps,
  getIsoStringFromDatestamp
} from  '../selector'



describe('[getIsoStringFromDatestamp()]', ()=>{
  it('Should handle undefined', () => {
    expect(getIsoStringFromDatestamp(undefined)).toBeUndefined()
  })

  it('Should convert time stamp to iso-string', () => {
    expect(getIsoStringFromDatestamp(1570084484065)).toBe('2019-10-03T06:34:44.065Z')
  })
})



describe('[Selector, mapStoreToProps]', ()=>{
  const receivedAt =  Date.now()
  const receivedAt_isoString = getIsoStringFromDatestamp(receivedAt)

  const fakeStore = {
    subreddit: {
      receivedAt: receivedAt,
      posts: 'fakePosts',
      isLoading: 'fakeIsLoading',
      errorMsg: 'fakeErrorMsg'
    }
  } as unknown as Tstore

  expect(mapStoreToProps(fakeStore)).toEqual(
    {
      date: receivedAt_isoString,
      posts: 'fakePosts',
      isLoading: 'fakeIsLoading',
      errorMsg: 'fakeErrorMsg'
    }
  )
})



describe('[Selector, mapDispatchToProps]', ()=>{
  const middlewares = [thunk]
  const fakeCreateStore = configureStore(middlewares)
  const fakeRootReducer = {}
  const initialState = fakeRootReducer
  const fakeStore = fakeCreateStore(initialState)
  const fakeDispatch = fakeStore.dispatch as ThunkDispatch<Promise<any>, {}, any>

  const {
    dispatch_fetchSubredditPosts
  } = mapDispatchToProps(fakeDispatch)

  it('fetch', ()=>{
    const spy = jest.spyOn(asyncActions, 'thunk_fetchSubreddit')
    dispatch_fetchSubredditPosts()
    expect(spy).toHaveBeenCalled()
    spy.mockRestore()
  })
})

