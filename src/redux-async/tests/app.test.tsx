import React from 'react'
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'

import { render, wait, fireEvent } from '@testing-library/react'

import { ConnectedApp } from '../app'
import { reducer } from '../reducer'
import { Tposts } from  '../model'


import { api } from '../api'
jest.mock('../api', ()=>(
  {
    api: {
      getPosts: () => {}
    }
  }
))
const spy = jest.spyOn(api, 'getPosts')


const mockPosts1 = [
  { author: 'author1', title: 'title1', id: '1' },
  { author: 'author2', title: 'title2', id: '2' }
]
const mockPosts2 = [
  { author: 'author3', title: 'title3', id: '3' },
  { author: 'author4', title: 'title4', id: '4' }
]
const mockSerizedDataGenerator = (timeStamp:number, fakePost:Tposts) => {
  return {
    posts: fakePost,
    receivedAt: timeStamp
  }
}



describe('[Fetching Subreddit App]', () => {
  beforeEach(()=>{
    const sleepTime = 100

    spy
    .mockImplementationOnce( async()=>{
      await new Promise<void>((rs)=>{ setTimeout(rs, sleepTime) })
      return mockSerizedDataGenerator(Date.now(), mockPosts1 )
    })
    .mockImplementationOnce( async()=>{
      await new Promise<void>((rs)=>{ setTimeout(rs, sleepTime) })
      return mockSerizedDataGenerator(Date.now(), mockPosts2)
    })
  })

  afterEach(()=>{
    spy.mockReset()
  })

  it('Module mock api with spy works: ', async () => {
    const payload_subreaddit1 = await api.getPosts()
    const payload_subreaddit2 = await api.getPosts()
    const t1 = payload_subreaddit1.receivedAt
    const t2 = payload_subreaddit2.receivedAt
    expect(t1).not.toBe(t2)
    expect(payload_subreaddit1.posts).toEqual(mockPosts1)
    expect(payload_subreaddit2.posts).toEqual(mockPosts2)
  })

  it('During initial loading there should be no subreddit', async () => {
    const {
      getByText,
      queryByText
    } = renderWithStore(<ConnectedApp/>)
    await wait(
      () => {
        getByText(/loading/i)

        expect( queryByText(new RegExp(mockPosts1[0].author, 'i')) ).toBeNull()
        expect( queryByText(new RegExp(mockPosts1[0].title, 'i')) ).toBeNull()

        expect( queryByText(new RegExp(mockPosts1[1].author, 'i')) ).toBeNull()
        expect( queryByText(new RegExp(mockPosts1[1].title, 'i')) ).toBeNull()
      }
    )
  })

  it('When subreddit post is showing there should be no loading message', async () => {
    const {
      getByText,
      queryByText
    } = renderWithStore(<ConnectedApp/>)
    await wait(
      () => {
        getByText(new RegExp(mockPosts1[0].author, 'i'))
        getByText(new RegExp(mockPosts1[0].title, 'i'))

        getByText(new RegExp(mockPosts1[1].author, 'i'))
        getByText(new RegExp(mockPosts1[1].title, 'i'))

        expect(queryByText(/loading/i)).toBeNull()
      }
    )
  })


  it('Refresh button should be disable during loading', async () => {
    const {
      getByText,
    } = renderWithStore(<ConnectedApp/>)
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
    } = renderWithStore(<ConnectedApp/>)
    await wait(
      () => {
        expect(queryByText(/loading/i)).toBeNull()
        const refreshButton = getByText(/refresh/i)
        expect(refreshButton).toBeEnabled()
      }
    )
  })

  it('Click refresh button will disable refresh button', async () => {
    const {
      getByText,
      queryByText
    } = renderWithStore(<ConnectedApp/>)
    await wait(
      () => {
        expect(queryByText(/loading/i)).toBeNull()
        const refreshButton = getByText(/refresh/i)
        fireEvent.click(refreshButton)
        expect(refreshButton).toBeDisabled()
      }
    )
  })

  it('Time stamp will be different after refresh', async () => {
    const {
      getByText,
      getByTestId,
    } = renderWithStore(<ConnectedApp/>)
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

  it('Subredit can be different after refresh', async () => {
    const {
      getByText,
      queryByText,
    } = renderWithStore(<ConnectedApp/>)
    await wait(
      async () => {
        getByText( new RegExp(mockPosts1[0].title, 'i') )
        expect(queryByText( new RegExp(mockPosts2[0].title, 'i') )).toBeNull()

        const refreshButton = getByText(/refresh/i)
        fireEvent.click(refreshButton)

        await new Promise<void>( (rs)=>setTimeout(rs, 500) )

        getByText( new RegExp(mockPosts2[0].title, 'i') )
        expect(queryByText( new RegExp(mockPosts1[0].title, 'i') )).toBeNull()
      }
    )
  })
})


function renderWithStore(
  ui:React.ReactNode
) {
  const store = createStore(reducer, applyMiddleware(thunk))
  return render(
    <Provider store={store}>
      {ui}
    </Provider>
  )
}
