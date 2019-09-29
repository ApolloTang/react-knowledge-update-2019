import fetchMock from 'fetch-mock'
import {
  mockApi,
  apiSerializer_subreddit,
  Tsubreddit_serialized
} from './model'


// ==========
// Uncomment out one of next 2 lines to simulate mock fetching:
  fetchMock.get('https://www.reddit.com/r/reactjs.json', mockApi)
  // fetchMock.get('https://www.reddit.com/r/reactjs.json', 500)
// ==========

const getPosts = async():Promise<Tsubreddit_serialized> => {
  const response = await fetch('https://www.reddit.com/r/reactjs.json')

  // Uncomment out next line to simulate latency
  await new Promise<void>((rs)=>{setTimeout(rs, 3000)})

  if (!response.ok) {
    throw new Error('HTTP error, status = ' + response.status)
  }

  const subredditInJson = await response.json()
  const data_serialized = apiSerializer_subreddit(subredditInJson)
  return data_serialized
}


const subReddit = {
  getPosts
}


type TapiPosts = undefined|Tsubreddit_serialized
type TapiPostsError = undefined|string


export {
  TapiPostsError,
  TapiPosts
}
export default {
  subReddit
}
