
interface TpostData {
  author: string
  title: string
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



const serializedPosts = (json:TsubredditInJson):TserializedPosts => ({
  posts: json.data.children.map((child:Tpost):TpostData => child.data),
  receivedAt: Date.now()
})


// const sleep = () => new Promise((rs)=>{
//   setTimeout(rs, 2000)
// })

// const getPosts_mock = async(): Promise<Post> => {
//   await sleep()
//   console.log('http get post')
//   return new Promise((rs, rj)=>{
//     const error = false
//     if (error) {
//       rj('error')
//     } else {
//       rs('foo')
//     }
//   })
// }


const getPosts = async():Promise<TserializedPosts> => {
  console.log('get post called')
  const response = await fetch('https://www.reddit.com/r/reactjs.json')
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

export default {
  subReddit
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


