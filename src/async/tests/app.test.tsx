import React from 'react'
import {
  render,
  wait,
  fireEvent
} from '@testing-library/react'
import {
  createStore,
  applyMiddleware
} from 'redux'
import thunk from 'redux-thunk'
import {
  Provider
} from 'react-redux'
import App from '../app'
import {rootReducer} from '../store'

import {
  Tposts,
} from  '../model'



const mockPosts1 = [
  { author: 'author1', title: 'title1', id: '1' },
  { author: 'author2', title: 'title2', id: '2' }
]
const mockPosts2 = [
  { author: 'author2', title: 'title2', id: '3' },
  { author: 'author3', title: 'title3', id: '4' }
]
const  mockSerizedDataGenerator = (timeStamp:number, fakePost:Tposts) => {
  return {
    posts: fakePost,
    receivedAt: timeStamp
  }
}


import api from '../api'
// jest.mock('../api', ()=>(
//   {
//     subReddit: {
//       getPosts: jest.fn()
//         .mockImplementationOnce( async()=>{
//           await new Promise<void>((rs)=>{ setTimeout(rs, 1000) })
//           return mockSerizedDataGenerator(Date.now(), mockPosts1 )
//         })
//         .mockImplementationOnce( async()=>{
//           await new Promise<void>((rs)=>{ setTimeout(rs, 1000) })
//           return mockSerizedDataGenerator(Date.now(), mockPosts2)
//         })
//     }
//   }
// ))


jest.mock('../api', ()=>(
  {
    subReddit: {
      getPosts: () => {}
        // jest.fn()
        // .mockImplementationOnce( async()=>{
        //   await new Promise<void>((rs)=>{ setTimeout(rs, 1000) })
        //   return mockSerizedDataGenerator(Date.now(), mockPosts1 )
        // })
        // .mockImplementationOnce( async()=>{
        //   await new Promise<void>((rs)=>{ setTimeout(rs, 1000) })
        //   return mockSerizedDataGenerator(Date.now(), mockPosts2)
        // })
    }
  }
))

const apiSubReddit = api.subReddit
let spy

function renderWithStore(
  ui:React.ReactNode
) {
  const store = createStore(rootReducer, applyMiddleware(thunk))
  return render(
    <Provider store={store}>
      {ui}
    </Provider>
  )
}


describe('async', () => {

  beforeEach(()=>{
    spy = jest.spyOn(apiSubReddit, 'getPosts')
      .mockImplementationOnce( async()=>{
        await new Promise<void>((rs)=>{ setTimeout(rs, 100) })
        return mockSerizedDataGenerator(Date.now(), mockPosts1 )
      })
      .mockImplementationOnce( async()=>{
        await new Promise<void>((rs)=>{ setTimeout(rs, 100) })
        return mockSerizedDataGenerator(Date.now(), mockPosts2)
      })
  })

  afterEach(()=>{
    spy.mockReset()
  })

  it('Mock api works: ', async () => {
    const payload_subreaddit1 = await api.subReddit.getPosts()
    const payload_subreaddit2 = await api.subReddit.getPosts()
    const t1 = payload_subreaddit1.receivedAt
    const t2 = payload_subreaddit2.receivedAt
    expect(t1).not.toBe(t2)
    expect(payload_subreaddit1.posts).toEqual(mockPosts1)
    expect(payload_subreaddit2.posts).toEqual(mockPosts2)
  })


  it('Should shows subreddit post without loading', async () => {
    const {
      getByText,
      queryByText
    } = renderWithStore(<App/>)
    await wait(
      () => {
        getByText(new RegExp(mockPosts1[0].author, 'i'))
        getByText(new RegExp(mockPosts1[0].title, 'i'))

        getByText(new RegExp(mockPosts1[1].author, 'i'))
        getByText(new RegExp(mockPosts1[1].title, 'i'))

        expect(queryByText(/loading/i)).toBe(null)
      }
    )
  })


  it('Should shows loading without subreddit', async () => {
    const {
      getByText,
      queryByText
    } = renderWithStore(<App/>)
    await wait(
      () => {
        getByText(/loading/i)
        expect( queryByText(new RegExp(mockPosts1[0].author, 'i')) ).toBe(null)
        expect( queryByText(new RegExp(mockPosts1[0].title, 'i')) ).toBe(null)

        expect( queryByText(new RegExp(mockPosts1[1].author, 'i')) ).toBe(null)
        expect( queryByText(new RegExp(mockPosts1[1].title, 'i')) ).toBe(null)
      }
    )
  })


  it('Refresh button should be disable during loading', async () => {
    const {
      getByText,
    } = renderWithStore(<App/>)
    await wait(
      () => {
        getByText(/loading/i)
        const refreshButton = getByText(/refresh/i)
        expect(refreshButton).toBeDisabled()
      }
    )
  })


  it('Refresh button should be enable after loading', async () => {
    const {
      getByText,
      queryByText
    } = renderWithStore(<App/>)
    await wait(
      () => {
        expect(queryByText(/loading/i)).toBeNull()
        const refreshButton = getByText(/refresh/i)
        expect(refreshButton).toBeEnabled()
      }
    )
  })


  it('Click refresh button will disable refresh button itself and show loading', async () => {
    const {
      getByText,
      queryByText
    } = renderWithStore(<App/>)
    await wait(
      () => {
        expect(queryByText(/loading/i)).toBeNull()
        const refreshButton = getByText(/refresh/i)
        fireEvent.click(refreshButton)
        expect(refreshButton).toBeDisabled()
        queryByText(/loading/i)
      }
    )
  })


  it('time stamp will be different after refresh', async () => {
    const {
      getByText,
      getByTestId,
    } = renderWithStore(<App/>)
    await wait(
      async () => {
        const lastUpdate_beforeRefresh = getByTestId('last-update')
        const date_beforeRefresh = lastUpdate_beforeRefresh.innerHTML

        const refreshButton = getByText(/refresh/i)
        fireEvent.click(refreshButton)

        await new Promise<void>((rs)=>setTimeout(rs, 500))

        const lastUpdate_afterRefresh = getByTestId('last-update')
        const date_afterRefresh = lastUpdate_afterRefresh.innerHTML

        expect(date_beforeRefresh).not.toBe(date_afterRefresh)
      }
    )
  })
})
