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
  exampleData_subrediddit_serialized as mockData_serialized
} from  '../model'
const author1 = mockData_serialized.posts[0].author
const title1 = mockData_serialized.posts[0].title
const author2 = mockData_serialized.posts[1].author
const title2 = mockData_serialized.posts[1].title

import api from '../api'
jest.mock('../api', ()=>(
  {
    subReddit: {
      getPosts: jest.fn( async()=>{
        const data_serialized = mockData_serialized
        await new Promise<void>((rs)=>{ setTimeout(rs, 1000) })
        return data_serialized
      })
    }
  }
))


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
  it('Mock api works: ', async () => {
    const payload_subreaddit = await api.subReddit.getPosts()
    expect(payload_subreaddit).toBe(mockData_serialized)
  })


  it('Should shows subreddit post without loading', async () => {
    const {
      getByText,
      queryByText
    } = renderWithStore(<App/>)
    await wait(
      () => {
        getByText(new RegExp(author1, 'i'))
        getByText(new RegExp(title1, 'i'))
        getByText(new RegExp(author2, 'i'))
        getByText(new RegExp(title2, 'i'))
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
        expect(queryByText(new RegExp(author1, 'i'))).toBe(null)
        expect(queryByText(new RegExp(title1, 'i'))).toBe(null)
        expect(queryByText(new RegExp(author2, 'i'))).toBe(null)
        expect(queryByText(new RegExp(title2, 'i'))).toBe(null)
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
})
