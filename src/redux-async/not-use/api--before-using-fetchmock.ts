import fetchMock from 'fetch-mock'


interface TpostData {
  author: string
  title: string
  id: string
}

interface Tpost {
  data: TpostData
}

interface TsubredditInJson {
  data: {
    children: Tpost[]
  }
}

interface TserializedPosts {
  posts:TpostData[]
  receivedAt: number
}


// ===============
// Mock HTTP fetch
// ===============
const mockData:TsubredditInJson = {
  data: {
    children: [
      { data:{ author: 'author', title: 'title', id: 'id' } },
      { data:{ author: 'author', title: 'title', id: 'id' } }
    ]
  }
}
type Mutable<T> = { -readonly [P in keyof T ]: T[P] }
const mockResponse = {
  data: mockData,
  json: function(){return (this as any).data},
  ok: true,
  status: 200
} as unknown as Response
const mockFetch = () => new Promise<Response>( async (rs)=>{ // eslint-disable-line
  const sleep = () => new Promise((rs)=>{ setTimeout(rs, 2000) })
  const MOCK_ERROR = true
  if (MOCK_ERROR) {
    (mockResponse as unknown as Mutable<Response>).ok = false
    ;(mockResponse as unknown as Mutable<Response>).status = 500
    // above force readonly to readable see:
    // https://stackoverflow.com/questions/50703834/typescript-make-readonly-properties-writeable
    await sleep()
    rs(mockResponse)
  } else {
    await sleep()
    rs(mockResponse)
  }
})



const serializedPosts = (json:TsubredditInJson):TserializedPosts => ({
  posts: json.data.children.map(
    (child:Tpost):TpostData => {
      const dataRaw = child.data
      return {
        author: dataRaw && dataRaw.author,
        title: dataRaw && dataRaw.title,
        id: dataRaw && dataRaw.id
      }
    }
  ),
  receivedAt: Date.now()
})


fetchMock.get('https://www.reddit.com/r/reactjs.json', mockData)
const getPosts = async():Promise<TserializedPosts> => {
  const response = await fetch('https://www.reddit.com/r/reactjs.json')
  // const response = await mockFetch() // <-- this is replace by fetchMock now :)
  if (!response.ok) {
    throw new Error('HTTP error, status = ' + response.status)
  }
  const subredditInJson = await response.json()
  const data = serializedPosts(subredditInJson)
  return data
}


const api = {
  getPosts
}


type TapiPosts = undefined|TserializedPosts
type TapiPostsError = undefined|string


export {
  TapiPostsError,
  // Tpost,
  TpostData,
  // TserializedPosts,
  TapiPosts,
  api
}
