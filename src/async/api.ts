
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
      { data:{ author: 'author', title: 'title', id: 'id' } },
      { data:{ author: 'author', title: 'title', id: 'id' } }
    ]
  }
}
const mockResponse = {
  data: mockData,
  json: function(){return this.data},
  ok: true
}
const mockFetch = () => new Promise<any>((rs, rj)=>{
  const sleep = () => new Promise((rs)=>{ setTimeout(rs, 3000) })
  const error = false
  if (error) {
    mockResponse.ok = false
    mockResponse.data = undefined // @TODO fix type
    sleep()
    rj(mockResponse)
  } else {
    console.log('sleeping')
    sleep()
    console.log('wake')
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


// // mock getPost
// const getPosts = async():Promise<TserializedPosts> => {
//   const sleep = () => new Promise((rs)=>{ setTimeout(rs, 3000) })
//
//   const response = new Promise<TsubredditInJson>((rs, rj)=>{
//     const error = false
//     if (error) {
//       rj('error')
//     } else {
//       rs(mockResponse.json())
//     }
//   })
//
//   console.log('mock fetching')
//   await sleep()
//   console.log('mock fetching completed')
//   const subredditInJson = (await response)
//   const data = serializedPosts(subredditInJson)
//   return data
// }


const getPosts = async():Promise<TserializedPosts> => {
  // const response = await fetch('https://www.reddit.com/r/reactjs.json')
  const response = await mockFetch()
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
  Tpost,
  TpostData,
  TserializedPosts,
  TapiPosts
}
export default {
  subReddit
}
