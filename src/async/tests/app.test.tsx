import React from 'react'

import {
  exampleData_subrediddit_serialized as mockData_serialized
} from  '../model'

import api from '../api'
jest.mock('../api', ()=>(
  {
    subReddit: {
      getPosts: jest.fn( async()=>{
        const data_serialized = mockData_serialized
        await new Promise<void>((rs)=>{ setTimeout(rs, 3000) })
        return data_serialized
      })
    }
  }
))


describe('async', () => {
  it('api mock works: ', async () => {
    const payload_subreaddit = await api.subReddit.getPosts()
    expect(payload_subreaddit).toBe(mockData_serialized)
  })
})
