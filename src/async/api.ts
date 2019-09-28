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

const mockData:TsubredditInJson = {
  data: {
    children: [
      { data:{ author: 'author', title: 'title', id: '1' } },
      { data:{ author: 'author', title: 'title', id: '2' } }
    ]
  }
}
fetchMock.get('https://www.reddit.com/r/reactjs.json', mockData)
// fetchMock.get('https://www.reddit.com/r/reactjs.json', 500)



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

const getPosts = async():Promise<TserializedPosts> => {
  const response = await fetch('https://www.reddit.com/r/reactjs.json')
  await new Promise<void>((rs)=>{setTimeout(rs, 3000)})
  if (!response.ok) {
    throw new Error('HTTP error, status = ' + response.status)
  }
  const subredditInJson = await response.json()
  const data = serializedPosts(subredditInJson)
  return data
}


const subReddit = {
  getPosts
}


type TapiPosts = undefined|TserializedPosts
type TapiPostsError = undefined|string


export {
  TapiPostsError,
  // Tpost,
  TpostData,
  // TserializedPosts,
  TapiPosts
}
export default {
  subReddit
}
